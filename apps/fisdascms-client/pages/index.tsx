import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import { Route } from "../lib/constants"
import * as jwt from "jsonwebtoken"
import { Button, Container, Heading, Text } from "@chakra-ui/react"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context
  let admin = undefined
  try {
    admin = jwt.verify(req.cookies.jwt, process.env.NEXT_PUBLIC_JWT_SECRET)
  } catch (error) {
    return {
      redirect: {
        destination: Route.SIGN_IN,
      },
    }
  }
  console.log("Admin :", admin)
  return {
    props: {
      admin,
    },
  }
}

const Home = ({
  admin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const handleSignOut = () => {
    document.cookie = "jwt=; path=/"
    location.reload()
  }

  return (
    <>
      <Head>
        <title>Fisdas CMS</title>
        <meta name="description" content="Website CMS Lab Fisika Dasar Tel-U" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="container.xl">
        <Heading>Dashboard</Heading>
        <Text>{admin.name}</Text>
        <Text>{admin.email}</Text>
        <Text>{admin.role}</Text>
        <Button onClick={handleSignOut} colorScheme="red">
          Keluar
        </Button>
      </Container>
    </>
  )
}

export default Home
