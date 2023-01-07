import React from 'react'
import { motion } from "framer-motion"

type Props = {
    topic: string,
    category: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    keywords: string,
    onClick: () => void
    isLoading: boolean
}

const characterLimit: number = 60

export default function BrandyForm({ topic, category, keywords, onChange, onClick, isLoading }: Props) {
  return (
    <div className='px-3 pb-3 sm:px-10 flex flex-col'>
        <p className='mb-5 text-md text-center'>Tell me what type of catchy text you would like and I will generate you one. With extra keywords.</p>
        <label htmlFor='topic'>What is you business dealing with?
        <input id="topic" type="text" placeholder="e.g.: local street food restaurant with juicy burgers"
            name="topic" value={topic} onChange={onChange}
            className="w-full h-12 rounded-md p-3 mt-3 text-gray-900 bg-white border-3 border-gray-500 drop-shadow-md outline-none focus:ring-0"
        ></input>
        <div className='mb-2 mt-0.5 w-full flex justify-end'>
            <p className='mr-2 font-light'>{topic.length}/{characterLimit}</p>
        </div>
        </label>
        <label htmlFor='category'>Where do you want to create content?
        <input id="category" type="text" placeholder="e.g.: for Instagram caption"
            name="category" value={category} onChange={onChange}
            className="w-full h-12 rounded-md p-3 my-3 text-gray-900 bg-white border-3 border-gray-500 drop-shadow-md outline-none focus:ring-0"
        ></input>
        </label>
        <label htmlFor='keywords'>Do you have special keywords that must be included?
        <input id="keywords" type="text" placeholder="e.g.: juicy, fresh, also vegan"
            name="keywords" value={keywords} onChange={onChange}
            className="w-full h-12 rounded-md p-3 my-3 text-gray-900 bg-white border-3 border-gray-500 drop-shadow-md outline-none focus:ring-0"
        ></input>
        </label>
        <motion.button
            whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            disabled={topic.length > characterLimit}
            className="w-3/4 mx-auto my-3 py-3 outline-none bg-gradient-to-r from-cyan-600 to-blue-800 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-sm"
        >Submit</motion.button>
        {
            isLoading && (
                <motion.div
                    className=""
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                >Loading...</motion.div>
            )               
        }
    </div>  
  )
}
