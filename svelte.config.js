import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const trainingLayoutPath = fileURLToPath(
  new URL('./src/lib/components/training/TrainingArticleLayout.svelte', import.meta.url)
);

const config = {
  extensions: ['.svelte', '.svx'],
  preprocess: mdsvex({
    extensions: ['.svx'],
    layout: trainingLayoutPath,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
    highlight: {
      alias: {
        sh: 'bash',
        shell: 'bash',
        yml: 'yaml'
      }
    }
  }),

/** @type {import('@sveltejs/kit').Config} */
  kit: {
    adapter: adapter({
      fallback: '404.html'
    })
  },
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) =>
			filename.includes('node_modules')
				? undefined
				: filename.endsWith('.svx')
					? { runes: false }
					: { runes: true }
	}
};

export default config;
