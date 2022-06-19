import { useState, useRef, useCallback, useEffect } from 'react'

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
	}, [delay, set, clear])

	const reset = useCallback(() => {
		clear()
		set()
	}, [clear, set])

	return { reset, clear }
}

function useDebounce(callback, delay, dependencies) {
	const { reset, clear } = useTimeout(callback, delay)

	//everytime the dependeices changes we want to reset the timer so that we call the callback exactly after the delay
	useEffect(reset, [...dependencies, reset])

	//first render we want to clear the dependencies so that render is not called
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(clear, [])
}

export default function App() {
	const [count, setCount] = useState(10)
	useDebounce(() => alert(count), 1000, [count])

	return (
		<div>
			<div>{count}</div>
			<button onClick={() => setCount(c => c + 1)}>Increment</button>
		</div>
	)
}
