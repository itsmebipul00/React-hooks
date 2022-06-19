import { useState, useCallback, useEffect } from 'react'

function useAsync(callback, dependencies = []) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState()
	const [value, setValue] = useState()

	const callbackMemoized = useCallback(() => {
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
		callbackMemoized()
	}, [callbackMemoized])

	return { loading, error, value }
}

const DEFAULT_OPTIONS = {
	headers: { 'Content-Type': 'application/json' },
}

function useFetch(url, options = {}, dependencies = []) {
	return useAsync(() => {
		return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then(
			res => {
				if (res.ok) return res.json()
				return res.json().then(json => Promise.reject(json))
			}
		)
	}, dependencies)
}

export default function App() {
	const [id, setId] = useState(1)
	const { loading, error, value } = useFetch(
		`https://jsonplaceholder.typicode.com/todos/${id}`,
		{},
		[id]
	)

	return (
		<div>
			<div>{id}</div>
			<button onClick={() => setId(currentId => currentId + 1)}>
				Increment ID
			</button>
			<div>Loading: {loading.toString()}</div>
			<div>{JSON.stringify(error, null, 2)}</div>
			<div>{JSON.stringify(value, null, 2)}</div>
		</div>
	)
}
