import React from 'react'
import { easeInOut, motion } from "framer-motion"

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
    <div className='px-3 pb-3 sm:mx-3 sm:px-10 flex flex-col'>
        <p className='mb-8 sm:text-md text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-800'>Tell me what type of catchy text you want and I will generate you one.<br/>With extra keywords!</p>
        <label className='font-medium text-gray-200' htmlFor='topic'>What is you business dealing with?</label>
        <input id="topic" type="text" placeholder="e.g.: local street food restaurant with juicy burgers"
            name="topic" value={topic} onChange={onChange}
            className="font-light w-full h-12 rounded-md p-3 mt-3 text-gray-900 bg-white border-3 border-gray-500 drop-shadow-md outline-none focus:ring-0"
        ></input>
        <div className='mb-2 mt-0.5 w-full flex justify-end'>
            <p className='mr-2 font-light'>{topic.length}/{characterLimit}</p>
        </div>
        <label className='font-medium text-gray-200' htmlFor='category'>Where do you want to create content?</label>
        <input id="category" type="text" placeholder="e.g.: for Instagram caption"
            name="category" value={category} onChange={onChange}
            className="font-light w-full h-12 rounded-md p-3 my-3 text-gray-900 bg-white border-3 border-gray-500 drop-shadow-md outline-none focus:ring-0"
        ></input>
        <label className='font-medium text-gray-200' htmlFor='keywords'>Do you have special keywords that must be included?</label>
        <input id="keywords" type="text" placeholder="e.g.: juicy, fresh, also vegan"
            name="keywords" value={keywords} onChange={onChange}
            className="font-light w-full h-12 rounded-md p-3 my-3 text-gray-900 bg-white border-3 border-gray-500 drop-shadow-md outline-none focus:ring-0"
        ></input>
        <motion.button
            whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            disabled={topic.length > characterLimit}
            className="w-3/4 mx-auto my-3 py-3 outline-none bg-gradient-to-r from-cyan-600 to-blue-800 hover:bg-blue-700 disabled:opacity-40 focus:outline-none font-medium rounded-lg text-sm"
        >Submit</motion.button>
        {
            isLoading && (
                <div className='flex flex-row items-center sm:mt-3 py-2 gap-1'>
                <p className='mr-2'>Your response is being generated...</p>
                    {
                        [0,1,2].map(() => (
                            <motion.div
                                animate={{
                                    scale: [1, 1.5, 1.5, 1, 1],
                                    rotate: [0, 0, 180, 180, 0],
                                    borderRadius: ["20%", "30%", "40%", "50%", "20%"]
                                }}
                                transition={{
                                    duration: 2,
                                    ease: "easeInOut",
                                    times: [0, 0.2, 0.5, 0.8, 1],
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                                className='w-4 h-4 mx-1 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-800 hover:bg-blue-700'
                            />
                        ))
                    }
                </div>
            )               
        }
    </div>  
  )
}
