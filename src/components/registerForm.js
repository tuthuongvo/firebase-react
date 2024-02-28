'use client'
import { auth } from '@/config/firebase'
import {
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth'
import { Button, TextField, Typography, Grid, Paper } from '@mui/material'
import React, { useState } from 'react'

export const RegisterForm = () => {
	const [registEmail, setRegisterEmail] = useState('')
	const [registerPassword, setRegisterPassword] = useState('')

	const [user, setUser] = useState()

	const register = async () => {
		try {
			setRegisterEmail('')
			setRegisterPassword('')
			const user = await createUserWithEmailAndPassword(auth, registEmail, registerPassword)
			console.log(user)
		} catch (error) {
			console.log(error.message)
		}
	}

	React.useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
	}, [])

	const handleSubmit = (event) => {
		console.log('handle submit')
		event.preventDefault()
		event.target.reset()
	}

	const signInWithGoogle = async () => {
		const provider = new GoogleAuthProvider()
		const authorization = auth
		const result = await signInWithPopup(authorization, provider)
		console.log(result)
	}

	return (
		<Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
			<Grid item xs={10} sm={6} md={4}>
				<Paper elevation={3} style={{ padding: '20px' }}>
					<Typography variant="h5" gutterBottom>
						Register
					</Typography>
					<form onSubmit={handleSubmit}>
						<TextField
							label="Email"
							type="email"
							variant="outlined"
							fullWidth
							margin="normal"
							onChange={(e) => setRegisterEmail(e.target.value)}
						/>
						<TextField
							label="Password"
							type="password"
							variant="outlined"
							fullWidth
							margin="normal"
							onChange={(e) => setRegisterPassword(e.target.value)}
						/>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							fullWidth
							onClick={register}
							style={{ marginTop: '10px' }}
						>
							Register
						</Button>
					</form>
					<Button
						variant="contained"
						color="primary"
						fullWidth
						onClick={signInWithGoogle}
						style={{ marginTop: '10px' }}
					>
						Login with Google
					</Button>
					<div>
						<h2>User Logged in:</h2>
						<p>{user?.email}</p>
					</div>
				</Paper>
			</Grid>
		</Grid>
	)
}
