// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
		spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
		spotifyRedirectUri: process.env.SPOTIFY_REDIRECT_URI,
		supabaseUrl: process.env.SUPABASE_URL,
		supabaseKey: process.env.SUPABASE_KEY,
		setupSecret: process.env.SETUP_SECRET,
	},
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: []
})
