import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
	useRuntimeConfig().supabaseUrl,
	useRuntimeConfig().supabaseKey
)

export async function getAccessToken() {
	const { data, error } = await supabase
		.from('spotify_tokens')
		.select('refresh_token')
		.eq('id', 'spotify-global-token')
		.single()

	if (error || !data) throw new Error('Spotify refresh token not found')

	const refreshToken = data.refresh_token

	const body = new URLSearchParams({
		grant_type: 'refresh_token',
		refresh_token: refreshToken,
		client_id: useRuntimeConfig().spotifyClientId,
		client_secret: useRuntimeConfig().spotifyClientSecret
	})

	const resp = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		body,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	})

	const json = await resp.json()
	return json.access_token
}

export async function getCurrentlyPlaying(accessToken: string) {
	const resp = await fetch(
		'https://api.spotify.com/v1/me/player/currently-playing',
		{
			headers: { Authorization: `Bearer ${accessToken}` }
		}
	)

	if (resp.status !== 200) return null
	const data = await resp.json()
	if (!data || !data.item) return null

	return {
		track: data.item.name,
		artist: data.item.artists.map((a: any) => a.name).join(', '),
		album: data.item.album.name
	}
}
