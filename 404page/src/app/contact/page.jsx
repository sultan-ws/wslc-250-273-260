import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>Contact page
        <div>
      <Link href='/'>Home</Link>
      <Link href='/about-us'>About</Link>
    </div>
    </div>
  )
}

export default page