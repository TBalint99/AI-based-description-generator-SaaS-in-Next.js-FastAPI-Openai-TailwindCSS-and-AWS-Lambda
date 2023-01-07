import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import BrandyMain from '../components/BrandyMain'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Brandy.io | AI Based Cotent Creator</title>
        <meta name="description" content="Content, description and branding text generator using artificial intelligence." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/brandy_logo_removedbg.ico" />
      </Head>
      <div className='h-screen bg-slate-800 text-white flex justify-center align-middle'>
        <BrandyMain />
      </div>
    </>
  )
}
