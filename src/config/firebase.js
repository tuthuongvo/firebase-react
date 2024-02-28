import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyAUR8KHPF09qDTBgEBk0Wk-aKXp-4jVR7w',
	authDomain: 'fir-reac-auth.firebaseapp.com',
	projectId: 'fir-reac-auth',
	storageBucket: 'fir-reac-auth.appspot.com',
	messagingSenderId: '354118256805',
	appId: '1:354118256805:web:a477a4deabe32ba655254c',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
