import React from 'react'
import { motion } from "framer-motion"

type Props = {
    description: string,
    keywords: string[],
    onClick: () => void,
}

export default function BrandyResponse({ description, keywords, onClick }: Props) {
  return (
    <div className='container flex flex-col justify-center px-3 sm:pb-3 sm:mx-3 sm:px-10 mt-3'>
        <div className='bg-slate-200 text-black rounded-lg py-3 px-4 drop-shadow-md overflow-y-scroll max-h-60 scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-300'>
          <p  className='text-md font-semibold mb-3'>Your description:</p>
          <p className='font-light'>{description}</p>
        </div>
        <div className='bg-slate-200 text-black rounded-lg mt-5 py-3 px-4 drop-shadow-md overflow-y-scroll max-h-52 scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-300'>
          <p  className='text-md font-semibold mb-3'>Your hashtag keywords:</p>
          <div className='flex flex-row gap-2 flex-wrap'>
            {
                keywords.map((item: string) => (
                    <div className='bg-blue-300 p-2 rounded-lg'>
                      <p className='font-light text-slate-800' key={item}>{item}</p>
                    </div>
                ))
            }
          </div>
        </div>
        <motion.button
            whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className="w-2/3 md:w-2/5 mx-auto my-7 py-3 outline-none bg-gradient-to-r from-cyan-600 to-blue-800 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-sm"
        >Reset</motion.button>
    </div>
  )
}
