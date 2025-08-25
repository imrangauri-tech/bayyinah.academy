import { NextResponse } from "next/server";
import { z } from "zod";
import BrevoService from "@/lib/brevo";

/** Adjust labels if your inputs differ (no UI changes required) */
const Schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(1, "Required"),
  message: z.string().min(1, "Required"),
  phone: z.string().optional().default(""),
});

function normalizePhone(p?: string) {
  if (!p) return "";
  return p.startsWith("+") ? p : `+${p}`;
}

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const body = raw?.data ? raw.data : raw;
    body.phone = normalizePhone(body.phone);

    const d = Schema.parse(body);

    const fromEmail = process.env.FROM_EMAIL;
    const toEmail = process.env.NOTIFY_CONTACT; // 👈 set in .env.local
    const toEmail2 = process.env.NOTIFY_CONTACT_2;

    if (!fromEmail || !toEmail) {
      return NextResponse.json(
        { error: "Missing FROM_EMAIL or NOTIFY_CONTACT" },
        { status: 400 }
      );
    }

    const toEmails = [toEmail, toEmail2].filter(Boolean) as string[];

    // Send notification email to admin
    const subject = `Contact — ${d.subject} (${d.name})`;
    const textContent = [
      `Form: Contact`,
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Phone: ${d.phone}`,
      `Subject: ${d.subject}`,
      ``,
      d.message,
      ``,
      `Submitted: ${new Date().toISOString()}`,
    ].join("\n");

    const adminEmailResult = await BrevoService.sendEmail({
      to: toEmails,
      subject,
      textContent,
      htmlContent: textContent.replace(/\n/g, "<br />"),
      replyTo: { email: d.email, name: d.name },
    });

    if (!adminEmailResult.success) {
      console.error("Failed to send admin notification:", adminEmailResult.error);
    }

    // Send confirmation email to user
    try {
      const userConfirmationResult = await BrevoService.sendContactConfirmation(d);
      if (!userConfirmationResult.success) {
        console.error("Failed to send user confirmation email:", userConfirmationResult.error);
        // Fallback to plain text email if template fails
        await BrevoService.sendEmail({
          to: d.email,
          subject: "Message Received",
          textContent: `Hi ${d.name},\n\nThank you for your message. We've received your inquiry about "${d.subject}" and will get back to you soon.\n\nBest regards,\nThe Team`,
        });
      }
    } catch (confirmationError) {
      console.error("Error sending confirmation email:", confirmationError);
    }

    // Add contact to Brevo Contact Us list (configurable via environment variable)
    try {
      const contactListId = Number(process.env.BREVO_LIST_CONTACT) || 14; // Default to list #14
      
      await BrevoService.upsertContact({
        email: d.email,
        firstName: d.name.split(' ')[0],
        lastName: d.name.split(' ').slice(1).join(' '),
        phone: d.phone,
        attributes: {
          SOURCE: 'contact_form',
          LAST_CONTACT: new Date().toISOString(),
          SUBJECT: d.subject,
          MESSAGE: d.message,
        },
      }, [contactListId]); // Add to Contact Us list
      
      console.log(`Contact added to Brevo list #${contactListId} (Contact Us)`);
    } catch (error) {
      console.error("Failed to add contact to Brevo Contact Us list:", error);
      // Don't fail the request if this fails
    }

    return NextResponse.json({ 
      ok: true, 
      message: "Message sent successfully! Check your email for confirmation."
    });
  } catch (err: any) {
    console.error("Brevo/contact error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to send" },
      { status: 400 }
    );
  }
}

/** -------- GET /api/contact (for testing) -------- */
export async function GET() {
  return NextResponse.json({ 
    message: "Contact API endpoint",
    status: "active",
    contactListId: Number(process.env.BREVO_LIST_CONTACT) || 14
  });
}
