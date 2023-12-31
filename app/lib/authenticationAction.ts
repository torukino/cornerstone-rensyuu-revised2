'use server'
import { signIn } from '@/auth'
import { USER } from '@/types/user'

export async function authenticate(prevState: string | undefined, formData: FormData) {
	try {
		console.log('authenticate in authenticatoinAction.ts')
		console.log(formData.get('email'), formData.get('password'))

		const user: USER = await signIn('credentials', Object.fromEntries(formData))
		console.log('user', user)
	} catch (error) {
		if ((error as Error).message.includes('CredentialsSignin')) {
			return 'CredentialsSignin エラー'
		}
		throw error
	}
}
