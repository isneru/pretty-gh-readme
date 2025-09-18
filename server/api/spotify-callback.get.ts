export default defineEventHandler(async event => {
	const code = getQuery(event).code as string
	const clientId = useRuntimeConfig().spotifyClientId
	const clientSecret = useRuntimeConfig().spotifyClientSecret
	const redirectUri = useRuntimeConfig().spotifyRedirectUri

	const body = new URLSearchParams({
		grant_type: 'authorization_code',
		code,
		redirect_uri: redirectUri,
		client_id: clientId,
		client_secret: clientSecret
	})

	const resp = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		body,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	})

	const data = await resp.json()
	const refreshToken = data.refresh_token

	if (refreshToken) {
		const { error } = await supabase.from('spotify_tokens').upsert({
			id: 'spotify-global-token',
			refresh_token: data.refresh_token
		})

		if (error) {
			console.error('Erro Supabase:', error)
		}
	}

	return sendRedirect(event, '/api/readme')
})
