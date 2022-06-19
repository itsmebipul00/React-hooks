import { useEffect, useState, useRef } from 'react'

import isEqual from 'lodash/fp/isEqual'

function useDeepCompareEffect(callback, dependencies) {
	const currentDependenciesRef = useRef()

	if (!isEqual(currentDependenciesRef.current, dependencies)) {
		currentDependenciesRef.current = dependencies
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(callback, [currentDependenciesRef.current])
}

export default function App() {
	const [age, setAge] = useState(0)
	const [otherCount, setOtherCount] = useState(0)
	const useEffectCountRef = useRef()
	const useDeepCompareEffectCountRef = useRef()

	const person = { age: age, name: 'Bipul' }

	useEffect(() => {
		useEffectCountRef.current.textContent =
			parseInt(useEffectCountRef.current.textContent) + 1
	}, [person])

	useDeepCompareEffect(() => {
		useDeepCompareEffectCountRef.current.textContent =
			parseInt(useDeepCompareEffectCountRef.current.textContent) + 1
	}, [person])

	return (
		<div>
			<div>
				useEffect: <span ref={useEffectCountRef}>0</span>
			</div>
			<div>
				useDeepCompareEffect:{' '}
				<span ref={useDeepCompareEffectCountRef}>0</span>
			</div>
			<div>Other Count: {otherCount}</div>
			<div>{JSON.stringify(person)}</div>
			<button onClick={() => setAge(currentAge => currentAge + 1)}>
				Increment Age
			</button>
			<button onClick={() => setOtherCount(count => count + 1)}>
				Increment Other Count
			</button>
		</div>
	)
}
