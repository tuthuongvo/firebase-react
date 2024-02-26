"use client"
import styles from "./page.module.css";
import { RegisterForm } from "../../components/registerForm";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/config/firebase'; 

export default function Login() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    // If authentication is still loading, do nothing
    if (loading) return;

    // If user is logged in, redirect to homepage
    if (user) {
      router.push('/');
    }
  }, [user, loading, router]);
  return (
    <main className={styles.main}>
      <RegisterForm />
    </main>
  );
}
