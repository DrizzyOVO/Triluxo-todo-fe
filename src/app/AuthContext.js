'use client'
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "./firebase";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "@/store/atoms/user";
import { axios } from "axios";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const setTheUser = useSetRecoilState(userState); 

  const googleSignIn = async () => { 
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);

    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/googleSignup`, {
      email: email,
      password: password
    }, {
        headers: {
            "Content-type": "application/json"
        }
    }); 

    if (res.data.message === 'Invalid input'){

        toast.error('Invalid username or password');  

    } else {

      toast.success('Signed in!');

      navigate.push("/"); 
        
    }

  };

  const emailPassSignIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            console.log('user :- ' + user.email); 
            setTheUser({
              isLoading: false, 
              userEmail: user.email, 
            })
          } else {
            console.log('noooo'); 
          }
        })
        .catch(error => (console.log(error)))
  }

  const emailPassSignUp = (email, password) => {  
    createUserWithEmailAndPassword(auth, email, password);
  }

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('currentUser :- ' + currentUser.email);
      setUser(currentUser);
      setTheUser({ 
        isLoading: false, 
        userEmail: currentUser.email
      })
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, emailPassSignIn, emailPassSignUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};