import { NextResponse } from "next/server";
import { z } from "zod";
import BrevoService from "@/lib/brevo";

const CallbackSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone number is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time is required"),
  message: z.string().optional(),
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

    const data = CallbackSchema.parse(body);

    // Split name into firstName and lastName for Brevo
    const nameParts = data.name.split(' ');
    const firstName = nameParts.shift() || '';
    const lastName = nameParts.join(' ') || '';

    const fromEmail = process.env.FROM_EMAIL;
    const toEmail = process.env.NOTIFY_CALLBACK; // Admin notification email
    const toEmail2 = process.env.NOTIFY_CALLBACK_2;

    if (!fromEmail || !toEmail) {
      return NextResponse.json(
        { error: "Missing FROM_EMAIL or NOTIFY_CALLBACK in environment variables" },
        { status: 400 }
      );
    }

    const toEmails = [toEmail, toEmail2].filter(Boolean) as string[];

    // Send admin notification email using Brevo template #10
    try {
      const adminNotificationResult = await BrevoService.sendTemplateEmail(
        toEmails,
        Number(process.env.BREVO_TEMPLATE_CALLBACK_ADMIN_NOTIFICATION) || 10,
        {
          contact: {
            firstName: firstName,
            lastName: lastName,
            email: data.email,
            phone: data.phone,
            preferredDate: data.preferredDate,
            preferredTime: data.preferredTime,
            message: data.message || "No additional message",
            submittedAt: new Date().toISOString(),
          }
        }
      );
      
      if (!adminNotificationResult.success) {
        console.error("Failed to send admin notification email:", adminNotificationResult.error);
        // Fallback to plain text email if template fails
        const adminSubject = `New Callback Request — ${data.name}`;
        const adminTextContent = [
          `Form: Callback Request`,
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone}`,
          `Preferred Date: ${data.preferredDate}`,
          `Preferred Time: ${data.preferredTime}`,
          `Message: ${data.message || "No additional message"}`,
          `Submitted: ${new Date().toISOString()}`,
        ].join("\n");

        const fallbackEmailResult = await BrevoService.sendEmail({
          to: toEmails,
          subject: adminSubject,
          textContent: adminTextContent,
          htmlContent: adminTextContent.replace(/\n/g, "<br />"),
          replyTo: { email: data.email, name: data.name },
        });
        
        if (!fallbackEmailResult.success) {
          console.error("Failed to send fallback admin notification:", fallbackEmailResult.error);
        } else {
          console.log("Admin notification sent via fallback email");
        }
      } else {
        console.log("Admin notification email sent successfully using template:", adminNotificationResult.messageId);
      }
    } catch (adminError) {
      console.error("Error sending admin notification email:", adminError);
      // Don't fail the request if admin notification fails
    }

    // Send confirmation email to user with simple, direct text
    try {
      const subject = "Callback Request Confirmation";
      const htmlContent = `
        <div style="font-family: sans-serif; font-size: 16px; color: #333;">
          <p>Hi ${data.name},</p>
          <p>Thank you for your callback submission. We'll get back to you soon.</p>
          <br>
          <p>Best regards,<br><strong>The Bayyinah Academy Team</strong></p>
        </div>
      `;
      const textContent = `Hi ${data.name},\n\nThank you for your callback submission. We'll get back to you soon.\n\nBest regards,\nThe Bayyinah Academy Team`;

      const userConfirmationResult = await BrevoService.sendEmail({
        to: data.email,
        subject,
        htmlContent,
        textContent,
      });

      if (userConfirmationResult.success) {
        console.log("User callback confirmation email sent successfully:", userConfirmationResult.messageId);
      } else {
        console.error("Failed to send user callback confirmation:", userConfirmationResult.error);
      }
    } catch (userEmailError) {
      console.error("Error sending user callback confirmation email:", userEmailError);
    }

    // Add contact to Brevo callback list
    try {
      const callbackListId = Number(process.env.BREVO_LIST_CALLBACK);
      if (callbackListId) {
        await BrevoService.upsertContact({
          email: data.email,
          firstName: firstName,
          lastName: lastName,
          phone: data.phone,
          attributes: {
            SOURCE: 'callback_request',
            PREFERRED_DATE: data.preferredDate,
            PREFERRED_TIME: data.preferredTime,
            MESSAGE: data.message || "",
            LAST_SUBMISSION: new Date().toISOString(),
          },
        }, [callbackListId]);
        console.log(`Contact added to Brevo callback list #${callbackListId}`);
      }
    } catch (contactError) {
      console.error("Failed to add contact to Brevo callback list:", contactError);
      // Don't fail the request if this fails
    }

    return NextResponse.json({ 
      ok: true, 
      message: "Callback request submitted successfully! We'll contact you soon."
    });
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json(
        { error: "Validation failed", issues: err.issues },
        { status: 400 }
      );
    }
    console.error("Callback request error:", err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "Callback request API endpoint",
    status: "active",
    callbackListId: Number(process.env.BREVO_LIST_CALLBACK) || 0
  });
}
