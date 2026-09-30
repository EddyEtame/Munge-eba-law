# Munge Eba & Co. Law Firm — project state

## Completed locally

- Migrated the former React/Vite prototype to Astro 7 static output.
- Replaced the former Trinity branding and stale contact details.
- Added nineteen generated HTML pages across English and French: home, practice index, three practice pages, firm, contact, privacy, legal notice and the 404 page.
- Reframed the practice around the three client-confirmed areas: business law, human rights and conflict management.
- Replaced the blocking portal walkthrough and custom cursor with content-first motion, a 1.15-second low-power logo shimmer that stops, a static fallback and a reduced-motion path.
- Preserved the exact supplied logo and created proportional transparent derivatives directly from it, without redrawing, generative reinterpretation or non-uniform scaling.
- Added structured LegalService data, canonical tags, hreflang, Open Graph metadata, sitemap and robots directives using the preferred `.cm` origin.
- Added a Vercel/Resend contact function with origin validation, input limits, honeypot, consent and HTML escaping.
- Added Vercel security headers and public-shell/contact validation scripts.

## Confirmed business facts used

- Official name: **Munge Eba & Co. Law Firm**
- Managing Partner: **Munge Eba Ngwesse**
- Professional wording: **Advocate at the Cameroon Bar / Avocate au Barreau du Cameroun**
- Practice began: **2018**
- Languages: **English and French**
- Priority clients: **foreign investors, NGOs and individuals**
- Practice areas: **business law, human rights and conflict management**; business law appears first
- Values: **honesty, integrity and professionalism**
- Office hours: **Monday to Friday, 08:30–17:30**
- Consultations: **paid, by appointment, in person or remotely**; duration and response timing depend on the matter
- Office: Rue pavée, opposite the main entrance of Camtel Bepanda, first building on the right, top floor, right-hand side, Douala
- Telephone: **+237 658 789 253**
- Email: **mungeebalaw@gmail.com**
- Preferred domain: **mungeebalaw.cm**
- Hosting target: **Vercel**
- No advertising; no testimonials or case results are authorised for publication

The complete response record, including unanswered questions, is in `CLIENT-ANSWERS.md`.

## Must be completed before public launch

1. Obtain and approve the professional portrait and office photos/videos the client indicated she can provide. None have yet been supplied to this repository.
2. Obtain and approve any real office video required for a future exterior-to-interior sequence. No generated or commissioned video is currently present, and the rejected architectural concept plates have been removed. Follow `HERO-MEDIA-SPEC.md` for the capture and delivery requirements.
3. Validate any detailed matter examples before publication; question 10 was unanswered, so service copy must remain high-level.
4. Do not add testimonials, anonymous testimonials, case results, honours, credentials or memberships without new client evidence and publication approval.
5. Confirm who will provide final validation of both language versions; question 35 was unanswered.
6. Confirm ownership and availability of `mungeebalaw.cm`, configure DNS for Vercel and verify the final canonical origin.
7. Verify a sending domain in Resend and set all variables from `.env.example` in Vercel.
8. Send real test enquiries from Vercel preview and production; verify delivery, reply-to, spam handling and failure behaviour.
9. Have Cameroonian counsel approve the privacy notice, legal notice, contact intake and compliance with the instruction that there be no advertising.
10. Run final browser-console, keyboard, reduced-motion, no-JavaScript, low-power and physical iPhone/Android QA.

## Production boundary

The project can be validated locally as a static implementation. The preferred domain in code is not evidence of purchase, DNS configuration or ownership. The contact form is not proven operational until live Resend delivery is tested. The current media is not a substitute for client-approved real office imagery. Public launch remains contingent on the external, legal, media and device checks above.
