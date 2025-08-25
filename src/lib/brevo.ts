import * as Brevo from "@getbrevo/brevo";

// Initialize Brevo API clients (without API key - will be set in methods)
const contactsApi = new Brevo.ContactsApi();
const transactionalApi = new Brevo.TransactionalEmailsApi();

export interface ContactData {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  attributes?: Record<string, any>;
}

export interface EmailData {
  to: string | string[];
  subject: string;
  textContent: string;
  htmlContent?: string;
  replyTo?: { email: string; name?: string };
  templateId?: number;
  templateData?: Record<string, any>;
}

export interface NewsletterSubscription {
  email: string;
  firstName?: string;
  lastName?: string;
  listId?: number;
}

export class BrevoService {
  /**
   * Add or update a contact in Brevo
   */
  static async upsertContact(data: ContactData, listIds?: number[]) {
    try {
      // Set API key before making the call
      const apiKey = process.env.BREVO_API_KEY;
      if (!apiKey) {
        throw new Error("BREVO_API_KEY is not configured");
      }
      contactsApi.setApiKey(Brevo.ContactsApiApiKeys.apiKey, apiKey);
      
      // Prepare contact data
      const contactData: any = {
        email: data.email.toLowerCase(),
        updateEnabled: true,
      };
      
      // Add list IDs if provided - this ensures the contact is added to lists
      if (listIds && listIds.length > 0) {
        contactData.listIds = listIds;
        console.log(`📋 Adding contact to lists: ${listIds.join(', ')}`);
      }
      
      // Add attributes
      if (data.firstName || data.lastName || data.phone || data.country || data.attributes) {
        contactData.attributes = {};
        if (data.firstName) contactData.attributes.FIRSTNAME = data.firstName;
        if (data.lastName) contactData.attributes.LASTNAME = data.lastName;
        if (data.phone) contactData.attributes.PHONE = data.phone;
        if (data.country) contactData.attributes.COUNTRY = data.country;
        if (data.attributes) {
          Object.assign(contactData.attributes, data.attributes);
        }
      }
      
      console.log(`📧 Creating/updating contact: ${data.email} with data:`, JSON.stringify(contactData, null, 2));
      
      // Create/update the contact
      const contact = await contactsApi.createContact(contactData);
      console.log(`✅ Contact created/updated: ${data.email} with ID: ${contact.body?.id}`);
      
      // Double-check: Verify the contact was added to the lists
      if (listIds && listIds.length > 0) {
        for (const listId of listIds) {
          try {
            // Verify the contact is in the list by checking the contact details
            const contactDetails = await contactsApi.getContactInfo(data.email);
            const contactListIds = contactDetails.body?.listIds || [];
            
            if (contactListIds.includes(listId)) {
              console.log(`✅ Contact ${data.email} confirmed in list ${listId}`);
            } else {
              console.log(`⚠️ Contact ${data.email} not found in list ${listId}, attempting to add manually`);
              
              // Try to add the contact to the list manually
              const addToListData = {
                emails: [data.email],
                all: false
              };
              await contactsApi.addContactToList(listId, addToListData);
              console.log(`✅ Contact manually added to list ${listId}`);
            }
          } catch (listError: any) {
            console.error(`❌ Error checking/adding contact to list ${listId}:`, listError.message);
            
            // Try alternative method if the first one fails
            try {
              await contactsApi.createContact({
                email: data.email,
                listIds: [listId],
                updateEnabled: true
              });
              console.log(`✅ Contact added to list ${listId} using alternative method`);
            } catch (altError: any) {
              console.error(`❌ Alternative method also failed for list ${listId}:`, altError.message);
            }
          }
        }
      }
      
      return { success: true, contact };
    } catch (error: any) {
      console.error("❌ Error upserting contact:", error);
      if (error.response) {
        console.error("❌ Brevo API Response:", error.response.body);
      }
      return { success: false, error: error.message };
    }
  }

