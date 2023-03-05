import React, { useState } from 'react'
import axios from 'axios'

export default function AddBook() {
    const [bookData, setBookData ] = useState({title:'',cost:'',cover:'',category:''})
    const onChangeForm = (e)=>{
        console.log(e.target.name,e.target.value)
        setBookData({...bookData,[e.target.name]:e.target.value})
    } 
    const onBookSubmit = async (e)=>{
        e.preventDefault()
       const res = await axios.post('http://127.0.0.1:8000/api/create/',{...bookData})
        console.log(res.data)
        setBookData({...setBookData,title:'',cost:'',cover:'',category:''})
        if (res.status ===200 ) {
            alert('Book Added')
        }
    }
  return (
    
<form className='w-3/5 m-auto' onSubmit={onBookSubmit}>
    <div className="grid gap-6 mb-6 md:grid-cols-2 mt-10">
        <div>
            <label for="first_name" className="block mb-2  font-medium text-gray-900 text-xl font-bold ">Title</label>
            <input value={bookData.title} onChange={(e)=>onChangeForm(e)} name='title' type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required/>
        </div>
        <div>
            <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 text-xl font-bold">Price</label>
            <input value={bookData.cost} name='cost' type="text" onChange={(e)=>onChangeForm(e)} id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cost" required/>
        </div>
        <div>
            <label for="company" className="block mb-2 text-sm font-medium text-gray-900 text-xl font-bolde">Cover Image</label>
            <input value={bookData.cover} type="text" name='cover'  onChange={(e)=>onChangeForm(e)} id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cover Image" required/>
        </div>  
       
        <div>
            <label for="company" className="block mb-2 text-sm font-medium text-gray-900 text-xl font-bold">Category</label>
            <input value={bookData.category} type="text" onChange={(e)=>onChangeForm(e)} id="company" name='category' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Category" required/>
        </div> 
    </div>
  
   
    <button  type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

  )
}
