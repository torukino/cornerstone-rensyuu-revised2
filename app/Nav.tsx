import { ArrowRightIcon, PowerIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { signOut } from '@/auth'

const Nav = () => {
	return (
		<div className="h-full flex flex-row  justify-between md:flex-col md:items-around md:w-64">
			<Link href="/dashboard" className="h-10 primaryButton flex items-start">
				dashboard <ArrowRightIcon className="ml-2 w-6" />
			</Link>

			<Image
				src="/nozomi/sensei.png"
				width={200}
				height={200}
				className="w-36 mt-8 hidden md:block"
				alt="Screenshots of the dashboard project showing desktop version"
				priority
			/>

			<form
				className="primaryButton flex h-10"
				action={async () => {
					'use server'
					await signOut({ redirectTo: '/login' })
				}}
			>
				<PowerIcon className="w-6" />
				<div className="ml-4 text-sm">ログアウト</div>
			</form>
		</div>
	)
}

export default Nav
