# Munge Eba Law

Bilingual, cinematic website for **Munge Eba & Co. Law Firm**, led by Munge Eba Ngwesse in Douala, Cameroon.

## Stack

- Astro 7 static output
- Native WebGL shader for the entrance sequence
- Local self-hosted Cormorant Garamond and Manrope fonts
- Vercel Function contact delivery through Resend
- English and French crawlable routes

## Local development

The project requires Node.js 22.19 or newer.

```bash
npm install
npm run dev
```

Validation:

```bash
npm run check
npm run build
npm audit
```

## Contact delivery

Copy `.env.example` to `.env` locally or configure the same variables in Vercel:

- `SITE_URL`
- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` — must use a domain verified in Resend
- `CONTACT_TO_EMAIL` — defaults to `mungeebalaw@gmail.com`

The browser form never claims success unless `/api/contact` returns a successful response. Do not treat local UI validation as proof of live email delivery.

## Hero media handoff

The current hero is a production-safe procedural WebGL entrance. When footage is ready, provide:

1. Exterior approach: 8–12 seconds, stable forward movement, 16:9 master, clean view of the entrance.
2. Door transition: 3–5 seconds, camera crossing the threshold.
3. Interior reveal: 8–12 seconds, slow controlled motion with usable dark or uncluttered space for text.
4. Preferred delivery: ProRes or high-bitrate H.264 master. Web versions will be prepared as MP4/WebM with a poster image.

The media directory is `public/media/`. Video texture integration should happen only after the actual clips are approved and compressed.

## Publication boundary

Before launch, confirm the questionnaire in `CLIENT-QUESTIONS.md`, the final domain, verified sender domain, professional registration details, practice-area wording, office hours and approved portrait. See `PROJECT-STATE.md` for the exact handoff.
