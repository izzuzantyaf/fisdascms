import Head from "next/head";
import { useState } from "react";
import * as jwt from 'jsonwebtoken'

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
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={async (e) => {
          e.preventDefault()
          const data = await signIn(email,password)
          if(data.isSuccess){
            const {access_token} = data.authenticatedAdmin
            const decodedJwt:any = jwt.decode(access_token)
            document.cookie = `jwt=${access_token}; expires=${new Date(decodedJwt?.exp*1000).toUTCString()}; path=/`
            setAdmin(data.authenticatedAdmin)
          }
        }}>Masuk</button>
      </form>
      <div className="admin">
        <p>{admin?.name}</p>
        <p>{admin?.email}</p>
        <p>{admin?.role}</p>
      </div>
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