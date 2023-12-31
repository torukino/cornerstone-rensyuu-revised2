import NozomiLogo from '@/public/nozomi/nozomi-logo'
import Nav from '@/app/Nav'

export default function Page() {
	return (
		<main className="flex h-screen flex-col p-6">
			<div className="w-full h-full">
				<div className="h-20 items-end rounded-lg bg-gray-100 p-4 md:w-64">
					<NozomiLogo />
				</div>

				<div className="h-full flex flex-col md:flex-row rounded-lg bg-gray-50 px-6 py-10 ">
					<Nav />

					<div className="bg-yellow-100 flex flex-grow items-center justify-center p-6 md:w-3/5">@@@@@本文 HOME@@@@@</div>
				</div>
			</div>
		</main>
	)
}
