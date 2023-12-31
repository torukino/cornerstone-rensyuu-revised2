'use server'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { z } from 'zod'
import { getUsers } from '@/app/lib/firebase/userDB'
import bcrypt from 'bcrypt'

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				// console.log('@@@@ in auth.ts @@@@')
				const parsedCredentials = z
					.object({
						email: z.string().email(),
						password: z.string().min(6),
					})
					.safeParse(credentials)

				// console.log('parsedCredentials', parsedCredentials)

				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data

					const users = await getUsers()
					const user = users.find(user => user.email === email)
					// console.log('user', user)

					const saltRounds = 10

					if (!user) return null

					const hashedPassword = await bcrypt.hash(user.password, saltRounds)
					// console.log('ハッシュ化されたパスワード', hashedPassword)

					const passwordsMatch = await bcrypt.compare(password, user.password)
					console.log(`passwordsMatch ${passwordsMatch} `)
					if (passwordsMatch) return user
				}

				console.log('Invalid credentials')
				return null
			},
		}),
	],
})
