import React, { useState } from 'react'

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
    num_of_words: 20
  })

  const [description, setDescription] = useState<string>('')
  const [keywords, setKeywords] = useState<string[]>([])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setPrompts(prevState => ({ ...prevState, [name]: value}))
  }

  const onSubmit = async () => {
    console.log(prompts)

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
        console.log(BASE_URL + 'generate_branding_description_and_keywords');
        
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.log(error);
    }  
  }

  return (
    <>
      <h1>Brandy.io</h1>
      <p>Tell me what type of catchy text would you like and I will generate you one. With extra keywords.</p>
      <label htmlFor='topic'>What is you business dealing with?
        <input id="topic" type="text" placeholder="e.g.: local street food restaurant with juicy burgers"
          name="topic" value={prompts.topic} onChange={handleInputChange}
        ></input>
      </label>
      <br />
      <label htmlFor='category'>Where do you want to create content?
        <input id="category" type="text" placeholder="e.g.: for Instagram caption"
          name="category" value={prompts.category} onChange={handleInputChange}
        ></input>
      </label>
      <br />
      <label htmlFor='keywords'>Do you have special keywords that must be included?
        <input id="keywords" type="text" placeholder="e.g.: juicy, fresh, also vegan"
          name="keywords" value={prompts.keywords} onChange={handleInputChange}
        ></input>
      </label>
      <br />
      <button onClick={onSubmit}>Submit</button>
    </>
  )
}
