import type { GetServerSideProps, GetServerSidePropsResult, InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export const getServerSideProps : GetServerSideProps = async () => {
  const res = await fetch('https://fisdascms-redev.herokuapp.com/api/admin')
  const admins : [] = await res.json()
  return {
    props: { admins }
  }
}

const Home: NextPage = ({admins}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log('admins list : ')
  console.log(admins)
  return (<>
      <Head>
        <title>Fisdas CMS</title>
        <meta name="description" content="Website CMS Lab Fisika Dasar Tel-U" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
<div>
  Fisdas CMS
</div>
  </>
  )
}

export default Home
