'use client'
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import axios from "axios";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";

function InitUser() { 
    const setUser = useSetRecoilState(userState); 

    const init = async () => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log('currentUser :- ' + currentUser?.email);
        if(currentUser?.email) {
            setUser({ 
                isLoading: false, 
                userEmail: currentUser?.email 
            })
        } else { 
            setUser({ 
                isLoading: false, 
                userEmail: null 
            })
        }
      });
      return () => unsubscribe();

    }; 

    useEffect(() => {
        init(); 
    }, []); 

    return <></>
    
}

export default InitUser; 