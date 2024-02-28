'use client'
import { auth, db } from '@/config/firebase'
import {
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth'
import { Button, TextField, Typography, Grid, Paper } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { collection, addDoc } from 'firebase/firestore'

const defaultTheme = createTheme()

export const RegisterForm = () => {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const collectionRef = collection(db, 'users')

	const [user, setUser] = useState()

	const register = async () => {
		try {
			setEmail('')
			setPassword('')
			const user = await createUserWithEmailAndPassword(auth, email, password)
			addDoc(collectionRef, {
				firstName: firstName,
				lastName: lastName,
				email: email,
			})
				.then(() => {
					alert('Data added')
				})
				.catch((err) => {
					alert(err.message)
				})
			console.log(user)
			router.push('/login')
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
		const { displayName, email } = result.user
		const [firstName, lastName] = displayName ? displayName.split(' ') : ['', '']
		addDoc(collectionRef, {
			firstName: firstName,
			lastName: lastName,
			email: email,
		})
			.then(() => {
				console.log('Data added')
			})
			.catch((err) => {
				console.log(err.message)
			})
		console.log(result)
	}

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
									onChange={(e) => setLastName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox value="allowExtraEmails" color="primary" />}
									label="I want to receive inspiration, marketing promotions and updates via email."
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={register}
						>
							Sign Up
						</Button>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={signInWithGoogle}
						>
							Login with Google
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	)
}
