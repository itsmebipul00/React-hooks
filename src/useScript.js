import { useCallback, useEffect, useState } from 'react'

function useAsync(callback, dependencies = []) {
	const [loading, setLoading] = useState(true)
	const [value, setValue] = useState()
	const [error, setError] = useState()

	const callBackMemoized = useCallback(() => {
		setLoading(true)
		setError(undefined)
		setValue(undefined)
		callback()
			.then(setValue)
			.catch(setError)
			.finally(() => setLoading(false))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies)

	useEffect(() => {
		callBackMemoized()
	}, [callBackMemoized])

	return { loading, value, error }
}

function useScript(url) {
	return useAsync(() => {
		const script = document.createElement('script')
		script.src = url
		script.async = true

		return new Promise((resolve, reject) => {
			script.addEventListener('load', resolve)
			script.addEventListener('error', reject)
			document.body.appendChild(script)
		})
	}, [url])
}

export default function App() {
	const { loading, error } = useScript(
		'https://code.jquery.com/jquery-3.6.0.min.js'
	)

	if (loading) return <div>Loading</div>
	if (error) return <div>Error</div>
	return <div>{window.$(window).width()}</div>
}
