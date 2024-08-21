'use client'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
  const { id } = useParams();

  const getDetails =async () => {
    let data = await fetch(`https://dummyjson.com/recipes/${id}`)
    data = await data.json();
    console.log(data);
  }

  useEffect(()=>{
    getDetails();
  },[id]);


  return (
    <div>page</div>
  )
}

export default page