import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function List() {
  const [ listItems, setListItems] = useState(null)
  useEffect(() => {
    const getItems = async () =>{
      const res = await axios.get('http://127.0.0.1:5000/books')
     setListItems(res.data)
    }
    getItems()
  }, [])
  
  return (
    <div>
      <h1 className='text-3xl text-center my-10 font-bold tracking-wider'>Famous Books</h1>
      <div className='flex justify-center gap-20 w-4/5 m-auto flex-wrap'>
        {listItems && listItems.map((item)=>{
          const {id, title, cover, cost} = item
          return(
            <Link to={'/bookdetail/'+id} key={id} className='text-center   w-[200px] overflow-hidden  bg-gray-100 rounded shadow-xl'>
              <img src={cover} alt={title} className=' h-52 w-full object-cover' />
              <div className='my-2'>
                <p className='text-xl font-bold text-gray-600 tracking-widest '>{title}</p>
                <div className=''> 
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    
    </div>
  )
}
