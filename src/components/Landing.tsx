'use client'
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import { userEmailState } from "../store/selectors/userEmail"; 
import { isUserLoading } from "../store/selectors/isUserLoading"; 
import TodoList from "./todoList";
import { useRouter } from "next/navigation";

export const Landing = () => {
    const navigate = useRouter(); 
    const userEmail = useRecoilValue(userEmailState); 
    const userLoading = useRecoilValue(isUserLoading); 

    if(userEmail) { 
        return <TodoList />
    } else { 
        return (
            <>
            <h1 className="flex justify-center font-normal cursor-pointer mt-10 text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl" style={{fontFamily: 'Cookie', color: 'white'}}> 
                Welcome to <span className="font-bold">&nbsp;ToDo...</span>
            </h1>
            <h1 className="flex justify-center font-normal cursor-pointer mt-10 text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl" style={{fontFamily: 'Cookie', color: 'white'}}> 
                login or make an account and get <span className="font-bold">&nbsp;started!</span>
            </h1>

            </>
        )
    }
}

