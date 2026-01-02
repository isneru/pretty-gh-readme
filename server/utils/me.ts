function calculateAccurateAge(birthDate: Date) {
	const today = new Date()
	let age = today.getFullYear() - birthDate.getFullYear()
	const monthDiff = today.getMonth() - birthDate.getMonth()

	if (
		monthDiff < 0 ||
		(monthDiff === 0 && today.getDate() < birthDate.getDate())
	) {
		return age - 1
	} else {
		return age
	}
}

const age = calculateAccurateAge(new Date(2003, 0, 19))

export const me = {
	NAME: 'Diogo Nogueira',
	GH_USERNAME: 'isneru',
	DESCRIPTION: `${age}-year-old autodidactic developer studying Computer and Telecom Engineering`,
	TECH_STACK: [
		{ name: 'frontend', list: 'React, Nuxt, Svelte, Astro, Tailwind' },
		{ name: 'backend', list: 'JS/TS, Node.js, PHP, Java, C, C++' },
		{ name: 'databases', list: 'MongoDB, SQL, Prisma ORM' },
		{ name: 'tools', list: 'Git, VS Code, Figma, Cloudflare' }
	]
}
