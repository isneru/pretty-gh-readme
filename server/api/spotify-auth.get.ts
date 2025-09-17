export default defineEventHandler(async event => {
	const clientId = useRuntimeConfig().spotifyClientId
	const redirectUri = useRuntimeConfig().spotifyRedirectUri

	const query = getQuery(event)
	
	if (query.secret !== useRuntimeConfig().setupSecret) {
		throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
	}

	const params = new URLSearchParams({
		response_type: 'code',
		client_id: clientId as string,
		scope: 'user-read-currently-playing user-read-playback-state',
		redirect_uri: redirectUri as string
	})

	const authUrl = `https://accounts.spotify.com/authorize?${params}`

	return sendRedirect(event, authUrl)
})
