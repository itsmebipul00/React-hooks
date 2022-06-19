import { useState } from 'react'

function useToggle(defaultValue) {
	const [value, setValue] = useState(defaultValue)

	const toggleValue = customVal => {
		setValue(prev =>
			typeof customVal === 'boolean' ? customVal : !prev
		)
	}

	return [value, toggleValue]
}

export default function App() {
	const [value, toggleValue] = useToggle(false)
	return (
		<div className='App'>
			<p>{value.toString()}</p>
			<button onClick={toggleValue}>Toggle</button>
			<button onClick={() => toggleValue(true)}>Make True</button>
			<button onClick={() => toggleValue(false)}>Make False</button>
		</div>
	)
}
