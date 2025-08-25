import { NextResponse } from "next/server";
import * as Brevo from "@getbrevo/brevo";
import { z } from "zod";
import BrevoService from "@/lib/brevo";

/** Schema for the Trial form (matches your fields) */
const TrialSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  country: z.string().min(1, "Required"),
  phone: z.string().min(1, "Required"),
  learningInterest: z.enum(["Quran", "Islamic Studies", "Arabic", "Others"]),
  studentCount: z.string().min(1, "Required"),
  preferredTeacher: z.string().min(1, "Required"),
  referralSource: z.string().min(1, "Required"),
  preferredDate: z.string().min(1, "Required"),
  preferredTime: z.string().min(1, "Required"),
});

const api = new Brevo.TransactionalEmailsApi();
api.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY || ""
);

function normalizePhone(p?: string) {
  if (!p) return "";
  return p.startsWith("+") ? p : `+${p}`;
}

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const body = raw?.data ? raw.data : raw;
    body.phone = normalizePhone(body.phone);

    const data = TrialSchema.parse(body);

    const fromEmail = process.env.FROM_EMAIL;
    const toEmail = process.env.NOTIFY_TRIAL; // 👈 trial inbox
    const toEmail2 = process.env.NOTIFY_TRIAL_2; // 👈 2nd trial inbox

    if (!fromEmail || !toEmail) {
      return NextResponse.json(
        { error: "Missing FROM_EMAIL or NOTIFY_TRIAL in env" },
        { status: 400 }
      );
    }

    const toEmails = [toEmail, toEmail2].filter(Boolean) as string[];

    // Send admin notification email using Brevo template #11
    try {
      const adminNotificationResult = await BrevoService.sendTemplateEmail(
        toEmails,
        Number(process.env.BREVO_TEMPLATE_TRIAL_ADMIN_NOTIFICATION) || 11,
        {
          contact: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            country: data.country,
            learningInterest: data.learningInterest,
            studentCount: data.studentCount,
            preferredTeacher: data.preferredTeacher,
            referralSource: data.referralSource,
            preferredDate: data.preferredDate,
            preferredTime: data.preferredTime,
            submittedAt: new Date().toISOString(),
          }
        }
      );
      
      if (!adminNotificationResult.success) {
        console.error("Failed to send admin notification email:", adminNotificationResult.error);
        // Fallback to plain text email if template fails
        const subject = `New Trial Request — ${data.firstName} ${data.lastName}`;
        const textContent = [
          `Form: Trial`,
          `Name: ${data.firstName} ${data.lastName}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone}`,
          `Country: ${data.country}`,
          `Learning Interest: ${data.learningInterest}`,
          `Student Count: ${data.studentCount}`,
          `Preferred Teacher: ${data.preferredTeacher}`,
          `Referral Source: ${data.referralSource}`,
          `Preferred Date: ${data.preferredDate}`,
          `Preferred Time: ${data.preferredTime}`,
          `Submitted: ${new Date().toISOString()}`,
        ].join("\n");

        const fallbackEmail: Brevo.SendSmtpEmail = {
          sender: { email: fromEmail },
          to: toEmails.map(email => ({ email })),
          subject,
          textContent,
        };

        await api.sendTransacEmail(fallbackEmail);
        console.log("Admin notification sent via fallback email");
      } else {
        console.log("Admin notification email sent successfully using template:", adminNotificationResult.messageId);
      }
    } catch (adminError) {
      console.error("Error sending admin notification email:", adminError);
      // Don't fail the request if admin notification fails
    }

    // Send confirmation email to user
    try {
      // Use the dedicated helper which correctly formats the data
      const confirmationResult = await BrevoService.sendTrialConfirmation(data);
      
      if (!confirmationResult.success) {
        console.error("Failed to send user confirmation email:", confirmationResult.error);
        // Fallback to plain text email if template fails
        const subject = `New Trial Request — ${data.firstName} ${data.lastName}`;
        const textContent = [
          `Form: Trial`,
          `Name: ${data.firstName} ${data.lastName}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone}`,
          `Country: ${data.country}`,
          `Learning Interest: ${data.learningInterest}`,
          `Student Count: ${data.studentCount}`,
          `Preferred Teacher: ${data.preferredTeacher}`,
          `Referral Source: ${data.referralSource}`,
          `Preferred Date: ${data.preferredDate}`,
          `Preferred Time: ${data.preferredTime}`,
          `Submitted: ${new Date().toISOString()}`,
        ].join("\n");

        const fallbackEmail: Brevo.SendSmtpEmail = {
          sender: { email: fromEmail },
          to: [{ email: data.email }],
          subject,
          textContent,
        };

        await api.sendTransacEmail(fallbackEmail);
        console.log("User confirmation sent via fallback email");
      } else {
        console.log("User confirmation email sent successfully:", confirmationResult.messageId);
      }
    } catch (confirmationError) {
      console.error("Error sending trial confirmation email:", confirmationError);
      // Don't fail the request if confirmation email fails
    }

    // Add contact to Brevo trial list
    try {
      const trialListId = Number(process.env.BREVO_LIST_TRIAL);
      if (trialListId) {
        await BrevoService.upsertContact({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          country: data.country,
          attributes: {
            SOURCE: 'trial_form',
            LEARNING_INTEREST: data.learningInterest,
            STUDENT_COUNT: data.studentCount,
            PREFERRED_TEACHER: data.preferredTeacher,
            REFERRAL_SOURCE: data.referralSource,
            PREFERRED_DATE: data.preferredDate,
            PREFERRED_TIME: data.preferredTime,
            LAST_SUBMISSION: new Date().toISOString(),
          },
        }, [trialListId]);
        console.log(`Contact added to Brevo trial list #${trialListId}`);
      }
    } catch (contactError) {
      console.error("Failed to add contact to Brevo trial list:", contactError);
      // Don't fail the request if this fails
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json(
        { error: "Validation failed", issues: err.issues },
        { status: 400 }
      );
    }
    console.error("Brevo/trial error:", err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
