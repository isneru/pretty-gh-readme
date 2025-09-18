const GITHUB_README_WIDTH = 400
const GITHUB_README_HEIGHT = 700

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
          font-size: 14px;
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
					flex-direction: column;
					width: 100%;
					height: 100%;
					background: var(--color-antiflash-white);
					padding: 2rem;
					gap: 2rem;
					border-radius: 30px;
					box-sizing: border-box;
				}

				.about {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					gap: 2rem;
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
          height: 1px;
          width: auto;
          margin: 0.5rem 0;
				}

				hr.vr {
					width: 1px;
          height: auto;
					margin: 0 0.5rem;  
				}

				.playing {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 1rem;
					width: 300px;
					min-width: 200px;
				}

        .topic.music {
          text-align: left;
          width: 100%;
        }

				.track {
					font-weight: 600;
					max-width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text-align: center;
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

				.now-playing {
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
					0% { width: ${nowPlaying?.isPlaying ? `${(progress / duration) * 100}%` : '0%'}; }
					100% { width: 100%; }
				}

				@keyframes marquee {
					0%   { transform: translate(0, 0); }
					100% { transform: translate(-200%, 0); }
				}
			</style>
			<div class="container" xmlns="http://www.w3.org/1999/xhtml">
				<div class="about">
					<div>
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
					</div>
				</div>
				<hr class="vr" />
				<div class="playing">
					<p class="topic music">Currently Playing</p>
						${
							nowPlaying?.track
								? `<img class="album" src="data:image/jpg;base64,${nowPlaying.albumImageUrl}" alt="${nowPlaying.track}" />
										<p class="marquee"><span class="now-playing">${nowPlaying.artist} - ${nowPlaying.track}</span></p>
										<div class="meter">
											<span class="progress"/>
										</div>`
								: `<p class="track">Nothing is playing right now</p>`
						}
						</div>
					</div>
		</foreignObject>
	</svg>`

	setHeader(event, 'Cache-Control', 's-maxage=1, stale-while-revalidate')
	setHeader(event, 'Content-Type', 'image/svg+xml')

	return svg
})
