import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import { menu, Route } from "../lib/constants"
import * as jwt from "jsonwebtoken"
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Square,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"
import Navbar from "../components/navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const admin = jwt.decode(context.req.cookies.jwt)
  console.log("Admin :", admin)
  if (!admin)
    return {
      redirect: {
        destination: Route.SIGN_IN,
      },
    }
  return {
    props: {
      admin,
    },
  }
}

export default function Home({
  admin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Fisdas CMS</title>
      </Head>
      <Navbar></Navbar>
      <Container maxWidth="container.lg">
        <Heading marginTop={4}>Dashboard</Heading>
        <SimpleGrid columns={[2, 3, 4]} spacing={4} marginTop={4}>
          {menu.map((menu, index) => (
            <Link href={menu.route} key={index}>
              <a>
                <Box
                  bgColor="white"
                  borderWidth="1px"
                  borderBottomWidth="0"
                  borderColor="gray.100"
                  boxShadow="md"
                  padding={4}
                  rounded="xl"
                >
                  <Square
                    fontSize="xl"
                    bgColor="blue.50"
                    color="blue.500"
                    size="40px"
                    borderRadius="full"
                  >
                    <FontAwesomeIcon icon={menu.faIconName} />
                  </Square>
                  <Text>{menu.name}</Text>
                </Box>
              </a>
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}
