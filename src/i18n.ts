// Central i18n module: the only place that knows about languages and
// UI strings. Page/content structure is derived from this (folder names
// must match `languages` and the `i18n` config in astro.config.mjs).

export const defaultLang = 'en';
export const languages = ['en', 'ro'] as const;
export type Language = (typeof languages)[number];

export const ui = {
	en: {
		'site.title': 'SAMIZDATA',
		'site.description': 'Reading Eastern Europe through data.',
		'nav.home': 'Home',
		'nav.about': 'About',
		'nav.studio': 'Studio',
		'nav.training': 'Training',
		'last.updated': 'Last updated on',

		// Studio (portfolio) page
		'studio.nav.homeLabel': 'SAMIZDATA home',
		'studio.nav.menuOpen': 'Open menu',
		'studio.nav.menuClose': 'Close menu',
		'studio.nav.primary': 'Primary navigation',
		'studio.nav.switchToDark': 'Switch to dark mode',
		'studio.nav.switchToLight': 'Switch to light mode',
		'studio.footer.connect': 'Connect',
		'studio.footer.rights': '© 2026 SAMIZDATA Ltd.',
		'studio.footer.location': 'London 🇬🇧 and Chișinău 🇲🇩',
		'studio.seo.title': 'Data Storytelling Consultancy',
		'studio.seo.description':
			'SAMIZDATA researches, writes, and builds data-led stories and tools for media organisations, NGOs, and public-interest institutions.',
		'studio.hero.titleLead': 'SAMIZDATA is a ',
		'studio.hero.titleAccent': 'data storytelling',
		'studio.hero.titleTail': ' consultancy.',
		'studio.hero.body':
			'We research, write and build data tools for media organisations, NGOs and other public-benefit institutions.',
		'studio.hero.primaryCta': "Let's talk!",
		'studio.hero.secondaryCta': 'What we do',
		'studio.hero.scrollCue': 'Portfolio & Expertise',
		'studio.about.introLead': 'SAMIZDATA is an independent data journalism studio led by ',
		'studio.about.introHighlight': 'Nicu Calcea',
		'studio.about.introTail':
			", a journalist with 16 years' experience in media. Here are some of the things he has worked on.",
		'studio.clients.title': 'Clients and bylines',
		'studio.contact.title': 'Get in touch',
		'studio.contact.body':
			"Whether you have a massive dataset or just the seed of an idea, let's talk about it.",
		'studio.contact.email': 'Direct email',
		'studio.contact.locationLabel': 'Locations',
		'studio.contact.location': 'London, UK & Chișinău, MD',
		'studio.contact.social': 'Social media',
		'studio.work.s1.title': 'Investigations and research',
		'studio.work.s1.description':
			'Original reporting, document-heavy research, and data-led investigations built to stand up to scrutiny and publication.',
		'studio.work.s1.cta': 'Commission a story',
		'studio.work.s2.title': 'Interactive tools',
		'studio.work.s2.description':
			'Calculators, explainers, and maps designed to help readers explore complex stories through direct interaction.',
		'studio.work.s2.cta': "Let's talk about your vision",
		'studio.work.s3.title': 'Data explorers',
		'studio.work.s3.description':
			'Searchable databases and public-interest lookup tools that turn messy records into something people can actually use.',
		'studio.work.s3.cta': 'Plan a data product',
		'studio.work.s4.title': 'Training',
		'studio.work.s4.description':
			'Workshops for newsrooms and NGOs on data literacy, investigative workflows, and ethical visualisation techniques.',
		'studio.work.s4.label': 'See our free resources',

		// Services pages
		'services.seo.title': 'Services',
		'services.seo.description':
			'Explore SAMIZDATA services across investigations, analysis, visualisation, interactive tools, data cleaning, and public-interest data products.',
		'services.title': 'How we can help.',
		'services.intro':
			'We help newsrooms and civil society organisations of all sizes make best use of data, whether that means making sense of messy records or presenting it in the best way.',
		'services.browseCta': 'Explore service',
		'services.contactCta': 'Contact',
		'services.examplesTitle': 'Selected examples',
		'services.visitService': 'View work',
		'services.publicationsLabel': 'Publication',
		'services.projectsLabel': 'Project',
		'services.noExamples': 'Examples are being added to this service page.',
		'services.allServices': 'All services',
		'services.trainingTitle': 'Training',
		'services.trainingDescription':
			'Need workshops, newsroom coaching, or practical sessions for teams and students? Visit the training section.',
		'services.trainingCta': 'Go to training',
	},
	ro: {
		'site.title': 'SAMIZDATA',
		'site.description': 'Citim Europa de Est prin date.',
		'nav.home': 'Acasă',
		'nav.about': 'Despre',
		'nav.studio': 'Studio',
		'nav.training': 'Training',
		'last.updated': 'Ultima actualizare:',

		'studio.nav.homeLabel': 'Pagina principală SAMIZDATA',
		'studio.nav.menuOpen': 'Deschide meniul',
		'studio.nav.menuClose': 'Închide meniul',
		'studio.nav.primary': 'Navigație principală',
		'studio.nav.switchToDark': 'Treci la modul întunecat',
		'studio.nav.switchToLight': 'Treci la modul luminos',
		'studio.footer.connect': 'Conectare',
		'studio.footer.rights': '© 2026 SAMIZDATA Ltd.',
		'studio.footer.location': 'Chișinău 🇲🇩 și Londra 🇬🇧',
		'studio.seo.title': 'Consultanță de storytelling bazat pe date',
		'studio.seo.description':
			'SAMIZDATA cercetează, scrie și construiește povești și instrumente bazate pe date pentru organizații media, ONG-uri și instituții de interes public.',
		'studio.hero.titleLead': 'SAMIZDATA este o agenție de ',
		'studio.hero.titleAccent': 'storytelling de date',
		'studio.hero.titleTail': '.',
		'studio.hero.body':
			'Cercetăm, scriem și construim instrumente de date pentru organizații media, ONG-uri și alte instituții de interes public.',
		'studio.hero.primaryCta': 'Hai să vorbim!',
		'studio.hero.secondaryCta': 'Ce facem',
		'studio.hero.scrollCue': 'Portofoliu și expertiză',
		'studio.about.introLead':
			'SAMIZDATA este un studio independent de jurnalism de date condus de ',
		'studio.about.introHighlight': 'Nicu Calcea',
		'studio.about.introTail':
			', un jurnalist cu 16 ani de experiență. Iată câteva dintre proiectele la care a lucrat.',
		'studio.clients.title': 'Clienți și publicații',
		'studio.contact.title': 'Ia legătura cu noi',
		'studio.contact.body':
			'Fie că ai un set uriaș de date sau doar germenul unei idei, hai să vorbim.',
		'studio.contact.email': 'Email direct',
		'studio.contact.locationLabel': 'Locații',
		'studio.contact.location': 'Chișinău, MD & Londra, UK',
		'studio.contact.social': 'Social media',
		'studio.work.s1.title': 'Investigații și cercetare',
		'studio.work.s1.description':
			'Reportaj original, cercetare bazată pe documente și investigații ghidate de date, pregătite pentru publicare și verificare riguroasă.',
		'studio.work.s1.cta': 'Discuță despre o anchetă',
		'studio.work.s2.title': 'Unelte interactive',
		'studio.work.s2.description':
			'Calculatoare, explainere și hărți care ajută cititorii să exploreze subiecte complexe prin interacțiune directă.',
		'studio.work.s2.cta': 'Hai să discutăm despre viziunea ta',
		'studio.work.s3.title': 'Exploratoare de date',
		'studio.work.s3.description':
			'Baze de date căutabile și instrumente de consultare de interes public care transformă registre haotice în produse utile.',
		'studio.work.s3.cta': 'Planifică un produs de date',
		'studio.work.s4.title': 'Training',
		'studio.work.s4.description':
			'Ateliere pentru redacții și ONG-uri despre alfabetizare în date, fluxuri de lucru investigative și tehnici etice de vizualizare.',
		'studio.work.s4.label': 'Vezi resursele noastre gratuite',

		// Services pages
		'services.seo.title': 'Servicii',
		'services.seo.description':
			'Descoperă serviciile SAMIZDATA pentru investigații, analiză, vizualizare, unelte interactive, curățare de date și produse de interes public.',
		'services.title': 'Cum te putem ajuta.',
		'services.intro':
			'Ajutăm redacții și organizații ale societății civile de orice dimensiune să folosească datele cât mai eficient, fie că asta înseamnă să dăm sens unor registre haotice, fie să le prezentăm în cea mai bună formă.',
		'services.browseCta': 'Explorează serviciul',
		'services.contactCta': 'Contact',
		'services.examplesTitle': 'Exemple selectate',
		'services.visitService': 'Vezi lucrarea',
		'services.publicationsLabel': 'Publicație',
		'services.projectsLabel': 'Proiect',
		'services.noExamples': 'Adăugăm în curând exemple pentru această pagină de serviciu.',
		'services.allServices': 'Toate serviciile',
		'services.trainingTitle': 'Training',
		'services.trainingDescription':
			'Ai nevoie de workshopuri, coaching pentru redacție sau sesiuni practice pentru echipe și studenți? Vizitează secțiunea de training.',
		'services.trainingCta': 'Mergi la training',
	},
} as const;

export type TranslationKey = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Language) {
	return (key: TranslationKey) => ui[lang][key];
}
