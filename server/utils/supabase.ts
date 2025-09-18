import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
	useRuntimeConfig().supabaseUrl,
	useRuntimeConfig().supabaseKey
)
