"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = (props: any) => {
  const [updateInput ,setUpdateInput] = useState("")
  const [message,setMessage] = useState(false)

  useEffect(() => {
    get_task_name()
  }, [])
  const get_task_name = async () => {
    const response = await axios({
      method: "GET",
      url: `http://localhost:5001/tasks/${props.params.id}`,
    })

    if (response.status === 200) {
      setUpdateInput(response.data.task)
    }
  }
  const submitUpdate = async (e: any) => {
    e.preventDefault()
    const response = await axios({
      method: "PATCH",
      url: `http://localhost:5001/tasks/${props.params.id}`,
      data: {
        task: updateInput
      }
    })

    if (response.status === 200) {
      setMessage(true)
    }
  }
  return (
    <section className='flex items-center justify-center'>
      <div className='p-3 bg-white rounded-md shadow-md mt-20'>
        <h1 className='text-3xl text-center text-neutral-800'>Edit Task</h1>
        <p className='pt-3 pb-3'>Task Id: {props.params.id}</p>
        <form action="" onSubmit={submitUpdate}>
        <input value={updateInput} onChange={(e) => setUpdateInput(e.target.value)} type="text" placeholder='Update task...' className='outline-none border-netural-200 shadow-md p-2 text-neutral-800' />
            <button type='submit' className='bg-fuchsia-500 text-slate-50 font-semibold p-2'>
                Submit
            </button>
        </form>
        {message ? <div className="mt-2 flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
  <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span className="sr-only">Info</span>
  <div>
    <span className="font-medium">Success alert! <Link href="/" className='text-cyan-600 underline'>Go back</Link></span>
  </div>
</div>: ""}
      </div>
    </section>
  )
}

export default page