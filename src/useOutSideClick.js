import { useRef, useState, useEffect } from 'react'
function useEventListener(eventType, callback, element = window) {
	const callbackRef = useRef(callback)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	useEffect(() => {
		if (element == null) return
		const handler = e => callbackRef.current(e)
		element.addEventListener(eventType, handler)

		return () => element.removeEventListener(eventType, handler)
	}, [eventType, element])
}

function useClickOutside(ref, cb) {
	useEventListener(
		'click',
		e => {
			if (ref.current === null || ref.current.contains(e.target))
				return
			cb(e)
		},
		document
	)
}

export default function App() {
	const [open, setOpen] = useState(true)
	const modalRef = useRef()

	useClickOutside(modalRef, () => {
		if (open) setOpen(false)
	})

	return (
		<>
			<div
				ref={modalRef}
				style={{
					display: open ? 'block' : 'none',
					backgroundColor: 'blue',
					color: 'white',
					width: '100px',
					height: '100px',
					position: 'absolute',
					top: 'calc(50% - 50px)',
					left: 'calc(50% - 50px)',
				}}>
				<span>Modal</span>
			</div>
		</>
	)
}
