import { ReactNode, useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User as FirebaseAuthUser, // Import User type from firebase
} from "firebase/auth";
import { auth } from "@/config/firebase";

// Define the User type
interface User {
    email: string | null; // Update to allow null
    photoURL: string;
    displayName: string;
}

// Define the type of the context value
interface UserAuthContext {
  user: User | null;
  googleSignIn: () => void;
  logOut: () => void;
}

// Pass undefined as initial value to createContext
const AuthContext = createContext<UserAuthContext | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: FirebaseAuthUser | null) => {
      // Check if currentUser exists and map it to your User interface
      if (currentUser) {
        setUser({
          email: currentUser.email || "", // Provide a default value if email is null
          photoURL: currentUser.photoURL || "",
          displayName: currentUser.displayName || "", // Provide a default value if displayName is null
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  // Explicitly define the type of the context value
  const contextValue = useContext(AuthContext) as UserAuthContext;
  return contextValue;
};
