'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Import the useRouter hook
import { auth, db } from '@/config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import Image from 'next/image'

export default function ProfilePage() {
	const [user, setUser] = useState(null)
	const [userData, setUserData] = useState(null)
	const router = useRouter() // Initialize the useRouter hook

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			setUser(currentUser)
			if (currentUser) {
				const q = query(collection(db, 'users'), where('email', '==', currentUser.email))
				const querySnapshot = await getDocs(q)
				querySnapshot.forEach((doc) => {
					// If a document with the user's email exists, setUserData
					setUserData(doc.data())
				})
			} else {
				// Redirect to login if no user is signed in
				router.push('/login')
			}
		})
		return () => unsubscribe() // Cleanup function to unsubscribe from the listener
	}, [router]) // Add router to the dependency array
	// console.log(user);
	return (
		<div>
			<h1>Profile</h1>
			{user ? (
				<>
					<Image src={user?.photoURL} alt="Avatar" />
					<p>Email: {user?.email}</p>
					{userData ? (
						<>
							<p>First Name: {userData.firstName}</p>
							<p>Last Name: {userData.lastName}</p>
						</>
					) : (
						<p>No user data found</p>
					)}
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}
