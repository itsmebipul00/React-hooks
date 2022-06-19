import { useEffect, useState } from 'react'

function useUpdateLoggger(val) {
	useEffect(() => {
		console.log(val)
	}, [val])
}

export default function App() {
	const [name, setName] = useState('')
	useUpdateLoggger(name)
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
