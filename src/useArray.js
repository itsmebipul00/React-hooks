import { useState } from 'react'

function useArray(defaultValue) {
	const [array, setArray] = useState(defaultValue)

	const push = element => {
		setArray(prev => [...prev, element])
	}

	const remove = idx => {
		setArray(prev => [
			...prev.slice(0, idx),
			...prev.slice(idx + 1, prev.length),
		])
	}

	const filter = callback => {
		setArray(prev => prev.filter(callback))
	}

	const update = (idx, element) => {
		setArray(prev => [
			...prev.slice(0, idx),
			element,
			...prev.slice(idx + 1, prev.length),
		])
	}

	const clear = () => {
		setArray([])
	}
	return { array, set: setArray, push, remove, filter, update, clear }
}

export default function App() {
	const { array, set, push, remove, filter, update, clear } =
		useArray([1, 2, 3, 4, 5, 6])

	return (
		<div>
			<div>{array.join(', ')}</div>
			<button onClick={() => push(7)}>Add 7</button>
			<button onClick={() => update(1, 9)}>
				Change Second Element To 9
			</button>
			<button onClick={() => remove(1)}>Remove Second Element</button>
			<button onClick={() => filter(n => n < 3)}>
				Keep Numbers Less Than 4
			</button>
			<button onClick={() => set([1, 2])}>Set To 1, 2</button>
			<button onClick={clear}>Clear</button>
		</div>
	)
}
