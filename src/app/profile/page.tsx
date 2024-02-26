"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { auth, db } from '@/config/firebase'; 
import { auth, db } from "@/config/firebase";
import { 
  collection, 
  getDocs,
  doc,
  onSnapshot
} from "firebase/firestore";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const collectionRef = collection(db, 'users');
  const getData = () => {
    onSnapshot(collectionRef, (data) => {
      console.log(
        data.docs.map((item) => {
          return item.data();
        })
      )
    })
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <img src={user.avatar} alt="Avatar" />
      <p>Email: {user.email}</p>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
    </div>
  );
}
