import { NextResponse } from "next/server";
import BrevoService from "@/lib/brevo";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'lists':
        const listsResult = await BrevoService.getLists();
        if (listsResult.success) {
          return NextResponse.json({ 
            ok: true, 
            lists: listsResult.lists 
          });
        } else {
          return NextResponse.json({ 
            ok: false, 
            error: listsResult.error 
          }, { status: 500 });
        }

      case 'contacts':
        const listId = searchParams.get('listId');
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');
        
        if (!listId) {
          return NextResponse.json({ 
            ok: false, 
            error: "listId is required" 
          }, { status: 400 });
        }

        const contactsResult = await BrevoService.getContactsFromList(
          parseInt(listId), 
          limit, 
          offset
        );
        
        if (contactsResult.success) {
          return NextResponse.json({ 
            ok: true, 
            contacts: contactsResult.contacts 
          });
        } else {
          return NextResponse.json({ 
            ok: false, 
            error: contactsResult.error 
          }, { status: 500 });
        }

      default:
        return NextResponse.json({ 
          message: "Brevo API endpoint",
          status: "active",
          availableActions: ["lists", "contacts"],
          usage: "?action=lists or ?action=contacts&listId=1&limit=50&offset=0"
        });
    }
  } catch (error: any) {
    console.error("Brevo API error:", error);
    return NextResponse.json({ 
      ok: false, 
      error: error.message || "Internal server error" 
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, data } = body;

    switch (action) {
      case 'send-email':
        const emailResult = await BrevoService.sendEmail(data);
        return NextResponse.json(emailResult);

      case 'send-template':
        const { to, templateId, templateData, subject } = data;
        const templateResult = await BrevoService.sendTemplateEmail(
          to, 
          templateId, 
          templateData, 
          subject
        );
        return NextResponse.json(templateResult);

      case 'upsert-contact':
        const contactResult = await BrevoService.upsertContact(
          data.contactData, 
          data.listIds
        );
        return NextResponse.json(contactResult);

      case 'remove-contact':
        const { listId, email } = data;
        const removeResult = await BrevoService.removeContactFromList(listId, email);
        return NextResponse.json(removeResult);

      default:
        return NextResponse.json({ 
          ok: false, 
          error: `Unknown action: ${action}` 
        }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Brevo API POST error:", error);
    return NextResponse.json({ 
      ok: false, 
      error: error.message || "Internal server error" 
    }, { status: 500 });
  }
}
