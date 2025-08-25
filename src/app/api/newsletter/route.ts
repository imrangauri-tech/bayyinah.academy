// app/api/newsletter/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import BrevoService from "@/lib/brevo";

/** -------- Helpers to read body in multiple formats (unchanged UI compatible) -------- */
async function readEmail(req: Request) {
  const ctype = req.headers.get("content-type") || "";

  // Try JSON
  if (ctype.includes("application/json")) {
    const json = await req.json().catch(() => ({}));
    return {
      email: json.email ?? json.Email ?? json.userEmail ?? undefined,
    };
  }

  // Try form/multipart
  if (ctype.includes("application/x-www-form-urlencoded") || ctype.includes("multipart/form-data")) {
    const form = await req.formData();
    return {
      email:
        (form.get("email") as string) ||
        (form.get("Email") as string) ||
        (form.get("userEmail") as string) ||
        undefined,
    };
  }

  // Fallback: try JSON again safely
  try {
    const json = await req.json();
    return {
      email: json?.email,
    };
  } catch {
    return { email: undefined };
  }
}

/** -------- Validation -------- */
const NewsletterSchema = z.object({
  email: z.string().email(),
});

/** -------- POST /api/newsletter -------- */
export async function POST(req: Request) {
  try {
    const raw = await readEmail(req);
    const parsed = NewsletterSchema.parse({
      email: typeof raw.email === "string" ? raw.email.trim().toLowerCase() : undefined,
    });

    console.log(`📧 Newsletter subscription request for: ${parsed.email}`);
    
    // Get the newsletter list ID from environment
    const newsletterListId = Number(process.env.BREVO_LIST_NEWSLETTER);
    console.log(`📋 Newsletter list ID: ${newsletterListId}`);
    
    if (!newsletterListId || isNaN(newsletterListId)) {
      console.error(`❌ Invalid newsletter list ID: ${process.env.BREVO_LIST_NEWSLETTER}`);
      return NextResponse.json({ 
        ok: false, 
        error: "Newsletter list not configured" 
      }, { status: 500 });
    }

    // Subscribe to newsletter using Brevo service
    const result = await BrevoService.upsertContact(
      {
        email: parsed.email,
      },
      [newsletterListId] // Explicitly pass the list ID
    );

    console.log(`📊 Brevo service result:`, JSON.stringify(result, null, 2));

    if (result.success) {
      console.log(`✅ Newsletter subscription successful for ${parsed.email}`);
      
      // Send welcome email using Brevo template (if available)
      const welcomeTemplateId = process.env.BREVO_TEMPLATE_WELCOME;
      if (welcomeTemplateId && welcomeTemplateId !== "0") {
        try {
          console.log(`📧 Sending welcome email using template: ${welcomeTemplateId}`);
          const welcomeResult = await BrevoService.sendTemplateEmail(
            parsed.email,
            Number(welcomeTemplateId),
            {
              firstName: "there", // No firstName or lastName in the new schema
              email: parsed.email,
            }
          );
          console.log(`📧 Welcome email result:`, welcomeResult);
        } catch (templateError) {
          console.log("⚠️ No welcome template available, skipping welcome email:", templateError);
        }
      } else {
        console.log("⚠️ No welcome template configured, skipping welcome email");
      }

      // Send notification email to admin
      const notifyAdminEmail = process.env.NOTIFY_NEWSLETTER;
      if (notifyAdminEmail) {
        try {
          console.log(`📧 Sending admin notification to: ${notifyAdminEmail}`);
          
          // Enhanced admin notification with more details
          const adminResult = await BrevoService.sendEmail({
            to: notifyAdminEmail,
            subject: "📧 New Newsletter Subscription - Bayyinah Academy",
            textContent: `A new user has subscribed to the newsletter:

📧 Email: ${parsed.email}
📅 Subscription Date: ${new Date().toLocaleDateString()}
🆔 Contact ID: ${result.contact?.body?.id || 'N/A'}
📋 List ID: ${newsletterListId}

This contact has been automatically added to the newsletter list in Brevo.

Best regards,
Bayyinah Academy System`,
            htmlContent: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                  <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #2e86c1; margin: 0;">📧 New Newsletter Subscription</h2>
                    <p style="color: #666; margin: 10px 0 0 0;">Bayyinah Academy</p>
                  </div>
                  
                  <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h3 style="color: #2e86c1; margin: 0 0 15px 0;">🎉 New Subscriber Details</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #ddeeff;"><strong>📧 Email:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #ddeeff;">${parsed.email}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #ddeeff;"><strong>📅 Subscription Date:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #ddeeff;">${new Date().toLocaleDateString()}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>📋 List ID:</strong></td>
                        <td style="padding: 8px 0;">${newsletterListId}</td>
                      </tr>
                    </table>
                  </div>
                  
                  <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h4 style="color: #2e86c1; margin: 0 0 10px 0;">✅ Action Taken</h4>
                    <p style="margin: 0; color: #333;">This contact has been automatically added to the newsletter list in Brevo.</p>
                  </div>
                  
                  <div style="text-align: center; margin-top: 30px;">
                    <p style="color: #666; font-size: 14px; margin: 0;">
                      Best regards,<br>
                      <strong>Bayyinah Academy System</strong>
                    </p>
                  </div>
                </div>
              </div>
            `,
          });
          
          if (adminResult.success) {
            console.log(`✅ Admin notification sent successfully to ${notifyAdminEmail}`);
            console.log(`📧 Admin notification details:`, adminResult);
          } else {
            console.error(`❌ Admin notification failed:`, adminResult.error);
          }
        } catch (adminEmailError) {
          console.error("❌ Failed to send admin notification for newsletter subscription:", adminEmailError);
        }
      } else {
        console.log("⚠️ No admin notification email configured - set NOTIFY_NEWSLETTER in .env.local");
      }
    } else {
      console.error(`❌ Newsletter subscription failed:`, result.error);
    }

    if (result.success) {
      return NextResponse.json({ 
        ok: true, 
        message: "Successfully subscribed to newsletter!",
        contactId: result.contact?.body?.id,
        listId: newsletterListId
      });
    } else {
      return NextResponse.json({ 
        ok: false, 
        error: result.error || "Failed to subscribe" 
      }, { status: 500 });
    }
  } catch (err: any) {
    // zod errors or other errors
    const status = err?.name === "ZodError" ? 400 : 500;
    const message =
      err?.name === "ZodError" ? "Invalid input data" : err?.message ?? "Unexpected error";
    
    console.error("❌ Newsletter subscription error:", err);
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}

/** -------- GET /api/newsletter (for testing) -------- */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const action = searchParams.get('action');
    
    if (action === 'verify' && email) {
      // Verify if a contact is in the newsletter list
      const newsletterListId = Number(process.env.BREVO_LIST_NEWSLETTER);
      
      if (!newsletterListId || isNaN(newsletterListId)) {
        return NextResponse.json({ 
          ok: false, 
          error: "Newsletter list not configured" 
        }, { status: 500 });
      }
      
      const verification = await BrevoService.isContactInList(email, newsletterListId);
      
      return NextResponse.json({ 
        ok: true,
        action: 'verify',
        email,
        listId: newsletterListId,
        verification
      });
    }
    
    return NextResponse.json({ 
      message: "Newsletter API endpoint",
      status: "active",
      endpoints: {
        "POST /api/newsletter": "Subscribe to newsletter",
        "GET /api/newsletter?action=verify&email=test@example.com": "Verify contact list membership"
      }
    });
  } catch (error: any) {
    console.error("❌ Newsletter GET endpoint error:", error);
    return NextResponse.json({ 
      ok: false, 
      error: error.message 
    }, { status: 500 });
  }
}