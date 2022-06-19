import { useRef, useState } from 'react'

function usePrevious(element) {
	const currentRef = useRef(element)
	const prevRef = useRef()

	if (currentRef.current !== element) {
		prevRef.current = currentRef.current
		currentRef.current = element
	}
	return prevRef.current
}

export default function App() {
	const [count, setCount] = useState(0)
	const previousCount = usePrevious(count)

	const [name, setName] = useState('Tunav')

	return (
		<div>
			<div>
				{count} - {previousCount}
			</div>
			<div>{name}</div>
			<button
				onClick={() => setCount(currentCount => currentCount + 1)}>
				Increment
			</button>
			<button
				onClick={() =>
					setName(prev => (prev === 'Tunav' ? 'Bipul' : 'Tunav'))
				}>
				Change Name
			</button>
		</div>
	)
}
