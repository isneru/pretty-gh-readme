import { b64Outfit } from '~/utils/font'
import { getAccessToken, getCurrentlyPlaying } from '~/utils/spotify'

const GITHUB_README_WIDTH = '100%' //980 dont change this unless you want to make it smaller.
const GITHUB_README_HEIGHT = '100%'

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

export default defineEventHandler(async event => {
	const accessToken = await getAccessToken()
	const nowPlaying = await getCurrentlyPlaying(accessToken)

	const toSeconds = (ms: number) => Math.floor(ms / 1000)

	let progress = nowPlaying?.isPlaying ? nowPlaying.progressMs : 0
	let duration = nowPlaying?.isPlaying ? nowPlaying.durationMs : 0

	const svg = `
	<svg xmlns="http://www.w3.org/2000/svg" width="${GITHUB_README_WIDTH}" height="${GITHUB_README_HEIGHT}" aria-labelledby="title" role="img">
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
					flex-wrap: wrap;
					width: 100%;
					background: var(--color-antiflash-white);
					padding: 2rem;
					gap: 3rem;
					border-radius: 30px;
					box-sizing: border-box;
				}

				.about {
					display: flex;
					flex-direction: column;
					gap: 1rem;
					flex: 1 1 300px;
					min-width: 200px;
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
					font-size: 1.2rem;
					word-break: break-word;
					text-wrap: balance;
				}

				.topic {
					font-weight: 700;
					font-size: 1.5rem;
					margin-left: -1ch;
				}

				.topic::before {
					content: '# ';
					font-size: 1.2rem;
					color: var(--color-burnt-sienna-1);
					top: 4px;
					left: -48px;
					width: 32px;
					height: 32px;
					font-weight: 700;
				}

				hr {
					border: none;
					height: 1px;
					background: var(--color-burnt-sienna-3);
					margin: 1rem 0;  
				}

				ul {
					list-style: none;
					font-weight: 500;
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
				}

				li span.tech {
					margin-bottom: 0.5rem;
					font-size: 1.1rem;
					text-decoration: var(--color-burnt-sienna-1) wavy underline;
					font-weight: 600;
				}

				li span.tech-list {
					font-weight: 400;
				}

				.playing {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 1rem;
					max-width: 350px;
					flex: 1 1 250px;
					min-width: 200px;
					width: 100%;
				}

				.track {
					font-weight: 600;
					max-width: 90%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text-align: center;
				}

				.album {
					display: block;
					border-radius: 12px;
					width: 100%;
					max-width: 200px;
					aspect-ratio: 1 / 1;
				}

				.meter { 
					height: 5px;
					position: relative;
					background-color: var(--color-gunmetal);
					overflow: hidden;
					border-radius: 999px;
					width: 100%;
					max-width: 200px;
					margin: 0 auto;
				}

				.meter span {
					display: block;
					height: 100%;
				}

				.progress {
					background-color: var(--color-burnt-sienna-1);
					animation: progressBar ${toSeconds(duration - progress)}s ease-in-out;
					animation-fill-mode:both;
				}

				@keyframes progressBar {
					0% { width: ${nowPlaying?.isPlaying ? `${(progress / duration) * 100}%` : '0%'}; }
					100% { width: 100%; }
				}

				@media (max-width: 760px) {
					.container {
						flex-direction: column;
					}
					.playing {
						align-items: flex-start;
						min-width: 0;
						max-width: 250px;
					}
					.about {
						min-width: 0;
					}
				}

			
				}
			</style>
			<div class="container" xmlns="http://www.w3.org/1999/xhtml">
				<div class="about">
					<p class="name">${NAME} <span class="username">${GH_USERNAME}</span></p>
					<p class="description">${DESCRIPTION}</p>
					<hr />
					<p class="topic">Tech Stack</p>
					<ul>
						<li><span class="tech">${TECH_STACK[0].name}:</span><span class="tech-list"> ${TECH_STACK[0].list}</span></li>
						<li><span class="tech">${TECH_STACK[1].name}:</span><span class="tech-list"> ${TECH_STACK[1].list}</span></li>
						<li><span class="tech">${TECH_STACK[2].name}:</span><span class="tech-list"> ${TECH_STACK[2].list}</span></li>
						<li><span class="tech">${TECH_STACK[3].name}:</span><span class="tech-list"> ${TECH_STACK[3].list}</span></li>
					</ul>
				</div>
				<div class="playing">
					<p class="topic">Currently Playing</p>
						${
							nowPlaying?.track
								? `<img class="album" src="${nowPlaying.albumImageUrl}" alt="${nowPlaying.track}" />
										<p title="${nowPlaying.artist} - ${nowPlaying.track}" class="track">${nowPlaying.artist} - ${nowPlaying.track}</p>
										<div class="meter">
											<span class="progress" style="width: ${nowPlaying.isPlaying ? `${(progress / duration) * 100}%` : '0%'}"></span>
										</div>`
								: `<p class="track">Nothing is playing right now</p>`
						}
						</div>
					</div>
		</foreignObject>
	</svg>`

	setHeader(event, 'Content-Type', 'image/svg+xml')
	setHeader(event, 'Cache-Control', 's-maxage=1, stale-while-revalidate')

	return svg
})
