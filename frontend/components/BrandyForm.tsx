import React from 'react'

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
    <>
        <p>Tell me what type of catchy text would you like and I will generate you one. With extra keywords.</p>
        <label htmlFor='topic'>What is you business dealing with?
        <input id="topic" type="text" placeholder="e.g.: local street food restaurant with juicy burgers"
            name="topic" value={topic} onChange={onChange}
        ></input>
        <div>{topic.length}/{characterLimit}</div>
        </label>
        <br />
        <label htmlFor='category'>Where do you want to create content?
        <input id="category" type="text" placeholder="e.g.: for Instagram caption"
            name="category" value={category} onChange={onChange}
        ></input>
        </label>
        <br />
        <label htmlFor='keywords'>Do you have special keywords that must be included?
        <input id="keywords" type="text" placeholder="e.g.: juicy, fresh, also vegan"
            name="keywords" value={keywords} onChange={onChange}
        ></input>
        </label>
        <br />
        <button
            onClick={onClick}
            disabled={topic.length > characterLimit}
        >Submit</button>
        {
            isLoading && <p>Loading...</p>
        }
    </>
  )
}
