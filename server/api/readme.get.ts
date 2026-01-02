export default defineEventHandler(async event => {
	const q = getQuery(event).screen?.toString().toLowerCase()
	let screen = q as 'mobile' | 'desktop'

	if (q !== 'mobile' && q !== 'desktop') {
		screen = 'desktop'
	}

	const accessToken = await getAccessToken()
	const playing = await getCurrentlyPlaying(accessToken)

	const svg = getSVG({ screen, playing })

	setHeader(event, 'Cache-Control', 's-maxage=1, stale-while-revalidate')
	setHeader(event, 'Content-Type', 'image/svg+xml')

	return svg
})
