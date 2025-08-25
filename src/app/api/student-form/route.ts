import { NextResponse } from "next/server";
import * as Brevo from "@getbrevo/brevo";
import { z } from "zod";
import BrevoService from "@/lib/brevo";
export const runtime = "nodejs";

/** Adjust fields to match your student form exactly */
const StudentSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  country: z.string().min(1),
  phone: z.string().min(1),
  ageGroup: z.string().min(1),
  gender: z.enum(["Male", "Female"]),
  learningInterest: z.enum(["Quran", "Islamic Studies", "Arabic"]),
  studentCount: z.string().min(1),
  pricingPlan: z.string().min(1),
  planDuration: z.string().optional().default(""),
  preferredTeacher: z.enum(["Male", "Female", "Either"]).optional().default("Either"),
  referralSource: z
    .enum(["Friends", "Social Media", "Email", "Google", "Others"])
    .optional()
    .default("Others"),
  daysPerWeek: z.array(z.string()).min(1),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
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

    const d = StudentSchema.parse(body);

    const fromEmail = process.env.FROM_EMAIL;
    const toEmail = process.env.NOTIFY_STUDENT; // 👈 student-form inbox
    const toEmail2 = process.env.NOTIFY_STUDENT_2; // 👈 2nd student-form inbox

    if (!fromEmail || !toEmail) {
      return NextResponse.json(
        { error: "Missing FROM_EMAIL or NOTIFY_STUDENT in env" },
        { status: 400 }
      );
    }

    const toEmails = [toEmail, toEmail2].filter(Boolean) as string[];

    // Send admin notification email using Brevo template #13
    try {
      const adminNotificationResult = await BrevoService.sendTemplateEmail(
        toEmails,
        Number(process.env.BREVO_TEMPLATE_STUDENT_ADMIN_NOTIFICATION) || 13,
        {
          contact: {
            firstName: d.firstName,
            lastName: d.lastName,
            email: d.email,
            phone: d.phone,
            country: d.country,
            ageGroup: d.ageGroup,
            gender: d.gender,
            learningInterest: d.learningInterest,
            studentCount: d.studentCount,
            pricingPlan: d.pricingPlan,
            planDuration: d.planDuration,
            preferredTeacher: d.preferredTeacher,
            referralSource: d.referralSource,
            daysPerWeek: d.daysPerWeek.join(", "),
            preferredDate: d.preferredDate,
            preferredTime: d.preferredTime,
            submittedAt: new Date().toISOString(),
          }
        }
      );
      
      if (!adminNotificationResult.success) {
        console.error("Failed to send admin notification email:", adminNotificationResult.error);
        // Fallback to plain text email if template fails
        const subject = `New Student Form — ${d.firstName} ${d.lastName}`;
        const textContent = [
          `Form: Student`,
          `Name: ${d.firstName} ${d.lastName}`,
          `Email: ${d.email}`,
          `Phone: ${d.phone}`,
          `Country: ${d.country}`,
          `Age Group: ${d.ageGroup}`,
          `Gender: ${d.gender}`,
          `Learning Interest: ${d.learningInterest}`,
          `Student Count: ${d.studentCount}`,
          `Pricing Plan: ${d.pricingPlan}`,
          `Plan Duration: ${d.planDuration}`,
          `Preferred Teacher: ${d.preferredTeacher}`,
          `Referral Source: ${d.referralSource}`,
          `Days / Week: ${d.daysPerWeek.join(", ")}`,
          `Preferred Date: ${d.preferredDate}`,
          `Preferred Time: ${d.preferredTime}`,
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

    // Send confirmation email to user using Brevo template
    try {
      console.log('Attempting to send student welcome email to:', d.email);
      const userConfirmationResult = await BrevoService.sendTemplateEmail(
        d.email,
        Number(process.env.BREVO_TEMPLATE_STUDENT_WELCOME) || 0,
        {
          contact: {
            firstName: d.firstName,
            lastName: d.lastName,
            learningInterest: d.learningInterest,
            pricingPlan: d.pricingPlan,
            planDuration: d.planDuration,
            preferredTeacher: d.preferredTeacher,
            daysPerWeek: d.daysPerWeek.join(", "),
            preferredDate: d.preferredDate,
            preferredTime: d.preferredTime,
          }
        }
      );

      if (!userConfirmationResult.success) {
        console.error("Failed to send student welcome email:", userConfirmationResult.error);
      }
    } catch (confirmationError) {
      console.error("Error sending student welcome email:", confirmationError);
      // Don't fail the request if confirmation email fails
    }

    // Add contact to Brevo student list
    try {
      const studentListId = Number(process.env.BREVO_LIST_STUDENT);
      if (studentListId) {
        await BrevoService.upsertContact({
          email: d.email,
          firstName: d.firstName,
          lastName: d.lastName,
          phone: d.phone,
          country: d.country,
          attributes: {
            SOURCE: 'student_form',
            AGE_GROUP: d.ageGroup,
            GENDER: d.gender,
            LEARNING_INTEREST: d.learningInterest,
            STUDENT_COUNT: d.studentCount,
            PRICING_PLAN: d.pricingPlan,
            PLAN_DURATION: d.planDuration,
            PREFERRED_TEACHER: d.preferredTeacher,
            REFERRAL_SOURCE: d.referralSource,
            DAYS_PER_WEEK: d.daysPerWeek.join(", "),
            PREFERRED_DATE: d.preferredDate,
            PREFERRED_TIME: d.preferredTime,
            LAST_SUBMISSION: new Date().toISOString(),
          },
        }, [studentListId]);
        console.log(`Contact added to Brevo student list #${studentListId}`);
      }
    } catch (contactError) {
      console.error("Failed to add contact to Brevo student list:", contactError);
      // Don't fail the request if this fails
    }

    return NextResponse.json({ 
      ok: true, 
      message: "Student form submitted successfully! Check your email for confirmation."
    });
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json(
        { error: "Validation failed", issues: err.issues },
        { status: 400 }
      );
    }
    console.error("Brevo/student-form error:", err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
