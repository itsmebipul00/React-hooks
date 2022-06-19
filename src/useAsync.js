import { useState, useCallback, useEffect } from 'react'

function useAsync(callback, dependencies = []) {
	const [loading, setLoading] = useState(true)
	const [value, setVal] = useState()
	const [error, setError] = useState()

	const callBackMemoized = useCallback(() => {
		setLoading(true)
		setError(undefined)
		setVal(undefined)
		callback()
			.then(setVal)
			.catch(setError)
			.finally(() => setLoading(false))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies)

	useEffect(() => {
		callBackMemoized()
	}, [callBackMemoized])

	return { loading, value, error }
}

export default function App() {
	const { loading, value, error } = useAsync(() => {
		return new Promise((resolve, reject) => {
			const success = true
			setTimeout(() => {
				success ? resolve('Success') : reject('Rejected')
			}, 2000)
		})
	})

	return (
		<div>
			<div>Loading: {loading.toString()}</div>
			<div>{error}</div>
			<div>{value}</div>
		</div>
	)
}
