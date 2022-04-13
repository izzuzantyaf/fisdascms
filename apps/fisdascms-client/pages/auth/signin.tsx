import Head from "next/head";
import { useState } from "react";
import * as jwt from 'jsonwebtoken'
import Link from "next/link";
import { Route } from "../../lib/constants";

export const getServerSideProps = async ({req, res}:{req:any,res:any}) => {
  if(req.cookies.jwt)
    return {
      redirect:{
        destination: Route.HOME
      }
    }
  return {
    props:{
      data:{}
    }
  }
}

const SignInPage = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [admin, setAdmin] = useState<any>()

  return (
    <>
      <Head>
        <title>Fisdas CMS</title>
        <meta name="description" content="Website CMS Lab Fisika Dasar Tel-U" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/">to home</Link>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={async (e) => {
          e.preventDefault()
          const data = await signIn(email,password)
        }}>Masuk</button>
      </form>
    </>
  );
};
export default SignInPage;

const signIn = async (email:string, password:string) => {
  const res = await fetch('https://fisdascms-redev.herokuapp.com/auth/signin',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({username: email, password})
  })
  const data = await res.json()
  console.log(data)
  if(!data.isSuccess) return;
  const {access_token} = data.authenticatedAdmin
  const decodedJwt:any = jwt.decode(access_token)
  document.cookie = `jwt=${access_token}; expires=${new Date(decodedJwt?.exp*1000).toUTCString()}; path=/`
  window.location.reload()
  return data
}

const getCookie = (key: string) => {
  const currentCookieString = document.cookie
  const currentCookie = currentCookieString.split('; ').reduce((cookieObj:any, cur) => {
    if(cur){
      const [k,v] = cur.split('=')
      cookieObj[k] = v
    }
    return cookieObj
  },{})
  return currentCookie[key]
}