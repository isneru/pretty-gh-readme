// this will return the svg string, the container's and viewbox height and width
// aswell as different versions according to whether music is playing or not

// mobile max-width: 600px
// tablet max-width: 900px
// desktop min-width: >900px

const NAME = 'Diogo Nogueira'
const GH_USERNAME = 'isneru'
const DESCRIPTION =
	'22-year-old autodidactic developer studying Computer and Telecom Engineering'

const TECH_STACK = [
	{ name: 'frontend', list: 'React, Nuxt, Svelte, Astro, Tailwind' },
	{ name: 'backend', list: 'JS/TS, Node.js, PHP, Java, C, C++' },
	{ name: 'databases', list: 'MongoDB, SQL, Prisma ORM' },
	{ name: 'tools', list: 'Git, VS Code, Figma, Cloudflare' }
]

export const getSVGSizes = (isPlaying: boolean) => {
	return {
		mobile: { width: 400, height: isPlaying ? 720 : 400 },
		tablet: { width: 0, height: 0 }, // !TODO decide if tablet will have column or row layout
		desktop: { width: isPlaying ? 800 : 480, height: isPlaying ? 370 : 350 }
	}
}

type Props = {
	screen: keyof ReturnType<typeof getSVGSizes>
	playing: Awaited<ReturnType<typeof getCurrentlyPlaying>>
}

function escapeXML(str: string) {
	if (!str) return ''
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
}

export function getSVG({ screen, playing }: Props) {
	const { width, height } = getSVGSizes(!!playing)[screen]

	const toSeconds = (ms: number) => Math.floor(ms / 1000)

	let progress = playing?.isPlaying ? playing.progressMs : 0
	let duration = playing?.isPlaying ? playing.durationMs : 0

	return `
	<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" viewBox="0 0 ${width} ${height}" aria-labelledby="title" role="img">
		<title id="title">${GH_USERNAME}'s readme</title>
		<foreignObject width="100%" height="100%">
			<style>
				@font-face {
					font-family: 'Outfit';
					src: url('data:font/woff2;base64,${b64Outfit}') format('woff2');
					font-weight: 100 900;
					font-style: normal;
				}
				
				:root {
					--color-burnt-sienna-1: #d77a61;
					--color-burnt-sienna-2: #d8b4a0;
					--color-burnt-sienna-3: #dbd3d8;
					--color-antiflash-white: #eff1f3;
					--color-gunmetal: #223843;
					--color-gunmetal-muted: #5e6e7e;
				}
					
				* {
					font-smooth: antialiased;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
					box-sizing: border-box;
					margin: 0;
					padding: 0;
					font-family: 'Outfit', sans-serif;
					color: var(--color-gunmetal);
				}

				.container {
					display: flex;
					flex-direction: ${screen === 'mobile' ? 'column' : 'row'};
					width: 100%;
					height: 100%;
					background: var(--color-antiflash-white);
					padding: 2rem;
					gap: 2rem;
					justify-content: ${screen === 'mobile' ? 'center' : 'space-between'};
					border-radius: 30px;
					box-sizing: border-box;
				}

					.desktop-container {
						display: flex;
						flex-direction: column;
						gap: 2rem;
						flex: 1;
					}

				.name {
					font-weight: 800;
					color: var(--color-gunmetal);
					font-size: 2rem;
					word-break: break-word;
				}

				.username {
					font-weight: 500;
					font-size: 1.2rem;
					color: var(--color-burnt-sienna-1);  
					font-style: italic;
					margin-left: 0.5rem;
				}

				.description {
					font-weight: 400;
					margin-top: 0.5rem;
					font-size: 1.2rem;
					word-break: break-word;
					text-wrap: balance;
					max-width: 43ch;
				}

				.topic {
					font-weight: 700;
					font-size: 1.5rem;
					${screen === 'mobile' ? 'width: 100%;' : ''}
					margin-left: -1ch;

				}

				.topic::before {
					content: '# ';
					font-size: 1.2rem;
					color: var(--color-burnt-sienna-1);
					font-weight: 700;
				}

				ul {
					display: flex;
					flex-direction: column;
					margin-top: 0.5rem;
					list-style: none;
					font-weight: 500;
					gap: 0.5rem;
				}

				li span.tech {
					font-size: 1.1rem;
					text-decoration: var(--color-burnt-sienna-1) wavy underline;
					font-weight: 600;
				}

				li span.tech-list {
					font-weight: 400;
				}

				hr {
					border: none;
					background: var(--color-burnt-sienna-3);
					margin: 0;
					height: ${screen === 'mobile' ? '1px' : '100%'};
					width: ${screen === 'mobile' ? '100%' : '1px'};
				}

				${
					playing
						? `.playing {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 1rem;
					${screen !== 'mobile' ? 'max-width: 300px;' : ''}
				}

				.album {
					border-radius: 12px;
					width: 100%;
					max-width: 200px;
					aspect-ratio: 1 / 1;
				}

				.marquee {
					width: 100%;
					white-space: nowrap;
					box-sizing: border-box;
					overflow: hidden;
				}

				.track-marquee {
					font-weight: 600;
					width: 100%;
					animation: marquee 10s linear infinite;
					padding-left: 100%;
					display: inline-block;
				}

				.meter { 
					height: 6px;
					position: relative;
					background-color: var(--color-gunmetal);
					overflow: hidden;
					border-radius: 999px;
					width: 100%;
					max-width: 200px;
				}

				.progress {
					display: block;
					height: 100%;
					background-color: var(--color-burnt-sienna-1);
					animation: progressBar ${toSeconds(duration - progress)}s ease;
					animation-fill-mode:both;
				}

				@keyframes progressBar {
					0% { width: ${playing?.isPlaying ? `${(progress / duration) * 100}%` : '0%'}; }
					100% { width: 100%; }
				}

				@keyframes marquee {
					0%   { transform: translate(0, 0); }
					100% { transform: translate(-200%, 0); }
				}`
						: ``
				}
			</style>
			<div class="container" xmlns="http://www.w3.org/1999/xhtml">
				${screen !== 'mobile' ? '<div class="desktop-container">' : ''}
					<div class="about">
						<p class="name">${NAME} <span class="username">${GH_USERNAME}</span></p>
						<p class="description">${DESCRIPTION}</p>
					</div>
					<div class="tech-stack">
						<p class="topic">Tech Stack</p>
						<ul>
						${TECH_STACK.map(tech => {
							return `<li><span class="tech">${tech.name}:</span><span class="tech-list"> ${tech.list}</span></li>`
						}).join('')}
						</ul>
					${screen !== 'mobile' ? '</div>' : ''}
				</div>
				${
					playing
						? `<div class="playing">
						<p class="topic">Currently Playing</p>
						${
							playing.track
								? `<img class="album" src="data:image/jpg;base64,${playing.albumImageUrl}" alt="${escapeXML(playing.track)}" />
									 <p class="marquee"><span class="track-marquee">${escapeXML(playing.artist)} - ${escapeXML(playing.track)}</span></p>
								   <div class="meter">
									 	<span class="progress"/>
								   </div>`
								: ``
						}
						</div>`
						: ``
				}
					</div>
		</foreignObject>
	</svg>`
}
