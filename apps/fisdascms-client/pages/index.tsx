import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Route } from '../lib/constants'

export const getServerSideProps = async ({req,res}:{req:any,res:any}) => {
  if(!req.cookies.jwt)
    return {
      redirect:{
        destination:'/auth/signin'
      }
    }
  return {
    props:{
      data:{}
    }
  }
}

const Home: NextPage = () => {
  return <>
      <Head>
        <title>Fisdas CMS</title>
        <meta name="description" content="Website CMS Lab Fisika Dasar Tel-U" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <p>Fisdas CMS</p>
        <Link href={Route.SIGN_IN}>to login</Link>
        <button onClick={e => {
          document.cookie="jwt=; path=/"
          window.location.reload()
        }}>Keluar</button>
      </div>
  </>
}

export default Home
