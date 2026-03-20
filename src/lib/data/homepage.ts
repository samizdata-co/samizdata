export type NavItem = {
	label: string;
	href: string;
};

export type FeatureCardData = {
	title: string;
	description: string;
	icon: 'dashboard' | 'school';
	href: string;
	variant?: 'accent';
	label?: string;
	cta?: string;
};

export type ImageCardData = {
	title: string;
	description: string;
	image: string;
	meta: string;
	tag: string;
};

export type ToolCardData = {
	title: string;
	description: string;
	image: string;
};

export type ReportCardData = {
	title: string;
	description: string;
	meta: string;
	tag: string;
	href: string;
	image: string;
};

export const navItems: NavItem[] = [
	{ label: 'What we do', href: '#work' },
	{ label: 'Who we are', href: '#about' },
	{ label: 'Contact', href: '#contact' }
];

export const featureCards: FeatureCardData[] = [
	{
		title: 'Dashboards',
		description:
			'Custom analytical interfaces designed for clarity and rapid insight. We turn complex queries into visual narratives that hold up under scrutiny.',
		icon: 'dashboard',
		href: '#contact',
		cta: 'View capability'
	},
	{
		title: 'Training',
		description:
			'Workshops for newsrooms and NGOs on data literacy, investigative workflows, and ethical visualisation techniques.',
		icon: 'school',
		href: '#contact',
		variant: 'accent',
		label: 'Enrollment open'
	}
];

export const featureArticle: ImageCardData = {
	title: 'The Cost of Inaction: Climate Data Disparities',
	description:
		'A deep dive into how shifting weather patterns affect urban infrastructure in the Global South.',
	image:
		'https://lh3.googleusercontent.com/aida-public/AB6AXuA88f_MTMAVUCI8SANUw-kGWuMgLttTQnabBRe8-aABG68oWemcrS3rTYpINwVCcqdrb5qXsuhGNIASGbV6Kdapk5UQS4dGrNFu3H-Om-pQSfjlnOzH690-kyfohQt76flViGn3DN-jGDPDS-jk-zQDT4lsNvDvseXum0Qj53SqxzVg5b6G1gb0-c_l7tRiQvt4f-7wtDsS0HGLfzik3aFGyeVj0jbnWIHtb88zMf1-gipyewqdBMDLDYYvIeck4oR3cS1DSmTakmU',
	meta: 'The Guardian // 2024',
	tag: 'Journalism'
};

export const toolCard: ToolCardData = {
	title: 'Archive Engine v2',
	description: 'Open-source document processing tool for investigative reporters.',
	image:
		'https://lh3.googleusercontent.com/aida-public/AB6AXuAqbYLToqJjTzbgBTgDQxXhJaMMquQsTkPQLlkYslPnxUdTYhG1iG4XMWxm06dv_jZqZ0L7LGen_8tF_C77mCYXx3rASkpZD_ob56QhR0PgqJxi8xM_e3uM4jcw5eNw-sRNBqJ76kJBzQesNsaqT6ZAUPw2wcOahKVMez97vQaLEO-xQnWoLBtRD8HMMbEXP7F4yqvovkd1tuYc2CRWR932uh3z4snUsSpdHUNatRRGUaUX2qmCOYp1htcrBjeRjsB0pDalM24dSqU'
};

export const reportCard: ReportCardData = {
	title: 'Algorithmic Accountability in Public Housing',
	description:
		'Commissioned by the UN to audit automated allocation systems across European capitals.',
	meta: 'Report // Feb 12',
	tag: 'Policy',
	href: '#contact',
	image:
		'https://lh3.googleusercontent.com/aida-public/AB6AXuAaPffUikoJVxHfyAE4acInUhsnDVopfwH1ZgHlv_2vQjHN_xBRJTJg8ztPSefx04slmZ8DmAsh8Iu9yTtBjH8nJIVSP33KYvSCOZ4xcMT0fLyen5gXOFHHFUNBAQx8zUbjpfCpGKhICwqso733tppOaR-uKQuM49vH12rdf-0kNs5YR8YGuiwpFKQV_PH8LZ6GsIlrGH3ndvIdqx8jgwZvDbw9GREJcIPlx3M4Rv9eWahnjPR6y2v750-CoHiI-3dNEqPugzUepvc'
};

export const footerLinks = [
	{ label: 'Privacy Policy', href: '/privacy-policy' },
	{ label: 'Terms', href: '/terms' }
];
