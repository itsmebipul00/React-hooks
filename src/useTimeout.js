import { useCallback, useEffect, useRef, useState } from 'react'
//same as setTimeout , returns a function that clearsTimeout(stop the timeout) and resetTimout(to set to the setter function)

function useTimeout(callback, delay) {
	const callBackRef = useRef(callback)
	const timeoutRef = useRef()

	useEffect(() => {
		callBackRef.current = callback
	}, [callback])

	const set = useCallback(() => {
		timeoutRef.current = setTimeout(
			() => callBackRef.current(),
			delay
		)
	}, [delay])

	const clear = useCallback(() => {
		timeoutRef.current && clearTimeout(timeoutRef.current)
	}, [])

	useEffect(() => {
		set()
		return clear
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clear, set, clear])

	const reset = useCallback(() => {
		clear()
		set()
	}, [clear, set])

	return { reset, clear }
}

export default function App() {
	const [count, setCount] = useState(10)
	const { clear, reset } = useTimeout(() => setCount(0), 1000)

	return (
		<div>
			<div>{count}</div>
			<button onClick={() => setCount(c => c + 1)}>Increment</button>
			<button onClick={clear}>Clear Timeout</button>
			<button onClick={reset}>Reset Timeout</button>
		</div>
	)
}
