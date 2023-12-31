import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

import { authConfig } from './auth.config_old'

import { getUsers } from '@/lib/firebase/userDB'

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(credentials)

				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data
					const users = await getUsers()
					const user = users.find(user => user.email === email)

					if (!user) return null
					const passwordsMatch = await bcrypt.compare(password, user.password)
					console.log('passwordsMatch', passwordsMatch)
					console.log('user.password', user.password)
					if (passwordsMatch) return user
				}
				console.log('Invalid credentials')
				return null
			},
		}),
	],
})
