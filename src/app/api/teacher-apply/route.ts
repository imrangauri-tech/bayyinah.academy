// src/app/api/teacher-apply/route.ts
import { NextResponse } from "next/server";
import * as Brevo from "@getbrevo/brevo";
import BrevoService from "@/lib/brevo";

export const runtime = "nodejs"; // required for reading files (Node APIs)

/** Read a File from FormData into a base64 string + meta */
async function fileToAttachment(file: File | null) {
  if (!file) return null;
  const buf = Buffer.from(await file.arrayBuffer());
  return {
    name: file.name || "attachment",
    content: buf.toString("base64"),
    contentType: file.type || "application/octet-stream",
  };
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // Scalars
    const firstName = String(form.get("firstName") || "");
    const lastName = String(form.get("lastName") || "");
    const gender = String(form.get("gender") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const country = String(form.get("country") || "");
    const dob = String(form.get("dob") || "");
    const maritalStatus = String(form.get("maritalStatus") || "");
    const aboutMe = String(form.get("aboutMe") || "");
    const facebook = String(form.get("facebook") || "");
    const nationality = String(form.get("nationality") || "");
    const occupation = String(form.get("occupation") || "");

    const qualification = String(form.get("qualification") || "");
    const experience = String(form.get("experience") || "");
    const motherLanguage = String(form.get("motherLanguage") || "");
    const otherLanguage = String(form.get("otherLanguage") || "");

    // Additional fields from step 4
    const applyingFor = String(form.get("applyingFor") || "");
    const teachTajweedInEnglish = String(form.get("teachTajweedInEnglish") || "");
    const preferredInterviewTime = String(form.get("preferredInterviewTime") || "");
    const hoursPerWeek = String(form.get("hoursPerWeek") || "");
    const haveIjazah = String(form.get("haveIjazah") || "");
    const haveChildren = String(form.get("haveChildren") || "");
    const expectedSalary = String(form.get("expectedSalary") || "");
    const employmentType = String(form.get("employmentType") || "");
    const idealCandidate = String(form.get("idealCandidate") || "");
    const discoverySources = form.getAll("discoverySources");
    const declaration = form.get("declaration");

    // Files
    const profileImageFile = form.get("profileImage") as File | null;
    const cvFile = form.get("cv") as File | null;
    const readingAudioFile = form.get("readingAudio") as File | null;
    const recitationAudioFile = form.get("recitationAudio") as File | null;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Missing required fields (firstName, lastName, email)" },
        { status: 400 }
      );
    }

    const fromEmail = process.env.FROM_EMAIL;
    const toEmail = process.env.NOTIFY_TEACHER; // 👈 set in .env.local
    const toEmail2 = process.env.NOTIFY_TEACHER_2;
    const apiKey = process.env.BREVO_API_KEY;

    if (!fromEmail || !toEmail || !apiKey) {
      return NextResponse.json(
        { error: "Missing FROM_EMAIL, NOTIFY_TEACHER, or BREVO_API_KEY" },
        { status: 400 }
      );
    }

    const toEmails = [toEmail, toEmail2].filter(Boolean) as string[];

    // Prepare attachments
    const att: Array<{ name: string; content: string; type?: string }> = [];
    const profileAttachment = await fileToAttachment(profileImageFile);
    const cvAttachment = await fileToAttachment(cvFile);
    const readingAttachment = await fileToAttachment(readingAudioFile);
    const recitationAttachment = await fileToAttachment(recitationAudioFile);
    [profileAttachment, cvAttachment, readingAttachment, recitationAttachment]
      .filter(Boolean)
      .forEach((a) => att.push(a as any));

    const textLines = [
      "Form: Teacher Application",
      `Name: ${firstName} ${lastName}`,
      `Gender: ${gender}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Country: ${country}`,
      `DOB: ${dob}`,
      `Marital Status: ${maritalStatus}`,
      `Nationality: ${nationality}`,
      `Occupation: ${occupation}`,
      `Facebook: ${facebook}`,
      "",
      "About Me:",
      aboutMe || "-",
      "",
      "Academic & Professional:",
      `Qualification: ${qualification}`,
      `Experience: ${experience}`,
      `Mother Language: ${motherLanguage}`,
      `Other Language: ${otherLanguage}`,
      "",
      "Additional Information:",
      `Applying for: ${applyingFor}`,
      `Can teach Tajweed in English: ${teachTajweedInEnglish}`,
      `Preferred Interview Time: ${preferredInterviewTime}`,
      `Hours per week: ${hoursPerWeek}`,
      `Has Ijazah: ${haveIjazah}`,
      `Has Children: ${haveChildren}`,
      `Expected Salary: ${expectedSalary}`,
      `Employment Type: ${employmentType}`,
      `Ideal Candidate: ${idealCandidate}`,
      `Discovery Sources: ${discoverySources.join(", ")}`,
      `Declaration: ${declaration ? "Yes" : "No"}`,
      "",
      `Submitted: ${new Date().toISOString()}`,
    ];
    const textContent = textLines.join("\n");

    // Send admin notification email using Brevo template #12
    try {
      const adminNotificationResult = await BrevoService.sendTemplateEmail(
        toEmails,
        Number(process.env.BREVO_TEMPLATE_TEACHER_ADMIN_NOTIFICATION) || 12,
        {
          contact: {
            firstName,
            lastName,
            gender,
            email,
            phone,
            country,
            dob,
            maritalStatus,
            aboutMe,
            facebook,
            nationality,
            occupation,
            qualification,
            experience,
            motherLanguage,
            otherLanguage,
            applyingFor,
            teachTajweedInEnglish,
            preferredInterviewTime,
            hoursPerWeek,
            haveIjazah,
            haveChildren,
            expectedSalary,
            employmentType,
            idealCandidate,
            discoverySources: discoverySources.join(", "),
            declaration: declaration ? "Yes" : "No",
            submittedAt: new Date().toISOString(),
            
            // Booleans for file uploads
            profileImage: !!profileAttachment,
            cv: !!cvAttachment,
            readingAudio: !!readingAttachment,
            recitationAudio: !!recitationAttachment,
          }
        },
        undefined, // no subject override
        att.length > 0 ? att : undefined
      );
      
      if (!adminNotificationResult.success) {
        console.error("Failed to send admin notification email:", adminNotificationResult.error);
        // Fallback to plain text email if template fails
        const api = new Brevo.TransactionalEmailsApi();
        api.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

        const fallbackEmail: Brevo.SendSmtpEmail = {
          subject: `Teacher Application — ${firstName} ${lastName}`,
          sender: { email: fromEmail, name: "Website" },
          to: toEmails.map(email => ({ email })),
          replyTo: { email, name: `${firstName} ${lastName}` },
          textContent,
          htmlContent: textContent.replace(/\n/g, "<br />"),
          ...(att.length ? { attachment: att as any } : {}),
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

    // Add teacher to Brevo list (new functionality)
    try {
      const contactData = {
        email: email.toLowerCase(),
        firstName,
        lastName,
        phone,
        country,
      };

      // Add to teacher list (BREVO_LIST_TEACHER=11)
      const teacherListId = Number(process.env.BREVO_LIST_TEACHER) || 11;
      const result = await BrevoService.upsertContact(contactData, [teacherListId]);
      
      if (result.success) {
        await BrevoService.sendTemplateEmail(
          email,
          Number(process.env.BREVO_TEMPLATE_TEACHER_AUTO_RESPONSE) || 0,
          {
            firstName,
            lastName,
            qualification,
            experience,
            motherLanguage,
            applyingFor,
            hoursPerWeek,
            expectedSalary,
            employmentType,
          }
        );
      }
    } catch {
      // Intentionally swallow Brevo errors to avoid blocking form submission
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Brevo/teacher-apply error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to send" },
      { status: 500 }
    );
  }
}
