(function (C, A, L) {
	let p = function (a, ar) {
		a.q.push(ar);
	};
	let d = C.document;
	C.Cal =
		C.Cal ||
		function () {
			let cal = C.Cal;
			let ar = arguments;
			if (!cal.loaded) {
				cal.ns = {};
				cal.q = cal.q || [];
				d.head.appendChild(d.createElement('script')).src = A;
				cal.loaded = true;
			}
			if (ar[0] === L) {
				const api = function () {
					p(api, arguments);
				};
				const namespace = ar[1];
				api.q = api.q || [];
				if (typeof namespace === 'string') {
					cal.ns[namespace] = cal.ns[namespace] || api;
					p(cal.ns[namespace], ar);
					p(cal, ['initNamespace', namespace]);
				} else p(cal, ar);
				return;
			}
			p(cal, ar);
		};
})(window, 'https://app.cal.com/embed/embed.js', 'init');

const theme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

Cal('init', '30min', { origin: 'https://app.cal.com' });
Cal.config = Cal.config || {};
Cal.config.forwardQueryParams = true;

Cal.ns['30min']('inline', {
	elementOrSelector: '#my-cal-inline-30min',
	config: { layout: 'month_view', theme: theme(), useSlotsViewOnSmallScreen: 'true' },
	calLink: 'nicucalcea/30min',
});

Cal.ns['30min']('ui', {
	theme: theme(),
	hideEventTypeDetails: false,
	layout: 'month_view',
	cssVarsPerTheme: {
		light: {
			'cal-brand': '#9f1853',
			'cal-brand-emphasis': '#7b003c',
			'cal-brand-text': '#ffffff',
			'cal-brand-subtle': '#f1d7e2',
			'cal-brand-accent': '#ffffff',
			'cal-text': '#574146',
			'cal-text-emphasis': '#1b1c19',
			'cal-text-subtle': '#574146',
			'cal-text-muted': '#574146',
			'cal-text-inverted': '#ffffff',
			'cal-bg': '#fbf9f4',
			'cal-bg-emphasis': '#f0eee9',
			'cal-bg-subtle': '#f5f3ee',
			'cal-bg-muted': '#ffffff',
			'cal-bg-inverted': '#1b1c19',
			'cal-border': 'rgba(138, 112, 118, 0.3)',
			'cal-border-emphasis': '#9f1853',
			'cal-border-subtle': 'rgba(138, 112, 118, 0.18)',
			'cal-border-muted': 'rgba(138, 112, 118, 0.18)',
			'cal-border-booker': 'rgba(138, 112, 118, 0.3)',
			'cal-border-booker-width': '1px',
			radius: '0px',
		},
		dark: {
			'cal-brand': '#c62168',
			'cal-brand-emphasis': '#a31552',
			'cal-brand-text': '#ffffff',
			'cal-brand-subtle': '#a31552',
			'cal-brand-accent': '#ffffff',
			'cal-text': '#c2b7b3',
			'cal-text-emphasis': '#f4efe9',
			'cal-text-subtle': '#c2b7b3',
			'cal-text-muted': '#c2b7b3',
			'cal-text-inverted': '#111311',
			'cal-bg': '#111311',
			'cal-bg-emphasis': '#2a2c29',
			'cal-bg-subtle': '#171a18',
			'cal-bg-muted': '#1b1f1c',
			'cal-bg-inverted': '#f4efe9',
			'cal-border': 'rgba(255, 255, 255, 0.18)',
			'cal-border-emphasis': '#c62168',
			'cal-border-subtle': 'rgba(255, 255, 255, 0.11)',
			'cal-border-muted': 'rgba(255, 255, 255, 0.11)',
			'cal-border-booker': 'rgba(255, 255, 255, 0.18)',
			'cal-border-booker-width': '1px',
			radius: '0px',
		},
	},
});

new MutationObserver(() => {
	Cal.ns['30min']('ui', { theme: theme() });
}).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
