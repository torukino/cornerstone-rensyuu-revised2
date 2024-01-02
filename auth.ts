// eslint-disable-next-line import/order
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { UserRole } from '@prisma/client'

import authConfig from '@/auth.config'
import { getUserById } from '@/data/user'
import { db } from '@/lib/db'

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	callbacks: {
		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub
			}

			session.user.customField = 'anything'

			if (token.role && session.user) {
				session.user.role = token.role as UserRole
			}

			return session
		},
		async jwt({ token }) {
			if (!token.sub) return token

			const existingUser = await getUserById(token.sub)

			if (!existingUser) return token
			console.log({ existingUser })
			token.role = existingUser.role

			return token
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
})
