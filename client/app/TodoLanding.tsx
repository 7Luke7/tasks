"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import DeleteIcon from "./public/delete-button-svgrepo-com.svg"
import EditIcon from "./public/edit-button-svgrepo-com.svg"
import axios from 'axios'
import Link from 'next/link'

const TodoLanding = () => {
    const [tasks, setTasks] = useState([])
    const [taskInput, setTaskInput] = useState("")
    const [loading, setLoading] = useState(true)
    const [emptyInput, setEmptyInput] = useState(false)
    useEffect(() => {
      retrieveTasks()
    }, [])

    axios.defaults.withCredentials = true
    const retrieveTasks = async () => {
      const requestTasks = await axios({
        method: "GET",
        url: "https://tasks-self.vercel.app"
      })
      if (requestTasks.status === 200) {
        setTasks(requestTasks.data)
        setLoading(false)
      } else {
        throw new Error("Error occured while fetching tasks")
      }
    }

    const SubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (taskInput === "") {
        setEmptyInput(true)
        setTimeout(() => {
          setEmptyInput(false)
        }, 1500)
      } else {
        const create_task = await axios({
          method: "POST",
          url: "https://tasks-self.vercel.app/tasks",
          data: {
            task: taskInput
          }
        })
        if(create_task.status === 200) {
          setTaskInput("")
          retrieveTasks()
        } else {
          throw new Error("Error occured while deleting task")
        }
      }
    }

    const DeleteHandler = async (id: string) => {
      const deleteTask = await axios({
        method: "DELETE",
        url: `https://tasks-self.vercel.app/tasks/${id}`
      })
      if (deleteTask.status === 200) {
        retrieveTasks()
      } else {
        throw new Error("Error occured while deleting task")
      }
    }
      
  return (
    <div className='h-full'>
    <div className='flex flex-col items-center'>
        <form action="" onSubmit={SubmitForm}>
            <input value={taskInput}  onChange={(e) => setTaskInput(e.target.value)} type="text" placeholder='Task...' className='outline-none border-netural-200 shadow-md p-2 text-neutral-800' />
            <button type='submit' className='bg-fuchsia-500 text-slate-50 font-semibold p-2'>
                Submit
            </button>
        </form>
    </div>
    {emptyInput ? <p className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">Oh, snapp!</span> Input is empty.</p> : ""}
    {loading ? <div className="mt-20 flex justify-center" role="status">
    <svg className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div> : tasks.length === 0 ? <div className="mt-20 flex justify-center">
    <h1 className='text-neutral-800 text-2xl'>Tasks are empty.</h1>
</div> : <div className='p-3 bg-white rounded-md shadow-md mt-20'>
            {tasks.map((t: any, id) => {
                return <div key={t._id} className='flex justify-between'>
                    <div className='flex gap-3'>
                        <p className='text-neutral-800'>{id + 1}.</p>
                        <p className='text-neutral-800'>{t.task}</p>
                    </div>
                    <div className='flex items-center'>
                        <Link href={`/edit/${t._id}`} className='outline-none'>
                        <Image alt='editIcon' width={20} src={EditIcon}></Image>
                        </Link>
                        <button onClick={() => DeleteHandler(t._id)} className='outline-none'>
                        <Image alt='deleteIcon' width={20} src={DeleteIcon}></Image>
                        </button>
                    </div>
                </div>
            })} 
        </div>}
    </div>
  )
}

export default TodoLanding
