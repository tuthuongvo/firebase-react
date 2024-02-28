'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthContextProvider } from './context/AuthContext'
import Header from './components/header/Header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthContextProvider>
					<Header />
					{children}
				</AuthContextProvider>
			</body>
		</html>
	)
}
