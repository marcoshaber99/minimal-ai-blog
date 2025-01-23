import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, updateUser, deleteUser } from "@/lib/db";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const eventType = evt.type;

  try {
    switch (eventType) {
      case "user.created": {
        const {
          id,
          email_addresses,
          username,
          first_name,
          last_name,
          image_url,
        } = evt.data;

        await createUser({
          id,
          email: email_addresses?.[0]?.email_address,
          username,
          firstName: first_name,
          lastName: last_name,
          imageUrl: image_url,
        });
        break;
      }
      case "user.updated": {
        const {
          id,
          email_addresses,
          username,
          first_name,
          last_name,
          image_url,
        } = evt.data;

        await updateUser(id, {
          email: email_addresses?.[0]?.email_address,
          username,
          firstName: first_name,
          lastName: last_name,
          imageUrl: image_url,
        });
        break;
      }
      case "user.deleted": {
        const { id } = evt.data;
        if (id) {
          await deleteUser(id);
        }
        break;
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Error processing webhook", { status: 500 });
  }
}
