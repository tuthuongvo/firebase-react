"use client"
import { auth , googleProvider, db } from "@/config/firebase";
import { createUserWithEmailAndPassword,signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { 
  collection, 
  addDoc, 
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    console.log(auth?.currentUser?.email);
    console.log(auth?.currentUser?.photoURL);
  const collectionRef = collection(db, 'users');
  const signIn = async () => {
    addDoc(collectionRef,{
      email: email,
      password: password,
    })
    .then(() => {
      alert('Data added')
    }).catch((err) => {
      alert(err.message)
    })
    // try {
    // await createUserWithEmailAndPassword(auth, email, password);
    // } catch (err){
    //   console.error(err);
    // }
  };
  const signInWithGoogle = async () => {
    try {
    await signInWithPopup(auth,googleProvider);
    } catch (err){
      console.error(err);
    }
  };
  const logOut = async () => {
    try {
    await signOut(auth);
    } catch (err){
      console.error(err);
    }
  };
  const getData = () => {
    // getDocs(collectionRef).then((response) => {
    //   console.log(
    //     response.docs.map((item) => {
    //       return {...item.data(), id: item.id};
    //     })
    //   )
    // })
    onSnapshot(collectionRef, (data) => {
      console.log(
        data.docs.map((item) => {
          return item.data();
        })
      )
    })
  };
  const updateData = () => {
    const docToUpdate = doc(db, "users", "TStBhMo1GCLwS95BTa7W");
    updateDoc(docToUpdate, {
      email: 'ASas',
      password: 112314
    })
    .then(() => {
      alert('Data updated')
    })
    .catch((err) => {
      alert(err.message)
    })
  };
  const deleteData = () => {
    const docToDelete = doc(db, "users", "bK0EHaMBbsHcEdEx0Umf");
    deleteDoc(docToDelete)
    .then(() => {
      alert('Data deleted')
    })
    .catch((err) => {
      alert(err.message)
    })
  };
  return (
    <div>
      <input placeholder="Email.." onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password.."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}> Signin</button>
      <button onClick={signInWithGoogle}> Signin with google</button>
      <button onClick={logOut}> logOut</button>
      <button onClick={getData}>GetData</button>
      <button onClick={updateData}>Update Data</button>
      <button onClick={deleteData}>Delete Data</button>
    </div>
  );
};