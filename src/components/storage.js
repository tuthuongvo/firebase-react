"use client"
import { app, db, storage } from "@/config/firebase";
import { useState } from "react";
import { 
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";

export const Storage = () => {
  const [data, setData] = useState({});

  const handleSubmit = () => {
    const storageRef = ref(storage, `images/${data.name}`);
    const uploadTask = uploadBytesResumable(storageRef, data);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
    (error) => {
      console.log(error.message)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }
    )
    console.log(data);
  };
  return (
    <div>
      <input type="file" onChange={(event) => setData(event.target.files[0])}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};