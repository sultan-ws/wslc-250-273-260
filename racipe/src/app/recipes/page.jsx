'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [recipes, setRecipes] = useState([]);

    const fetchData = async()=>{
        const res = await fetch('https://dummyjson.com/recipes');
        const data = await res.json();
        console.log(data);

        setRecipes(data.recipes);
    }

    useEffect(()=>{fetchData()},[]);



  return (
    <>
    <div>
        <h1 className='text-center'>Recipes</h1>
        <div className='grid grid-cols-6 gap-2 p-[8px]'>
            {
                recipes.map((recipe)=>(
                   <Link href={`/recipes/${recipe.id}`}>
                     <div key={recipe.id} className='shadow-md cursor-pointer'>
                        <div>
                            <img src={recipe.image} alt="thumbnail" />
                        </div>
                        <h2 className='text-center'>{recipe.name}</h2>
                    </div>
                   </Link>
                ))
            }
        </div>
    </div>
    </>
  )
}

export default page