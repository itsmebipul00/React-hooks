import { useEffect, useRef, useState } from 'react'

function useEventListener(event, callback, element = window) {
	const callbackRef = useRef()

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	useEffect(() => {
		if (element === null) return
		element.addEventListener(event, e => callbackRef.current(e))
		return () =>
			element.removeEventListener(event, e => callbackRef.current(e))
	}, [event, element])
}

function useMediaQuery(mediaQuery) {
	const [isMatch, setIsMatch] = useState(false)
	const [mediaQueryList, setMediaQueryList] = useState(null)

	useEffect(() => {
		const list = window.matchMedia(mediaQuery)
		setMediaQueryList(list)
		setIsMatch(list.matches)
	}, [mediaQuery])

	useEventListener(
		'change',
		e => setIsMatch(e.matches),
		mediaQueryList
	)

	return isMatch
}

export default function App() {
	const isLarge = useMediaQuery('(min-width:400px)')

	return <div>Large: {isLarge.toString()}</div>
}
