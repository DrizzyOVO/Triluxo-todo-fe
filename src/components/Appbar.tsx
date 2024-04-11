'use client'
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userEmailState } from "../store/selectors/userEmail";
import { userState } from "../store/atoms/user";
import { redirect, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { UserAuth } from "@/app/AuthContext";
import toast from "react-hot-toast";

function Appbar() {
    const navigate = useRouter()
    const userLoading = useRecoilValue(isUserLoading); 
    const userEmail = useRecoilValue(userEmailState); 
    const setUser = useSetRecoilState(userState); 
    const { logOut } = UserAuth(); 

    const handleSignOut = async () => {
        try {   
            await logOut(); 
        } catch(error) { 
            console.log(error);     
        }
    }

    if(userLoading) { 
        return <></> 
    }

    if (userEmail){
        return <div className="flex justify-between sm:justify-center h-16 px-10 shadow items-center mt-10">


            <div className="flex items-center space-x-8 sm:ml-24">
                <h1 className="text-xl lg:text-2xl font-bold cursor-pointer" style={{fontFamily: 'Cookie', fontSize: "50px", color: 'white'}}
                onClick={() => {
                    navigate.push("/")
                }}
                >ToDo...</h1>
                <div className="hidden md:flex justify-around space-x-4"></div>
            </div>

            <div className="flex space-x-4 items-center sm:mr-24">
                <a 
                    href="#" 
                    className="bg-green-600 px-4 py-4 rounded-xl text-white hover:bg-green-800 text-sm" 
                    style={{fontFamily: 'Cookie', fontSize: "35px", color: 'white'}}
                    onClick={async () => {
                        // @ts-ignore 
                        handleSignOut(); 
                        setUser({ 
                            isLoading: false, 
                            userEmail: null 
                        }); 
                        navigate.push(`/`)
                        toast.success('Logged out') 
                    }}
                    >Logout</a>
            </div>


        </div>
    } else {
        return <div className="flex justify-between sm:justify-center h-16 sm:px-10 shadow items-center mt-10 w:9/12">


            <div className="flex items-center ml-3 sm:space-x-8">
                <h1 className="text-xl lg:text-2xl font-bold cursor-pointer" style={{fontFamily: 'Cookie', fontSize: "50px", color: 'white'}} 
                onClick={() => {
                    navigate.push("/")
                }}>ToDo...</h1>
                <div className="hidden md:flex justify-around space-x-4"></div>
            </div>


            <div className="flex space-x-4 items-center mr-3 sm:space-x-4">

                <a className="text-gray-800 text-sm cursor-pointer" 
                style={{fontFamily: 'Cookie', fontSize: "35px", color: 'white'}}
                onClick={() => {
                    navigate.push("/signin")
                }}
                >Login</a>

                <a
                className="bg-green-600 px-4 py-4 rounded-xl text-white hover:bg-green-800 text-sm cursor-pointer" 
                style={{fontFamily: 'Cookie', fontSize: "35px", color: 'white'}}
                onClick={() => {
                    navigate.push("/signup")
                }}
                >Signup</a>

            </div>
            

        </div>
    }
}

export default Appbar;
