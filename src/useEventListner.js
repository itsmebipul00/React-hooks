import { useEffect, useRef, useState } from 'react'

function useEventListener(event, callback, element = window) {
	const callbackRef = useRef(callback)
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

export default function EventListenerComponent() {
	const [key, setKey] = useState('')
	useEventListener('keydown', e => {
		setKey(e.key)
	})

	return <div>Last Key: {key}</div>
}
