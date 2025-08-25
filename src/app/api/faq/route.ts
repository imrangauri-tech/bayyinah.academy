// app/api/faq/route.ts
import { NextResponse } from "next/server";
import * as Brevo from "@getbrevo/brevo";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = Schema.parse(body);

    const apiKey = process.env.BREVO_API_KEY;
    const fromEmail = process.env.FROM_EMAIL;
    const toEmail = process.env.FAQ_INBOUND; // where you want to receive FAQ messages
    const toEmail2 = process.env.FAQ_INBOUND_2;

    if (!apiKey || !fromEmail || !toEmail) {
      return NextResponse.json(
        { ok: false, error: "Missing BREVO_API_KEY, FROM_EMAIL or FAQ_INBOUND" },
        { status: 500 }
      );
    }

    const toEmails = [toEmail, toEmail2].filter(Boolean) as string[];

    const mail = new Brevo.TransactionalEmailsApi();
    mail.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

    // Send to you (inbound)
    await mail.sendTransacEmail({
      sender: { email: fromEmail, name: "Website" },
      to: toEmails.map(email => ({ email })),
      subject: `New FAQ question from ${data.name}`,
      htmlContent: `
        <div style="font-family:Inter,Arial,sans-serif;font-size:14px;color:#111">
          <h2>New FAQ Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Message:</strong></p>
          <pre style="white-space:pre-wrap;background:#f7f7f7;padding:12px;border-radius:8px">${data.message}</pre>
          <hr />
          <p style="color:#666">Sent from FAQ form</p>
        </div>
      `,
    });

    // (Optional) Auto-reply to the user — comment out if not needed
    await mail.sendTransacEmail({
      sender: { email: fromEmail, name: "Support Team" },
      to: [{ email: data.email, name: data.name }],
      subject: "We received your question",
      htmlContent: `
        <div style="font-family:Inter,Arial,sans-serif;font-size:14px;color:#111">
          <p>Salam ${data.name},</p>
          <p>Thanks for reaching out. Our team will get back to you soon.</p>
          <p><em>Your message:</em></p>
          <blockquote style="border-left:3px solid #ddd;margin:8px 0;padding-left:12px;color:#555">
            ${data.message}
          </blockquote>
          <p>— Team</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    const status = err?.name === "ZodError" ? 400 : 500;
    return NextResponse.json(
      { ok: false, error: err?.message || "Unexpected error", issues: err?.issues },
      { status }
    );
  }
}
