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

## Cinematic hero

The hero combines three original generated architectural plates with a procedural WebGL light layer and a timed camera sequence:

1. Rain-darkened Douala exterior approach.
2. Brass-and-walnut threshold opening.
3. Warm private consultation interior.

The exact supplied logo is composited separately, so generated media never substitutes or redraws the brand mark. Optimized WebP plates live in `public/media/`. They can later be replaced by approved MP4/WebM footage without changing the content or accessibility layer.

## Publication boundary

Before launch, confirm the questionnaire in `CLIENT-QUESTIONS.md`, the final domain, verified sender domain, professional registration details, practice-area wording, office hours and approved portrait. See `PROJECT-STATE.md` for the exact handoff.
