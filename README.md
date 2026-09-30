# Munge Eba & Co. Law Firm

Bilingual institutional website for **Munge Eba & Co. Law Firm**, led by Munge Eba Ngwesse, Managing Partner and Advocate at the Cameroon Bar, in Douala, Cameroon.

## Stack

- Astro 7 with static output
- Bounded WebGL logo shimmer plus CSS/DOM section motion, with static fallbacks and a reduced-motion path
- Local self-hosted Cormorant Garamond and Manrope fonts
- Vercel Function contact delivery through Resend
- Nineteen generated English and French HTML pages, including the 404 page

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
npm test
npm audit
```

## Contact delivery

Copy `.env.example` to `.env` locally or configure the same variables in Vercel:

- `SITE_URL` — currently set to the preferred domain, `https://mungeebalaw.cm`
- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` — must use a domain that has actually been verified in Resend
- `CONTACT_TO_EMAIL` — defaults to `mungeebalaw@gmail.com`

The sample sender address assumes that `mungeebalaw.cm` will be acquired and verified. Change it if a different sending domain is used. The browser form never claims success unless `/api/contact` returns a successful response; local UI validation is not proof of live email delivery.

## Hero motion and brand assets

The hero uses the exact supplied logo with a brief, low-power WebGL light sweep. Rendering stops after 1.15 seconds; reduced-motion and unsupported-WebGL environments retain the static logo. It does not use a custom cursor or a full-screen blocking walkthrough.

The repository does not currently contain generated or commissioned video. The rejected architectural concept plates were removed rather than presented as real office footage. `HERO-MEDIA-SPEC.md` defines the approved-footage handoff and delivery files.

The supplied logo is preserved in `public/brand/munge-eba-logo-original.png`. The transparent derivative is extracted from that source without redrawing, generative reinterpretation or non-uniform scaling. Responsive assets can be regenerated with `py scripts/export-logo-assets.py` in an environment with Pillow and NumPy.

## Content source and publication boundary

Client answers are recorded in `CLIENT-ANSWERS.md`. Confirmed public facts include the official name, professional title, Cameroon Bar wording, practice since 2018, three practice areas, priority audiences, office hours, paid consultations, remote appointments, telephone, email and preferred domain.

Before launch, verify domain ownership and DNS, configure and test Resend from Vercel, receive and approve the promised portrait and office media, obtain final bilingual and Cameroonian legal review, and run physical-device QA. No testimonials, case results, unverifiable credentials or response-time promises may be added. See `PROJECT-STATE.md` for the current handoff.
