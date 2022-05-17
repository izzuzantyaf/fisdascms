import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import { Route } from "../lib/constants"
import * as jwt from "jsonwebtoken"
import { Button, Container, Heading, Text, VStack } from "@chakra-ui/react"
import Link from "next/link"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context
  const admin = jwt.decode(req.cookies.jwt)
  console.log("Admin :", admin)
  if (!admin)
    return {
      redirect: {
        destination: Route.SIGN_IN,
      },
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
        <Text marginTop={4}>{admin.name}</Text>
        <Text>{admin.email}</Text>
        <Text>{admin.role}</Text>
        <VStack>
          <Link href={Route.CODE_OF_CONDUCT}>Tata Tertib</Link>
        </VStack>
        <Button onClick={handleSignOut} colorScheme="red">
          Keluar
        </Button>
      </Container>
    </>
  )
}

export default Home
