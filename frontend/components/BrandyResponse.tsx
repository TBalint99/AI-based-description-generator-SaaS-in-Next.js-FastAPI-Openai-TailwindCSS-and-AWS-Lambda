import React from 'react'

type Props = {
    description: string,
    keywords: string[],
    onClick: () => void,
}

export default function BrandyResponse({ description, keywords, onClick }: Props) {
  return (
    <>
        <p>{description}</p>
        {
            keywords.map((item: string) => (
                <p key={item}>{item}</p>
            ))
        }
        <button onClick={onClick}>Reset</button>
    </>
  )
}
