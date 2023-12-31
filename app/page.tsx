import { ArrowRightIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Page() {
	return (
		<div>
			
			<Link href="/dashboard" className="h-10 primaryButton flex items-start">
				<Button size="lg">
					dashboard <ArrowRightIcon className="ml-2 w-6" />
				</Button>
				</Link>
		</div>
	)
}
