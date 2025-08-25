// app/api/form/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import BrevoService from "@/lib/brevo";

/* ---------------------- Schemas (per form) ---------------------- */

// TRIAL (multi-step form)
const TrialSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  country: z.string().min(1, "Required"),
  phone: z.string().min(1, "Required"),
  learningInterest: z.enum(["Quran", "Islamic Studies", "Arabic", "Others"], {
    required_error: "Required",
  }),
  studentCount: z.string().min(1, "Required"),
  preferredTeacher: z.string().min(1, "Required"),
  referralSource: z.string().min(1, "Required"),
  preferredDate: z.string().min(1, "Required"),
  preferredTime: z.string().min(1, "Required"),
});

// CONTACT (example)
const ContactSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional().default(""),
  subject: z.string().min(1, "Required"),
  message: z.string().min(1, "Required"),
});

// QUESTION (FAQ page "Any other Question?")
const QuestionSchema = z.object({
  username: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Required"),
});

// CALLBACK REQUEST (Call Back Requests)
const CallbackSchema = z.object({
  username: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(1, "Required"),
  message: z.string().min(1, "Required"),
});

// COURSE-ENROLLMENT (example — customize as needed)
const EnrollmentSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  course: z.string().min(1, "Required"),
  phone: z.string().optional().default(""),
  notes: z.string().optional().default(""),
});

// STUDENT FORM
const StudentSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  country: z.string().min(1, "Required"),
  phone: z.string().min(1, "Required"),
  ageGroup: z.string().min(1, "Required"),
  gender: z.enum(["Male", "Female"]),
  learningInterest: z.enum(["Quran", "Islamic Studies", "Arabic", "Others"]),
  studentCount: z.string().min(1, "Required"),
  pricingPlan: z.string().min(1, "Required"),
  daysPerWeek: z.array(z.string()).min(1),
  preferredDate: z.string().min(1, "Required"),
  preferredTime: z.string().min(1, "Required"),
});

// TEACHER FORM
const TeacherSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  gender: z.string().min(1, "Required"),
  dob: z.string().min(1, "Required"),
  maritalStatus: z.string().min(1, "Required"),
  aboutMe: z.string().optional().default(""),
  facebook: z.string().optional().default(""),
  qualification: z.string().min(1, "Required"),
  experience: z.string().min(1, "Required"),
  motherLanguage: z.string().min(1, "Required"),
  otherLanguage: z.string().optional().default(""),
});

/* ---- Request body can be either nested or flat; accept both ---- */
const BodyShape = z.union([
  z.object({
    formType: z.string().min(1),
    data: z.record(z.any()),
    meta: z.record(z.any()).optional(),
  }),
  z.record(z.any()), // flat
]);

/* --------------------- Per-form configuration ------------------- */
/** Map each form to its validator, recipient, and subject */
const FORM_CONFIG = {
  trial: {
    schema: TrialSchema,
    // set via .env.local
    toEnvs: ["NOTIFY_TRIAL", "NOTIFY_TRIAL_2"], // e.g. admissions inbox
    subject: (d: any) =>
      `New Trial Request — ${d.firstName || ""} ${d.lastName || ""}`.trim(),
    sendConfirmation: true,
  },
  contact: {
    schema: ContactSchema,
    toEnvs: ["NOTIFY_CONTACT", "NOTIFY_CONTACT_2"],
    subject: (d: any) => `Contact — ${d.subject || "New message"}`,
    sendConfirmation: true,
  },
  question: {
    schema: QuestionSchema,
    toEnvs: ["NOTIFY_FAQ", "NOTIFY_FAQ_2"],
    subject: (d: any) => `Question — ${d.username || ""}`.trim(),
    sendConfirmation: true,
  },
  callback: {
    schema: CallbackSchema,
    toEnvs: ["NOTIFY_CALLBACK", "NOTIFY_CALLBACK_2"],
    subject: (d: any) => `Callback Request — ${d.username || ""}`.trim(),
    sendConfirmation: true,
  },
  enrollment: {
    schema: EnrollmentSchema,
    toEnvs: ["NOTIFY_ENROLLMENT", "NOTIFY_ENROLLMENT_2"],
    subject: (d: any) => `Enrollment — ${d.course || "Course"}`,
    sendConfirmation: true,
  },
  student: {
    schema: StudentSchema,
    toEnvs: ["NOTIFY_STUDENT", "NOTIFY_STUDENT_2"],
    subject: (d: any) => `Student Form — ${d.firstName || ""} ${d.lastName || ""}`.trim(),
    sendConfirmation: true,
  },
  teacher: {
    schema: TeacherSchema,
    toEnvs: ["NOTIFY_TEACHER", "NOTIFY_TEACHER_2"],
    subject: (d: any) => `Teacher Application — ${d.firstName || ""} ${d.lastName || ""}`.trim(),
    sendConfirmation: true,
  },
} as const;

