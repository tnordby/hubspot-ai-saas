import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { env } from "@/lib/env";

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  agency: z.string().optional(),
  notes: z.string().optional(),
});

type Payload = z.infer<typeof schema>;

async function parsePayload(req: Request): Promise<Payload | null> {
  const contentType = req.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const json = await req.json().catch(() => null);
    const parsed = schema.safeParse(json);
    return parsed.success ? parsed.data : null;
  }

  if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const form = await req.formData().catch(() => null);
    if (!form) return null;
    const obj = {
      email: String(form.get("email") ?? ""),
      name: form.get("name") ? String(form.get("name")) : undefined,
      agency: form.get("agency") ? String(form.get("agency")) : undefined,
      notes: form.get("notes") ? String(form.get("notes")) : undefined,
    };
    const parsed = schema.safeParse(obj);
    return parsed.success ? parsed.data : null;
  }

  return null;
}

export async function POST(req: Request) {
  const payload = await parsePayload(req);
  if (!payload) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { email, name, agency, notes } = payload;

  const resend = new Resend(env.RESEND_API_KEY);
  await resend.emails.send({
    from: env.LEADS_FROM_EMAIL,
    to: env.LEADS_TO_EMAIL,
    replyTo: email,
    subject: `Early access request: ${email}`,
    text:
      `Early access request\n\n` +
      `Email: ${email}\n` +
      (name ? `Name: ${name}\n` : "") +
      (agency ? `Agency: ${agency}\n` : "") +
      (notes ? `Notes: ${notes}\n` : ""),
  });

  // If a browser posted a form, redirect to thank-you page.
  const accept = req.headers.get("accept") ?? "";
  if (accept.includes("text/html")) {
    return NextResponse.redirect(new URL("/early-access?submitted=1", req.url));
  }

  return NextResponse.json({ ok: true });
}
