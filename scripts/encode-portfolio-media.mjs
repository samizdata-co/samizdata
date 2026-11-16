// Re-encodes animated portfolio GIFs (src/portfolio/img/*.gif) as small MP4s
// plus a still poster frame in src/portfolio/video/. The site renders these
// instead of the GIFs (see PortfolioMedia.astro); the GIFs stay as the source
// because cv.json (owned by samizdata-co/brand) refers to them by name.
//
// Run by hand after adding or changing a GIF, then commit the outputs:
//   node scripts/encode-portfolio-media.mjs [--force]
// Requires ffmpeg with libx264 and libwebp. Not part of the build, so CI
// does not need ffmpeg.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = resolve(root, 'src/portfolio/img');
const outputDir = resolve(root, 'src/portfolio/video');
const force = process.argv.includes('--force');
// Cards render at most ~470 CSS px wide; 640 covers that at ~1.4x and keeps
// chart text legible at CRF 30.
const width = 640;

mkdirSync(outputDir, { recursive: true });

const isStale = (output, source) =>
	force || !existsSync(output) || statSync(output).mtimeMs < statSync(source).mtimeMs;

const ffmpeg = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' });
const scale = `scale='min(${width},iw)':-2:flags=lanczos`;

for (const file of readdirSync(sourceDir).filter((name) => name.toLowerCase().endsWith('.gif')).sort()) {
	const source = resolve(sourceDir, file);
	const name = basename(file, '.gif');
	const video = resolve(outputDir, `${name}.mp4`);
	const poster = resolve(outputDir, `${name}.webp`);

	if (isStale(video, source)) {
		ffmpeg([
			'-i', source,
			'-vf', scale,
			'-c:v', 'libx264', '-preset', 'veryslow', '-tune', 'animation', '-crf', '30',
			'-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an',
			video,
		]);
	}
	if (isStale(poster, source)) {
		ffmpeg(['-i', source, '-frames:v', '1', '-vf', scale, '-c:v', 'libwebp', '-quality', '80', poster]);
	}
	const kib = (path) => `${Math.round(statSync(path).size / 1024)} KiB`;
	console.log(`${file}: ${kib(source)} -> ${name}.mp4 ${kib(video)}, ${name}.webp ${kib(poster)}`);
}
