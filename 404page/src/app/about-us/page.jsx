import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <h1>About page</h1>
        <div>
      <Link href='/contact'>Contact</Link>
      <Link href='/'>Home</Link>
    </div>
    </div>
  )
}

export default page