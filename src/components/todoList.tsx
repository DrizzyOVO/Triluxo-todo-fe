'use client'
import React, { useState, useEffect } from 'react';
import {useRecoilValue} from "recoil";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { Todo } from '../store/atoms/todo';
import { redirect, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { userEmailState } from '@/store/selectors/userEmail';
import toast from 'react-hot-toast';


const textStyle = {
    textDecoration: "line-through", 
    color: "#9CA3AF" 
}

const checkStyle = { 
    backgroundColor: "#10B981", 
    borderColor: "#10B981", 
    color: "#9CA3AF"
}


const TodoList = () => { 
    const userEmail = useRecoilValue(userEmailState); 
    const [todos, setTodos] = useState<Todo[]>([]);      
    const [title, setTitle] = useState('');
    const navigate = useRouter(); 

    useEffect(() => {
        if (userEmail) { 
            const getTodos = async () => {
                toast.success('connection to backend'); 
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todo/alltodos/${userEmail}`);
                const data = response.data.todos; 
                setTodos(data);
            };
            console.log('email :- ' + userEmail); 
            getTodos(); 
        } else { 
            toast.error('Not signed in'); 
            navigate.push('/signin') 
        }

    }, []);

    const addTodo = async (event: any) => {
        event.preventDefault(); 
        setTitle(title.trim()); 
        if(title !== ""){ 
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todo/todos`, { 
                title: title, 
                email: userEmail
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if(response){
                if(response.data.message){
                    toast.error("Max limit of 20 todos reached:(") 
                } else {
                    const data = response.data.todos;
                    setTodos([...todos, data]);
                    setTitle("");
                } 
            } else {
                toast.error("server maybe down, try again:("); 
            }

            // const data = response.data;
            // setTodos([...todos, data]);
            // setTitle(""); 
        } else {
            toast.error("No Todo to add"); 
        }
        
    };



    const markDone = async (id: String | undefined) => { 
        
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todo/todos/${id}/done`, {
            email: userEmail
        });
        const updatedTodoo = response.data.updatedTodo; 
        setTodos(todos.map((todo) => (todo._id === updatedTodoo._id ? updatedTodoo : todo)));
    };



    const deleteOne = async (id: String | undefined) => { 
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todo/todos/${id}/delete`, {
            email: userEmail
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        const deleteTodo = response.data.deleteTodo;
        setTodos(todos.filter((todo) => (todo._id !== deleteTodo._id )));
    };

    return (
        <>
        
        <div className="flex flex-grow items-center justify-center"> 
		<div className="max-w-full p-8 bg-gray-800 rounded-lg shadow-lg text-gray-200 mt-12 w-11/12 sm:w-96 lg:w-4/12">
			<div className="flex items-center mb-6">
				<svg className="h-8 w-8 text-indigo-500 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
				</svg>
				<h4 className="font-semibold ml-3 text-lg" style={{fontFamily: 'Cookie', fontSize: "25px", color: 'white'}}>Your todos</h4>
			</div>


            <div className='flex justify-between'>
                <form onSubmit={addTodo}>
                <input type='text' 
                    className='bg-gray-900 outline-none rounded-md px-2 xl:pr-20 2xl:pr-40 p-2'
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                        placeholder='Title' 
                />
                </form>

                <button 
                    onClick={addTodo}
                    className='p-1 bg-gray-900 rounded-md px-1 text-xs sm:text-base' 
                >Add Todo</button>
            </div>


            <div className='mt-5'>

            {todos.map((todo, index) => ( 
                 <div key={index}> 

                    <div className='flex justify-between items-center mt-3' > 
                        <div className='' onClick={() => markDone(todo._id)} style={{ textDecoration: todo.done && "line-through", color: todo.done && "#9CA3AF" }}>
                            <input className="hidden" type="checkbox" id="task_6" checked />
                            <label className="flex items-center h-full px-2 rounded cursor-pointer hover:bg-gray-900 hover:px-2 hover:p-0.5" >
                                <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full" style={{ backgroundColor: todo.done && "#10B981", borderColor: todo.done && "#10B981", color: todo.done && "#9CA3AF" }}>
                                    <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                <span className="ml-4 text-sm break-words">{todo.title}</span>	
                            </label>
                        </div>
                        <div className='mr-1.5 sm:mr-4'>
                            <button onClick={() => deleteOne(todo._id)}>Delete</button>  
                        </div>
                    </div>
                 </div>
            ))}

            </div>

        </div>

        </div>

        </>
    );
};

export default TodoList;
