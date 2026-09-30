import { Resend } from 'resend';

const MAX_LENGTHS = { name: 100, email: 160, phone: 40, matter: 160, message: 2000, locale: 2 };
const clean = (value, max) => String(value ?? '').trim().slice(0, max);

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  const allowedOrigins = [process.env.SITE_URL, process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`].filter(Boolean);
  const origin = request.headers.origin;
  if (allowedOrigins.length && origin && !allowedOrigins.includes(origin)) return response.status(403).json({ error: 'Origin rejected' });

  let body;
  try {
    body = typeof request.body === 'string' ? JSON.parse(request.body || '{}') : (request.body || {});
  } catch {
    return response.status(400).json({ error: 'Invalid request body' });
  }
  if (body.company_website) return response.status(200).json({ ok: true });

  const data = Object.fromEntries(Object.entries(MAX_LENGTHS).map(([key, max]) => [key, clean(body[key], max)]));
  if (!data.name || !data.email || !data.matter || !data.message || !body.consent) return response.status(400).json({ error: 'Required fields are missing' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return response.status(400).json({ error: 'Invalid email address' });
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) return response.status(503).json({ error: 'Email service is not configured' });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const safe = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL || 'mungeebalaw@gmail.com',
      replyTo: data.email,
      subject: `Consultation request — ${data.matter}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nTelephone: ${data.phone || 'Not provided'}\nLanguage: ${data.locale}\nMatter: ${data.matter}\n\n${data.message}`,
      html: `<h2>New consultation request</h2><p><strong>Name:</strong> ${safe(data.name)}</p><p><strong>Email:</strong> ${safe(data.email)}</p><p><strong>Telephone:</strong> ${safe(data.phone || 'Not provided')}</p><p><strong>Language:</strong> ${safe(data.locale)}</p><p><strong>Matter:</strong> ${safe(data.matter)}</p><hr><p style="white-space:pre-wrap">${safe(data.message)}</p>`,
    });
    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact delivery failed', error instanceof Error ? error.message : 'Unknown error');
    return response.status(502).json({ error: 'Delivery failed' });
  }
}
