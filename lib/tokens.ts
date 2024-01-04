import crypto from 'crypto'

import { v4 as uuidv4 } from 'uuid'

import { getPasswordResetTokenByEmail } from '@/data/password-reset-token'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
import { getVerificationTokenByEmail } from '@/data/verfication-token'
import { db } from '@/lib/db'


export const generateTwoFactorToken = async (email: string) => {
	const token = crypto.randomInt(100_000, 1_000_000).toString()
	// TODO Later chage to 15 minutes
	const expires = new Date(new Date().getTime() + 60 * 60 * 1000)

	const existingToken = await getTwoFactorTokenByEmail(email)

	if (existingToken) {
		await db.twoFactorToken.delete({
			where: {
				id: existingToken.id,
			},
		})

		const twoFactorToken = await db.twoFactorToken.create({
			data: {
				token,
				expires,
				email,
			},
		})

		return twoFactorToken
	}
}
export const generatePasswordResetToken = async (email: string) => {
	const token = uuidv4()
	const expires = new Date(new Date().getTime() + 60 * 60 * 1000)

	const existingToken = await getPasswordResetTokenByEmail(email)

	if (existingToken) {
		await db.passwordResetToken.delete({
			where: {
				id: existingToken.id,
			},
		})
	}

	const passwordResetToken = await db.passwordResetToken.create({
		data: {
			token,
			expires,
			email,
		},
	})

	return passwordResetToken
}

export const generateVerificationToken = async (email: string) => {
	const token = uuidv4()
	const expires = new Date(new Date().getTime() + 60 * 60 * 1000)

	const existingToken = await getVerificationTokenByEmail(email)

	if (existingToken) {
		await db.verificationToken.delete({
			where: {
				id: existingToken.id,
			},
		})
	}

	const verificationToken = await db.verificationToken.create({
		data: {
			token,
			expires,
			email,
		},
	})

	return verificationToken
}
