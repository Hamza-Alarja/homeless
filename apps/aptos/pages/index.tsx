import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Index() {
	const router = useRouter()

	useEffect(() => {
		// Redirect to the swap page by default
		router.replace('/swap')
	}, [router])

	return null
}
