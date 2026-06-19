import { Resend } from "resend";

import { siteConfig } from "@/content/site";
import type { ContactInput, DemoInput, QuoteInput } from "@/lib/validations";

const defaultFromEmail = "Kriovya Labs <onboarding@resend.dev>";

function getFromEmail() {
  return process.env.RESEND_FROM_EMAIL || defaultFromEmail;
}

function getToEmail() {
  return (
    process.env.CONTACT_TO_EMAIL ||
    process.env.LEADS_TO_EMAIL ||
    siteConfig.email ||
    "kriovyalabs@gmail.com"
  );
}

export function hasEmailConfig() {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendContactEmail(data: ContactInput) {
  return sendLeadEmail({
    subject: "New contact message - Kriovya Labs",
    replyTo: data.email,
    rows: [
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone || "-"],
      ["Message", data.message],
    ],
  });
}

export async function sendQuoteEmail(data: QuoteInput) {
  return sendLeadEmail({
    subject: `New quote request - ${data.projectType}`,
    replyTo: data.email,
    rows: [
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Business", data.businessName],
      ["Project Type", data.projectType],
      ["Budget", data.budgetRange || "-"],
      ["Timeline", data.timeline || "-"],
      ["Requirements", data.requirements],
    ],
  });
}

export async function sendDemoEmail(data: DemoInput) {
  return sendLeadEmail({
    subject: `New demo request - ${data.product}`,
    replyTo: data.email,
    rows: [
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Company", data.companyName || "-"],
      ["Product", data.product],
      ["Notes", data.notes || "-"],
    ],
  });
}

async function sendLeadEmail({
  subject,
  rows,
  replyTo,
}: {
  subject: string;
  rows: [string, string][];
  replyTo?: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing Resend API key");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const result = await resend.emails.send({
    from: getFromEmail(),
    to: [getToEmail()],
    subject,
    replyTo,
    html: renderLeadEmail(subject, rows),
  });

  if (result.error) {
    throw result.error;
  }

  return result.data;
}

function renderLeadEmail(title: string, rows: [string, string][]) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111827">
      <h2>${escapeHtml(title)}</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:680px">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="border:1px solid #e5e7eb;font-weight:700;width:160px;vertical-align:top">${escapeHtml(label)}</td>
                  <td style="border:1px solid #e5e7eb;white-space:pre-wrap">${escapeHtml(value)}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function escapeHtml(value: string) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
