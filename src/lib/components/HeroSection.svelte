<section class="hero" id="top">
	<div class="grid-pattern" aria-hidden="true"></div>
	<div class="shell hero-inner">
		<div class="copy">
			<h1 class="display-title">
				SAMIZDATA is a consultancy for <span>data-driven</span> storytelling.
			</h1>
			<p>
				We research, write and build data tools for media organisations, NGOs and other
				public-benefit institutions.
			</p>
			<div class="button-row">
				<a class="btn btn-primary" href="#contact">Let's talk!</a>
				<a class="btn btn-secondary" href="#work">What we do</a>
			</div>
		</div>

		<div class="scroll-cue" aria-hidden="true">
			<span class="eyebrow">Portfolio & Expertise</span>
			<div class="line"><i></i></div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		height: 100vh;
		padding-top: 6rem;
		overflow: clip;
		background: var(--color-surface);
	}

	.grid-pattern {
		position: absolute;
		inset: 0;
		opacity: 0.1;
		background-image:
			linear-gradient(var(--color-outline) 1px, transparent 1px),
			linear-gradient(90deg, var(--color-outline) 1px, transparent 1px);
		background-size: 2.5rem 2.5rem;
		pointer-events: none;
	}

	.hero-inner {
		position: relative;
		z-index: 1;
		height: calc(100vh - 6rem);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2rem;
		padding-top: clamp(5rem, 10vw, 8rem);
		padding-bottom: 3rem;
	}

	.copy {
		max-width: 84rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
	}

	h1 span {
		color: var(--color-primary-container);
		font-style: italic;
	}

	p {
		max-width: 40rem;
		margin: 0 0 3rem;
		font-size: clamp(1.25rem, 2vw, 1.5rem);
		line-height: 1.6;
		color: var(--color-muted);
	}

	.scroll-cue {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding-bottom: 0;
	}

	.scroll-cue span {
		color: var(--color-primary-container);
		font-weight: 900;
		letter-spacing: 0.4em;
	}

	.line {
		position: relative;
		width: 1px;
		height: 3rem;
		background: rgba(159, 24, 83, 0.3);
		overflow: hidden;
	}

	.line i {
		position: absolute;
		inset: 0 0 auto;
		display: block;
		height: 50%;
		background: var(--color-primary-container);
		animation: pulse 1.5s infinite ease-in-out;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(100%);
		}
	}
</style>
