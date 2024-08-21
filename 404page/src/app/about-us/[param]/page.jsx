'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
   const {param} =  useParams();
   console.log(param);
  return (
    <div>Param page</div>
  )
}

export default page