type FormType = keyof typeof FORM_CONFIG;

/* --------------------------- Helpers ---------------------------- */
function normalizePhone(phone: unknown): string {
  if (typeof phone !== "string" || phone.trim() === "") return "";
  return phone.startsWith("+") ? phone : `+${phone}`;
}

function flattenForEmail(obj: any, prefix = ""): string {
  if (obj == null) return "";
  if (typeof obj !== "object") return `${prefix}${String(obj)}\n`;
  let out = "";
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}${k}` : k;
    if (Array.isArray(v)) {
      out += `${key}: ${v.join(", ")}\n`;
    } else if (v && typeof v === "object") {
      out += flattenForEmail(v, `${key}.`);
    } else {
      out += `${key}: ${v ?? ""}\n`;
    }
  }
  return out;
}

function extractPayload(body: any): { formType: FormType; data: any; meta: any } {
  // If body has formType+data, use that; else treat whole body as data & require formType
  if ("formType" in body && "data" in body) {
    return {
      formType: (body.formType as string).toLowerCase() as FormType,
      data: body.data || {},
      meta: body.meta || {},
    };
  }
  if (!body.formType) {
    throw new Error("Missing formType in request body.");
  }
  const { formType, ...rest } = body;
  return {
    formType: (formType as string).toLowerCase() as FormType,
    data: rest,
    meta: {},
  };
}

/* ---------------------------- Route ----------------------------- */
export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const parsed = BodyShape.parse(raw);
    const { formType, data: rawData, meta } = extractPayload(parsed);

    const cfg = FORM_CONFIG[formType];
    if (!cfg) {
      return NextResponse.json(
        { error: `Unsupported formType: ${formType}` },
        { status: 400 }
      );
    }

    // Validate per-form
    const prepared = { ...rawData };
    // normalize phone if present
    if ("phone" in prepared) {
      prepared.phone = normalizePhone(prepared.phone);
    }
    const data = cfg.schema.parse(prepared);

    // Emails
    const fromEmail = process.env.FROM_EMAIL;
    const toEmails = cfg.toEnvs
      .map(envVar => process.env[envVar])
      .filter(Boolean) as string[];


    if (!fromEmail || toEmails.length === 0) {
      return NextResponse.json(
        { error: `Missing FROM_EMAIL or ${cfg.toEnvs.join(", ")} env var(s)` },
        { status: 400 }
      );
    }

    // Compose message
    const subject = cfg.subject(data);
    const textContent =
      `Form: ${formType}\n\n` +
      flattenForEmail({ ...data, meta: meta ?? {} });

    // Send admin notification via Brevo
    const adminEmailResult = await BrevoService.sendEmail({
      to: toEmails,
      subject,
      textContent,
      htmlContent: `<pre>${textContent}</pre>`,
    });

    if (!adminEmailResult.success) {
      console.error(`Failed to send admin notification for ${formType}:`, adminEmailResult.error);
    }

    // Send confirmation email to user if configured
    let userConfirmationResult = null;
    if (cfg.sendConfirmation) {
      switch (formType) {
        case 'trial':
          userConfirmationResult = await BrevoService.sendTrialConfirmation(data);
          break;
        case 'enrollment':
          userConfirmationResult = await BrevoService.sendEnrollmentConfirmation(data);
          break;
        case 'contact':
          userConfirmationResult = await BrevoService.sendContactConfirmation(data);
          break;
        case 'student':
          userConfirmationResult = await BrevoService.sendStudentConfirmation(data);
          break;
        case 'teacher':
          userConfirmationResult = await BrevoService.sendTeacherConfirmation(data);
          break;
        default:
          // Generic confirmation for other forms
          const displayName = 'firstName' in data ? data.firstName : 
                             'username' in data ? data.username : 
                             'name' in data ? data.name : 'there';
          userConfirmationResult = await BrevoService.sendEmail({
            to: data.email,
            subject: `Thank you for your ${formType} submission`,
            textContent: `Hi ${displayName},\n\nThank you for your ${formType} submission. We'll get back to you soon.\n\nBest regards,\nThe Team`,
          });
      }

      if (!userConfirmationResult?.success) {
        console.error(`Failed to send user confirmation for ${formType}:`, userConfirmationResult?.error);
      }
    }

    // Add contact to Brevo (optional)
    try {
      const contactData: any = {
        email: data.email,
        attributes: {
          SOURCE: `${formType}_form`,
          LAST_SUBMISSION: new Date().toISOString(),
          FORM_TYPE: formType,
        },
      };

      // Map common fields safely
      if ('firstName' in data && data.firstName) contactData.firstName = data.firstName;
      if ('lastName' in data && data.lastName) contactData.lastName = data.lastName;
      if ('username' in data && data.username) contactData.firstName = data.username;
      if ('name' in data && data.name) {
        const nameParts = data.name.split(' ');
        contactData.firstName = nameParts[0];
        contactData.lastName = nameParts.slice(1).join(' ');
      }
      if ('phone' in data && data.phone) contactData.phone = data.phone;
      if ('country' in data && data.country) contactData.country = data.country;

      // Add to specific list based on form type
      const listIds: number[] = [];
      if (formType === 'trial' && process.env.BREVO_LIST_TRIAL) {
        listIds.push(Number(process.env.BREVO_LIST_TRIAL));
      }
      if (formType === 'student' && process.env.BREVO_LIST_STUDENT) {
        listIds.push(Number(process.env.BREVO_LIST_STUDENT));
      }
      if (formType === 'teacher' && process.env.BREVO_LIST_TEACHER) {
        listIds.push(Number(process.env.BREVO_LIST_TEACHER));
      }
      if (formType === 'question' && process.env.BREVO_LIST_QUESTION) {
        listIds.push(Number(process.env.BREVO_LIST_QUESTION));
      }
      if (formType === 'callback' && process.env.BREVO_LIST_CALLBACK) {
        listIds.push(Number(process.env.BREVO_LIST_CALLBACK));
      }
      
      const contactResult = await BrevoService.upsertContact(contactData, listIds);
      
      if (contactResult.success) {
        console.log(`✅ Contact successfully added to Brevo for ${formType}: ${data.email}`);
      } else {
        console.error(`❌ Failed to add contact to Brevo for ${formType}:`, contactResult.error);
      }
    } catch (error) {
      console.error(`Failed to add contact to Brevo for ${formType}:`, error);
      // Don't fail the request if this fails
    }

    return NextResponse.json({ 
      ok: true, 
      message: `${formType} submitted successfully! Check your email for confirmation.`
    });
  } catch (err: any) {
    // Zod error details
    if (err?.issues) {
      return NextResponse.json({ error: "Validation failed", issues: err.issues }, { status: 400 });
    }
    console.error("Brevo/form error:", err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}

/** -------- GET /api/form (for testing) -------- */
export async function GET() {
  return NextResponse.json({ 
    message: "Form API endpoint",
    status: "active",
    supportedForms: Object.keys(FORM_CONFIG)
  });
}
