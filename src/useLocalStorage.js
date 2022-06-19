import { useEffect, useState } from 'react'

const getSavedValue = (key, initialValue) => {
	const savedValue = JSON.parse(localStorage.getItem(key))
	if (savedValue) return savedValue

	if (initialValue instanceof Function) return initialValue()
	return initialValue
}

//we want the initialValue to be a function
//so that it runs only once when the app loads
function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() =>
		getSavedValue(key, initialValue)
	)

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value])

	return [value, setValue]
}

export default function App() {
	const [name, setName] = useLocalStorage('name', () => '')
	return (
		<div className='App'>
			<input
				value={name}
				placeholder='Username'
				onChange={e => setName(e.target.value)}
			/>
		</div>
	)
}
