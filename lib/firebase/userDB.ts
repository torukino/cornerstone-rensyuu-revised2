'use server'

import { firestore } from '@/lib/firebase/firebaseConfig'
import { USER } from '@/types/user'

export const getUsers = async (): Promise<USER[]> => {
	const users: USER[] = []
	await firestore
		.collection('users')
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(doc => {
				users.push(doc.data() as USER)
			})
		})
	return users
}
