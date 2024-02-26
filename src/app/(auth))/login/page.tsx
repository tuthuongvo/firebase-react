"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/config/firebase';

import styles from "./page.module.css";
import { LoginForm } from "../../components/loginForm";

export default function Login() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;

    if (user) {
      router.push('/');
    }
  }, [user, loading, router]);

  return (
    <main className={styles.main}>
       {loading ? (
        <p>Loading...</p>
      ) : (
        <LoginForm />
      )}
    </main>
  );
}

