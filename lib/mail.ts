import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
	console.log('sendTwoFactorTokenEmail', email, token)
	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: '2FA Code',
		html: `<p> あなたの2FAコード:${token}</p>`,
	})
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Reset your password',
		html: `<p><a href="${resetLink}">ここ</a>をクリックしてパスワードをリセットしてください</p>`,
	})
}

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Confirm your email',
		html: `<p> <a href="${confirmLink}">ここ</a>をクリックしてこのemailを承認して下さい。</p>',`,
	})
}
