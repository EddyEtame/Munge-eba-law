export type Locale = 'en' | 'fr';

export const firm = {
  shortName: 'Munge Eba & Co.',
  legalName: 'Munge Eba & Co. Law Firm',
  principal: 'Munge Eba Ngwesse',
  title: { en: 'Managing Partner', fr: 'Managing Partner' },
  admission: { en: 'Advocate at the Cameroon Bar', fr: 'Avocate au Barreau du Cameroun' },
  phoneDisplay: '+237 658 789 253',
  phoneHref: '+237658789253',
  email: 'mungeebalaw@gmail.com',
  domain: 'mungeebalaw.cm',
  address: {
    en: 'Paved street opposite the main entrance of Camtel Bepanda. First building on the right, top floor, right-hand side, Douala, Cameroon.',
    fr: 'Rue pavée, en face de l’entrée principale de Camtel Bépanda. Premier bâtiment à droite, dernier niveau à droite, Douala, Cameroun.',
  },
  practiceSince: '2018',
  hours: { en: 'Monday–Friday, 08:30–17:30', fr: 'Du lundi au vendredi, 8 h 30–17 h 30' },
};

export const content = {
  en: {
    localeName: 'English', alternateLabel: 'FR',
    nav: { home: 'Home', services: 'Practice', about: 'Firm', contact: 'Book a consultation' },
    hero: {
      label: 'Munge Eba & Co. Law Firm',
      title: 'Cameroonian legal counsel for foreign investors, NGOs and individuals.',
      body: 'Business law, human rights and conflict management in English and French.',
      primary: 'Book a consultation', secondary: 'View our practice',
    },
    home: {
      introEyebrow: 'The practice',
      introTitle: 'Legal guidance grounded in Cameroon’s legal and regulatory environment.',
      introBody: 'The firm takes time to understand each client’s objectives before proposing practical legal solutions adapted to the matter.',
      expertiseEyebrow: 'Practice areas', expertiseTitle: 'Business law, human rights and conflict management.',
      expertiseBody: 'Our work centres on business law, human rights and conflict management. The exact scope of an engagement is agreed after an initial consultation.',
      approachEyebrow: 'Working method', approachTitle: 'A clear method for each engagement.',
      profileEyebrow: 'Managing Partner', profileTitle: 'Munge Eba Ngwesse',
      profileBody: 'Advocate at the Cameroon Bar, practising since 2018 in French and English. Her approach is grounded in honesty, integrity, professionalism and individual attention.',
      audienceEyebrow: 'Who we advise', audienceTitle: 'Foreign investors, NGOs and individuals.',
      audienceBody: 'The firm works with foreign investors entering or developing business in Cameroon, NGOs working in human rights, and individuals seeking direct legal guidance.',
    },
    process: [
      ['01', 'Understand', 'We begin with the objective, the relevant facts and the practical constraints.'],
      ['02', 'Assess', 'We examine the applicable legal and regulatory position in Cameroon.'],
      ['03', 'Advise', 'We set out a practical course of action adapted to the matter.'],
    ],
    consultation: {
      eyebrow: 'Consultation', title: 'Request an appointment.',
      body: 'Initial consultations are paid. Timing and duration are agreed according to the matter. Remote consultations are available by appointment. Do not send confidential or urgent information through this form.',
      submit: 'Request an appointment', sending: 'Sending…',
      consent: 'I understand that submitting this form does not create a lawyer–client relationship and I consent to the processing of this information to respond to my enquiry.',
      success: 'Thank you. Your appointment request has been received.',
      error: 'We could not send your request. Please email us directly at mungeebalaw@gmail.com.',
    },
    footerTag: 'Business law. Human rights. Conflict management.',
  },
  fr: {
    localeName: 'Français', alternateLabel: 'EN',
    nav: { home: 'Accueil', services: 'Domaines', about: 'Cabinet', contact: 'Prendre rendez-vous' },
    hero: {
      label: 'Munge Eba & Co. Law Firm',
      title: 'Conseil juridique camerounais pour les investisseurs étrangers, les ONG et les particuliers.',
      body: 'Droit des affaires, droits humains et gestion des conflits, en français et en anglais.',
      primary: 'Prendre rendez-vous', secondary: 'Voir nos domaines',
    },
    home: {
      introEyebrow: 'Le cabinet',
      introTitle: 'Un conseil ancré dans l’environnement juridique et réglementaire camerounais.',
      introBody: 'Le cabinet prend le temps de comprendre les objectifs de chaque client avant de proposer des solutions juridiques pratiques et adaptées au dossier.',
      expertiseEyebrow: 'Domaines d’intervention', expertiseTitle: 'Droit des affaires, droits humains et gestion des conflits.',
      expertiseBody: 'Notre activité est centrée sur le droit des affaires, les droits humains et la gestion des conflits. Le périmètre précis de l’intervention est défini après une première consultation.',
      approachEyebrow: 'Méthode de travail', approachTitle: 'Une méthode claire pour chaque mission.',
      profileEyebrow: 'Managing Partner', profileTitle: 'Munge Eba Ngwesse',
      profileBody: 'Avocate au Barreau du Cameroun, elle exerce depuis 2018 en français et en anglais. Son approche repose sur l’honnêteté, l’intégrité, le professionnalisme et un accompagnement personnalisé.',
      audienceEyebrow: 'Nos clients', audienceTitle: 'Investisseurs étrangers, ONG et particuliers.',
      audienceBody: 'Le cabinet accompagne les investisseurs étrangers qui souhaitent s’implanter ou développer leurs activités au Cameroun, les ONG actives dans les droits humains et les particuliers qui recherchent un conseil juridique direct.',
    },
    process: [
      ['01', 'Comprendre', 'Nous commençons par l’objectif, les faits pertinents et les contraintes pratiques.'],
      ['02', 'Analyser', 'Nous examinons la situation juridique et réglementaire applicable au Cameroun.'],
      ['03', 'Conseiller', 'Nous définissons une démarche pratique et adaptée au dossier.'],
    ],
    consultation: {
      eyebrow: 'Consultation', title: 'Demander un rendez-vous.',
      body: 'La première consultation est payante. Le délai et la durée sont convenus selon le dossier. Les consultations à distance sont possibles sur rendez-vous. N’envoyez aucune information confidentielle ou urgente par ce formulaire.',
      submit: 'Demander un rendez-vous', sending: 'Envoi…',
      consent: 'Je comprends que l’envoi de ce formulaire ne crée pas de relation avocat–client et j’accepte le traitement de ces informations afin de répondre à ma demande.',
      success: 'Merci. Votre demande de rendez-vous a bien été reçue.',
      error: 'Votre demande n’a pas pu être envoyée. Écrivez-nous directement à mungeebalaw@gmail.com.',
    },
    footerTag: 'Droit des affaires. Droits humains. Gestion des conflits.',
  },
} as const;

