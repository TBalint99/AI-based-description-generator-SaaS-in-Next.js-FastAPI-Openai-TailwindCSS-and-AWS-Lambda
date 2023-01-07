import React, { useState } from 'react'
import BrandyForm from './BrandyForm'
import BrandyGlass from './BrandyGlass'
import BrandyResponse from './BrandyResponse'

interface FormState {
  topic: string,
  category: string,
  keywords: string,
  num_of_words: number
}

const BASE_URL: string = 'https://k65ef77751.execute-api.eu-central-1.amazonaws.com/prod/'

export default function BrandyMain() {

  const [prompts, setPrompts] = useState<FormState>({
    topic: "",
    category: "",
    keywords: "",
    num_of_words: 25
  })

  const [description, setDescription] = useState<string>('')
  const [keywords, setKeywords] = useState<string[]>([])
  const [hasResult, setHasResult] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setPrompts(prevState => ({ ...prevState, [name]: value}))
  }

  const onSubmit = async () => {

    setIsLoading(true)
    const json_string = JSON.stringify(prompts)
    
    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: json_string
    }

    try {
      const response = await fetch(BASE_URL + 'generate_branding_description_and_keywords', requestOptions)
      const data = await response.json()
      //console.log(data)
      formatResponse(data)
    } catch (error) {
      console.log(error);
    }  
  }

  const formatResponse = (data: any) => {
    setDescription(data.description)
    setKeywords(data.keywords[0])
    setIsLoading(false)
    setHasResult(true)  
  }

  const handleReset = () => {
    setHasResult(false)
    setDescription('')
    setKeywords([])
  }

  return (
    <div className='m-auto bg-slate-400 w-10/12 md:w-6/12 rounded-lg'>
      <h1 className='text-3xl text-center mt-5 mb-1'>Brandy.io</h1>
      {
        hasResult ?
        <BrandyResponse
          description={description}
          keywords={keywords}
          onClick={handleReset}
        /> :
        <BrandyForm
          topic={prompts.topic}
          category={prompts.category}
          keywords={prompts.keywords}
          onChange={handleInputChange}
          onClick={onSubmit}
          isLoading={isLoading}
        />
      }
    </div>
  )
}
