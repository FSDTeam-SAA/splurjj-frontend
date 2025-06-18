"use client"
import React from 'react'

function page({params}: {params: {category_name: string}}) {
    console.log("PPPPPPPPPPPPPPPP", params.category_name);
  return (
    <div>page</div>
  )
}

export default page