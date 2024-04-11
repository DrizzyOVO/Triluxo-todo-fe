'use client'
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { UserAuth } from '@/app/AuthContext';
import { z } from "zod"; 

const signupInput = z.object({ 
    email: z.string().max(50).min(5).email(), 
    password: z.string().min(2)
}); 

function Signup() {
    const navigate = useRouter(); 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const setUser = useSetRecoilState(userState); 
    const { emailPassSignUp, emailPassSignIn, googleSignIn } = UserAuth();  

    const handleSignUp = async (email: string, password: string) => { 
        // createUserWithEmailAndPassword(auth, email, password);
        try { 
            await emailPassSignUp(email, password); 
            navigate.push("/");
        } catch(error) { 
            console.log(error); 
        }
    };

    const handleSignInOnSignUp = async (email: string, password: string) => { 
        try {   
            await emailPassSignIn(email, password);  
        } catch (error) { 
            console.log(error); 
        }
    }

    const handleGoogleSignUp = async () => {
        try {   
          await googleSignIn(); 
        } catch(error) { 
          console.log(error); 
        }
      }
            
    return <div className='flex justify-center mt-20'>

    <div className="relative flex flex-col text-gray-700 bg-gray-800 shadow-md w-96 rounded-xl bg-clip-border">
    <div
    className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
    <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white" style={{fontFamily: 'Cookie', fontSize: "55px", color: 'white'}}>
        Sign up
    </h3>
    </div>
    <div className="flex flex-col gap-4 p-6">
    <div className="relative h-11 w-full min-w-[200px]">
        <input
            onChange={(evant11) => {
                let elemt = evant11.target;
                setEmail(elemt.value);
            }}
        className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-gray-300 border-gray-900 text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        placeholder=" " />
        <label
        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
        Email
        </label>
    </div>
    <div className="relative h-11 w-full min-w-[200px]">
        <input
            onChange={(e) => {
            setPassword(e.target.value);
            }}
            className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-gray-300 border-gray-900 text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" " />
        <label
        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
        Password
        </label>
    </div>
    <div className="-ml-2.5">

    </div>
    </div>
    <div className="p-6 pt-0">
    <button
        style={{fontFamily: 'Cookie', fontSize: "20px", color: 'white'}}
        className="block w-full select-none rounded-lg bg-gradient-to-tr from-green-600 to-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
        onClick={async () => {

            const parsedInput = signupInput.safeParse({email, password});  

            if(!parsedInput.success) {

                toast.error('invalid email / password /n password length more the 6 characters!') 

            } else { 

                await handleSignUp(email, password);   
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
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

                    await handleSignInOnSignUp(email, password); 

                    navigate.push("/"); 
                    
                }

            }

        }}
        type="button">
        Sign up
    </button>
    <p className="flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-gray-400">
        Already have an account?
        <a
        className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-gray-300 cursor-pointer"
        onClick={() => {
            navigate.push("/signin")
        }}
        >
        login 
        </a>
    </p>

    <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">or</span>
        <div className="flex-grow border-t border-gray-400"></div>
    </div>

    <button 
        style={{fontFamily: 'Cookie', fontSize: "20px", color: 'white'}}
        className="block w-full select-none mt-3 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        onClick={ 
            async () => {
                try { 
                    await handleGoogleSignUp(); 
                    navigate.push('/') 
                } catch(error) { 
                    console.log(error); 
                }
            }
        }
    >

        <div className='flex justify-center space-x-2'>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
        <span>Signup with Google</span> 
        </div>    
    
    </button>

    </div>
    </div>
    </div>


}

export default Signup;