export const services = [
  {
    slug: 'business-law', number: '01',
    en: { title: 'Business law', summary: 'Legal support for investors and businesses operating in Cameroon.', description: 'We assist foreign investors and businesses in understanding the Cameroonian legal and regulatory environment, establishing their activities and protecting their interests as they develop.', matters: ['Foreign investment and establishment', 'Business development in Cameroon', 'Legal and regulatory guidance'] },
    fr: { title: 'Droit des affaires', summary: 'Accompagnement juridique des investisseurs et entreprises au Cameroun.', description: 'Nous accompagnons les investisseurs étrangers et les entreprises dans la compréhension de l’environnement juridique et réglementaire camerounais, l’implantation de leurs activités et la protection de leurs intérêts au cours de leur développement.', matters: ['Investissement étranger et implantation', 'Développement d’activités au Cameroun', 'Conseil juridique et réglementaire'] },
  },
  {
    slug: 'human-rights', number: '02',
    en: { title: 'Human rights', summary: 'Legal counsel for NGOs and matters involving human rights.', description: 'We work with NGOs and other clients on legal questions connected to human rights, with advice adapted to the organisation, project and matter concerned.', matters: ['NGOs active in human rights', 'Legal questions connected to human rights', 'Advice adapted to the organisation and matter'] },
    fr: { title: 'Droits humains', summary: 'Conseil juridique des ONG et accompagnement en matière de droits humains.', description: 'Nous travaillons avec les ONG et d’autres clients sur les questions juridiques liées aux droits humains, avec un conseil adapté à l’organisation, au projet et au dossier concerné.', matters: ['ONG actives dans les droits humains', 'Questions juridiques liées aux droits humains', 'Conseil adapté à l’organisation et au dossier'] },
  },
  {
    slug: 'conflict-management', number: '03',
    en: { title: 'Conflict management', summary: 'Practical legal guidance for assessing and managing conflict.', description: 'We help clients understand the legal position, the interests at stake and the available paths before determining an approach suited to the conflict.', matters: ['Understanding the legal position', 'Identifying the interests at stake', 'Defining an approach suited to the conflict'] },
    fr: { title: 'Gestion des conflits', summary: 'Un accompagnement juridique pratique pour analyser et gérer les conflits.', description: 'Nous aidons les clients à comprendre la situation juridique, les intérêts en jeu et les voies possibles avant de définir une approche adaptée au conflit.', matters: ['Comprendre la situation juridique', 'Identifier les intérêts en jeu', 'Définir une approche adaptée au conflit'] },
  },
] as const;

export function pathFor(locale: Locale, page: 'home' | 'services' | 'about' | 'contact' | 'privacy' | 'legal') {
  const paths = {
    en: { home: '/', services: '/services/', about: '/about/', contact: '/contact/', privacy: '/privacy/', legal: '/legal/' },
    fr: { home: '/fr/', services: '/fr/services/', about: '/fr/a-propos/', contact: '/fr/contact/', privacy: '/fr/confidentialite/', legal: '/fr/mentions-legales/' },
  } as const;
  return paths[locale][page];
}
