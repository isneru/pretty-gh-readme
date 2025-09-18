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
	const data: SpotifyResponse = await resp.json()
	if (!data || !data.item) return null

	let albumImageUrl = ''
	const imageUrl = data.item.album.images[0]?.url
	if (imageUrl) {
		try {
			const imgResp = await fetch(imageUrl)
			const imgBuffer = Buffer.from(await imgResp.arrayBuffer())
			albumImageUrl = imgBuffer.toString('base64')
		} catch (e) {
			albumImageUrl = ''
		}
	}
	return {
		artist: data.item.artists.map(artist => artist.name).join(', '),
		track: data.item.name,
		album: data.item.album.name,
		albumImageUrl,
		isPlaying: data.is_playing,
		progressMs: data.progress_ms,
		durationMs: data.item.duration_ms,
		trackUrl: data.item.external_urls.spotify
	}
}

export type SpotifyResponse = {
	device: Device
	repeat_state: string
	shuffle_state: boolean
	context: Context
	timestamp: number
	progress_ms: number
	is_playing: boolean
	item: Item
	currently_playing_type: string
	actions: Actions
}

export type Actions = {
	interrupting_playback: boolean
	pausing: boolean
	resuming: boolean
	seeking: boolean
	skipping_next: boolean
	skipping_prev: boolean
	toggling_repeat_context: boolean
	toggling_shuffle: boolean
	toggling_repeat_track: boolean
	transferring_playback: boolean
}

export type Context = {
	type: string
	href: string
	external_urls: ExternalUrls
	uri: string
}

export type ExternalUrls = {
	spotify: string
}

export type Device = {
	id: string
	is_active: boolean
	is_private_session: boolean
	is_restricted: boolean
	name: string
	type: string
	volume_percent: number
	supports_volume: boolean
}

export type Item = {
	album: Album
	artists: Artist[]
	available_markets: string[]
	disc_number: number
	duration_ms: number
	explicit: boolean
	external_ids: ExternalIDS
	external_urls: ExternalUrls
	href: string
	id: string
	is_playable: boolean
	linked_from: LinkedFrom
	restrictions: Restrictions
	name: string
	popularity: number
	preview_url: string
	track_number: number
	type: string
	uri: string
	is_local: boolean
}

export type Album = {
	album_type: string
	total_tracks: number
	available_markets: string[]
	external_urls: ExternalUrls
	href: string
	id: string
	images: Image[]
	name: string
	release_date: string
	release_date_precision: string
	restrictions: Restrictions
	type: string
	uri: string
	artists: Artist[]
}

export type Artist = {
	external_urls: ExternalUrls
	href: string
	id: string
	name: string
	type: string
	uri: string
}

export type Image = {
	url: string
	height: number
	width: number
}

export type Restrictions = {
	reason: string
}

export type ExternalIDS = {
	isrc: string
	ean: string
	upc: string
}

export type LinkedFrom = {}