  /**
   * Send a transactional email
   */
  static async sendEmail(data: EmailData) {
    try {
      // Set API key before making the call
      const apiKey = process.env.BREVO_API_KEY;
      if (!apiKey) {
        throw new Error("BREVO_API_KEY is not configured");
      }
      transactionalApi.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
      
      const toEmails = Array.isArray(data.to) ? data.to : [data.to];
      
      const email: Brevo.SendSmtpEmail = {
        sender: {
          email: process.env.FROM_EMAIL || "noreply@example.com",
          name: process.env.FROM_NAME || "Website",
        },
        to: toEmails.map(email => ({ email })),
        subject: data.subject,
        textContent: data.textContent,
        htmlContent: data.htmlContent,
        replyTo: data.replyTo,
        templateId: data.templateId,
        params: data.templateData,
      };

      const result = await transactionalApi.sendTransacEmail(email);
      return { success: true, messageId: result.body?.messageId || 'sent' };
    } catch (error: any) {
      console.error("Error sending email:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send email using a Brevo template
   */
  static async sendTemplateEmail(
    to: string | string[],
    templateId: number,
    templateData: Record<string, any>,
    subject?: string,
    attachments?: { name: string; content: string; contentType?: string }[]
  ) {
    try {
      // Set API key before making the call
      const apiKey = process.env.BREVO_API_KEY;
      if (!apiKey) {
        throw new Error("BREVO_API_KEY is not configured");
      }
      transactionalApi.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
      
      const toEmails = Array.isArray(to) ? to : [to];
      
      // Log the template data for debugging
      console.log('BrevoService: Preparing to send template email.');
      console.log('BrevoService: Template ID:', templateId);
      console.log('BrevoService: Payload being sent:', JSON.stringify({ to: toEmails, params: templateData }, null, 2));
      
      const email: Brevo.SendSmtpEmail = {
        sender: {
          email: process.env.FROM_EMAIL || "noreply@example.com",
          name: process.env.FROM_NAME || "Website",
        },
        to: toEmails.map(email => ({ email })),
        templateId,
        params: templateData,
        ...(subject && { subject }),
        ...(attachments && attachments.length > 0 && { attachment: attachments }),
      };

      const result = await transactionalApi.sendTransacEmail(email);
      console.log('BrevoService: Response from Brevo API:', result.body);
      return { success: true, messageId: result.body?.messageId || 'sent' };
    } catch (error: any) {
      console.error("BrevoService: Error sending template email:", error.message);
      if (error.response) {
        console.error("BrevoService: Brevo API Response Body:", error.response.body);
      }
      return { success: false, error: error.message };
    }
  }

  /**
   * Subscribe to newsletter
   */
  static async subscribeToNewsletter(data: NewsletterSubscription) {
    try {
      const listId = data.listId || Number(process.env.BREVO_LIST_NEWSLETTER);
      
      const result = await this.upsertContact(
        {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        },
        listId ? [listId] : undefined
      );

      if (result.success) {
        // Send welcome email if template is configured
        const welcomeTemplateId = process.env.BREVO_TEMPLATE_WELCOME;
        if (welcomeTemplateId) {
          await this.sendTemplateEmail(
            data.email,
            Number(welcomeTemplateId),
            {
              firstName: data.firstName || "there",
              email: data.email,
            }
          );
        }
      }

      return result;
    } catch (error: any) {
      console.error("Error subscribing to newsletter:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send trial confirmation email using Brevo template
   */
  static async sendTrialConfirmation(data: any) {
    try {
      const templateId = process.env.BREVO_TEMPLATE_TRIAL_CONFIRMATION;
      
      const hasRequiredData = data.firstName && data.lastName && data.preferredDate && data.preferredTime && data.learningInterest;
      
      if (templateId && hasRequiredData) {
        // The template uses {{contact.name}}, so we must send a nested object.
        const templateData = {
          contact: {
            name: `${data.firstName} ${data.lastName}`,
            preferredDate: data.preferredDate,
            preferredTime: data.preferredTime,
            subject: data.learningInterest
          }
        };
        
        console.log('Sending trial confirmation email to:', data.email, 'using template:', templateId);
        
        // This sends the actual template email.
        const result = await this.sendTemplateEmail(
          data.email,
          Number(templateId),
          templateData
        );
        
        // Return the result directly. No more fallbacks that cause double emails.
        if (result.success) {
          console.log('✅ Brevo template email sent successfully:', result.messageId);
          return result;
        } else {
          console.error('❌ Brevo template email failed:', result.error);
          return { success: false, error: `Brevo template failed: ${result.error}` };
        }
        
      } else {
        console.error('❌ Missing template ID or required data for Brevo template. Will not send email.');
        return { success: false, error: 'Missing template ID or required data' };
      }
    } catch (error: any) {
      console.error("Error sending trial confirmation:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send fallback trial confirmation email with HTML content
   */
  static async sendTrialConfirmationFallback(data: any) {
    try {
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Trial Session Confirmation</title>
        </head>
        <body style="margin:0; padding:0; background-color:#053f7a; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <table align="center" width="620" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <tr>
              <td style="background-color:#ffffff; padding:30px 0 5px 0; text-align:center;">
                <img src="https://res.cloudinary.com/dromjx3rx/image/upload/v1750687676/Bayyinah_Logo_-_white_background_jo9dsg.webp" alt="Bayyinah Academy Logo" style="max-width:320px; height:auto; display:block; margin:0 auto;">
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td style="padding:20px 30px 30px 30px; color:#333; line-height:1.6;">
                <h2 style="margin:10px 0 20px 0; color:#2e86c1; font-size:22px;">📚 Trial Session Confirmation</h2>

                <p style="margin:0 0 10px 0;"><strong>Dear ${data.firstName} ${data.lastName},</strong></p>

                <p style="margin:0 0 10px 0;">Thank you for requesting a <strong>trial session</strong> with us on:</p>
                <p style="padding:10px 16px; background-color:#fff9e6; border-left:5px solid #f4c430; font-weight:bold; font-size:15px; margin:10px 0;">
                  📅 ${data.preferredDate} at ${data.preferredTime}
                </p>

                <p style="margin:0 0 10px 0;">We're excited to help you with your <strong>${data.learningInterest}</strong> studies!</p>

                <!-- What Happens Next -->
                <div style="display:grid; grid-template-columns:1fr; gap:12px; background:#fdfdfd; padding:16px 20px; border-radius:10px; border:1px solid #ddeeff; margin-top:20px;">
                  <h3 style="margin:0 0 10px 0; font-size:17px; color:#2e86c1;">✨ What Happens Next</h3>
                  <div style="background:#eaf4ff; padding:10px 14px; border-radius:6px;">✅ Our team will connect with you to confirm all session details.</div>
                  <div style="background:#fff0f5; padding:10px 14px; border-radius:6px;">📱 You can also reach us via 📞 or <strong>+44 7700 183406</strong></div>
                  <div style="background:#e8fff0; padding:10px 14px; border-radius:6px;"><strong>⏱️ Please allow up to 12 hours for a response.</strong></div>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:24px 30px; background-color:#f9f9f9; border-top:1px solid #eee;">
                <img src="https://res.cloudinary.com/dromjx3rx/image/upload/v1750784529/logo_-_Bayyinah_Transparent_xmxbc9.png" alt="Bayyinah Academy Logo" style="width:130px; height:auto; display:block; margin-bottom:10px;">
                
                <div style="color:#636e72; font-size:14px; line-height:1.6; margin-bottom:10px;">
                  <strong>📩</strong> <a href="mailto:support@bayyinah.academy" style="color:#2e86c1; text-decoration:none;">support@bayyinah.academy</a> |
                  <strong>📱</strong> <a href="tel:+447700183406" style="color:#2e86c1; text-decoration:none;">+44 7700 183406</a> | 
                  <strong>🌐</strong> <a href="https://www.bayyinah.academy" style="color:#2e86c1; text-decoration:none;">www.bayyinah.academy</a><br>
                  <strong>📌</strong> 128, City Road ECIV 2NX, London, United Kingdom
                </div>

                <div style="font-size:13px; color:#b2bec3; margin-top:12px;">
                  © 2025 Bayyinah Academy. All rights reserved.
                </div>
              </td>
            </tr>

          </table>
        </body>
        </html>
      `;

      const result = await this.sendEmail({
        to: data.email,
        subject: "Trial Session Confirmation - Bayyinah Academy",
        textContent: `Hi ${data.firstName} ${data.lastName},\n\nThank you for requesting a trial session with us on ${data.preferredDate} at ${data.preferredTime}.\n\nWe're excited to help you with your ${data.learningInterest} studies!\n\nWhat happens next:\n✅ Our team will connect with you to confirm all session details.\n📱 You can also reach us at +44 7700 183406\n⏱️ Please allow up to 12 hours for a response.\n\nBest regards,\nThe Bayyinah Academy Team`,
        htmlContent: htmlContent,
      });

      console.log('Fallback HTML email result:', result);
      return result;
    } catch (error: any) {
      console.error("Error sending fallback email:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send course enrollment confirmation
   */
  static async sendEnrollmentConfirmation(data: any) {
    try {
      const templateId = process.env.BREVO_TEMPLATE_COURSE_ENROLLMENT;
      
      if (templateId) {
        return await this.sendTemplateEmail(
          data.email,
          Number(templateId),
          {
            firstName: data.firstName,
            lastName: data.lastName,
            course: data.course,
            notes: data.notes,
          }
        );
      } else {
        // Fallback to plain email
        return await this.sendEmail({
          to: data.email,
          subject: "Course Enrollment Confirmation",
          textContent: `Hi ${data.firstName},\n\nThank you for enrolling in ${data.course}. We'll contact you soon with further details.\n\nBest regards,\nThe Team`,
        });
      }
    } catch (error: any) {
      console.error("Error sending enrollment confirmation:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send contact form confirmation
   */
  static async sendContactConfirmation(data: any) {
    try {
      const templateId = process.env.BREVO_TEMPLATE_CONTACT_CONFIRMATION;
      
      if (templateId) {
        return await this.sendTemplateEmail(
          data.email,
          Number(templateId),
          {
            name: data.name,
            subject: data.subject,
            message: data.message,
          }
        );
      } else {
        // Fallback to plain email
        return await this.sendEmail({
          to: data.email,
          subject: "Message Received",
          textContent: `Hi ${data.name},\n\nThank you for your message. We've received your inquiry about "${data.subject}" and will get back to you soon.\n\nBest regards,\nThe Team`,
        });
      }
    } catch (error: any) {
      console.error("Error sending contact confirmation:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send student form confirmation
   */
  static async sendStudentConfirmation(data: any) {
    try {
      const templateId = process.env.BREVO_TEMPLATE_STUDENT_WELCOME;
      
      if (templateId) {
        console.log('Sending student welcome email using template:', templateId);
        return await this.sendTemplateEmail(
          data.email,
          Number(templateId),
          {
            firstName: data.firstName,
            lastName: data.lastName,
            learningInterest: data.learningInterest,
            pricingPlan: data.pricingPlan,
            preferredDate: data.preferredDate,
            preferredTime: data.preferredTime,
          }
        );
      } else {
        console.log('No student welcome template configured, sending fallback email');
        // Fallback to plain email
        return await this.sendEmail({
          to: data.email,
          subject: "Student Form Confirmation",
          textContent: `Hi ${data.firstName},\n\nThank you for submitting your student form. We've received your interest in ${data.learningInterest} and will contact you soon to discuss your ${data.pricingPlan} plan.\n\nBest regards,\nThe Team`,
        });
      }
    } catch (error: any) {
      console.error("Error sending student confirmation:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send teacher form confirmation
   */
  static async sendTeacherConfirmation(data: any) {
    try {
      const templateId = process.env.BREVO_TEMPLATE_TEACHER_AUTO_RESPONSE;
      
      if (templateId) {
        console.log('Sending teacher auto-response email using template:', templateId);
        return await this.sendTemplateEmail(
          data.email,
          Number(templateId),
          {
            firstName: data.firstName,
            lastName: data.lastName,
            qualification: data.qualification,
            experience: data.experience,
            motherLanguage: data.motherLanguage,
          }
        );
      } else {
        console.log('No teacher auto-response template configured, sending fallback email');
        // Fallback to plain email
        return await this.sendEmail({
          to: data.email,
          subject: "Teacher Application Confirmation",
          textContent: `Hi ${data.firstName},\n\nThank you for submitting your teacher application. We've received your application with ${data.experience} experience and ${data.qualification} qualification. We'll review your application and get back to you soon.\n\nBest regards,\nThe Team`,
        });
      }
    } catch (error: any) {
      console.error("Error sending teacher confirmation:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Verify if a contact is in a specific list
   */
  static async isContactInList(email: string, listId: number) {
    try {
      const apiKey = process.env.BREVO_API_KEY;
      if (!apiKey) {
        throw new Error("BREVO_API_KEY is not configured");
      }
      contactsApi.setApiKey(Brevo.ContactsApiApiKeys.apiKey, apiKey);
      
      const contactInfo = await contactsApi.getContactInfo(email);
      const contactListIds = contactInfo.body?.listIds || [];
      
      const isInList = contactListIds.includes(listId);
      console.log(`🔍 Contact ${email} list verification:`, {
        contactListIds,
        targetListId: listId,
        isInList
      });
      
      return { success: true, isInList, contactListIds };
    } catch (error: any) {
      console.error(`❌ Error verifying contact list membership:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get contact lists (using ContactsApi methods)
   */
  static async getLists() {
    try {
      // In v3, we can get lists through the contacts API
      // This is a simplified version - you may need to adjust based on actual API
      return { success: true, lists: [] };
    } catch (error: any) {
      console.error("Error getting lists:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get contacts from a list
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async getContactsFromList(_listId: number, _limit = 50, _offset = 0) {
    try {
      // This would need to be implemented based on the actual v3 API structure
      return { success: true, contacts: [] };
    } catch (error: any) {
      console.error("Error getting contacts from list:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Remove contact from list
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async removeContactFromList(_listId: number, _email: string) {
    try {
      // This would need to be implemented based on the actual v3 API structure
      return { success: true };
    } catch (error: any) {
      console.error("Error removing contact from list:", error);
      return { success: false, error: error.message };
    }
  }
}

export default BrevoService;
