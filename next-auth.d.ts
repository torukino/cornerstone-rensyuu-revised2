// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { UserRole } from '@prisma/client'
// eslint-disable-next-line unused-imports/no-unused-imports
import NextAuth, { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
	role: UserRole
	id: string
	customField: string
}

declare module 'next-auth' {
	interface Session {
		user: ExtendedUser
	}
}
