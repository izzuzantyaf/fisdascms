import Head from "next/head"
import { useState } from "react"
import * as jwt from "jsonwebtoken"
import Link from "next/link"
import { Route } from "../../lib/constants"
import { GetServerSideProps, GetServerSidePropsResult } from "next"
import {
  Button,
  Center,
  Container,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react"

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.req.cookies.jwt)
    return {
      redirect: {
        destination: Route.HOME,
      },
    }
  return {
    props: {},
  }
}

const SignInPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [admin, setAdmin] = useState<any>()
  const [isSignInLoading, setIsSignInLoading] = useState(false)

  const toast = useToast()

  const isAbleToSubmit = () => (email && password ? true : false)

  const handleSignIn = async (email: string, password: string) => {
    setIsSignInLoading(true)
    const signInResponse = await signIn(email, password)
    setIsSignInLoading(false)
    if (!signInResponse.isSuccess) {
      toast({ title: signInResponse.message, status: "error" })
      return
    }
    const { access_token } = signInResponse.data
    const decodedJwt: any = jwt.decode(access_token)
    document.cookie = `jwt=${access_token}; expires=${new Date(
      decodedJwt?.exp * 1000
    ).toUTCString()}; path=/`
    location.href = location.origin
    return
  }

  return (
    <>
      <Head>
        <title>Fisdas CMS</title>
        <meta name="description" content="Website CMS Lab Fisika Dasar Tel-U" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center h="100vh">
        <Container maxW="xs">
          <Heading size="lg" marginBottom={4}>
            Fisdas CMS
          </Heading>
          <form>
            <VStack spacing={4}>
              <Input
                placeholder="Email"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <Input
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <Button
                type="submit"
                isLoading={isSignInLoading}
                isDisabled={!isAbleToSubmit()}
                colorScheme="blue"
                w="100%"
                onClick={async (e) => {
                  e.preventDefault()
                  handleSignIn(email, password)
                }}
              >
                Masuk
              </Button>
            </VStack>
          </form>
        </Container>
      </Center>
    </>
  )
}
export default SignInPage

const signIn = async (email: string, password: string) => {
  const res = await fetch("https://fisdascms-redev.herokuapp.com/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: email, password }),
  })
  const signInResponse = await res.json()
  console.log(signInResponse)
  return signInResponse
}
