import Head from "next/head"
import { menu } from "../core/lib/constants"
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
import shadowedBoxStyle from "../chakra-style-props/shadowed-box"

export default function Home() {
  return (
    <>
      <Head>
        <title>Fisdas CMS</title>
      </Head>
      <Box bgColor="gray.50" minHeight="100vh" paddingBottom="16px">
        <Navbar />
        <Container>
          <Heading marginTop={4}>Dashboard</Heading>
          <SimpleGrid columns={[2, 3, 4]} spacing={4} marginTop={4}>
            {menu.map((menu, index) => (
              <Link href={menu.route} key={index}>
                <a>
                  <Box padding="4" {...shadowedBoxStyle}>
                    <Square
                      fontSize="xl"
                      bgColor="blue.50"
                      color="blue.500"
                      size="48px"
                      borderRadius="full"
                    >
                      <FontAwesomeIcon icon={menu.faIconName} />
                    </Square>
                    <Text
                      marginTop="8px"
                      fontSize="lg"
                      whiteSpace="nowrap"
                      overflowX="hidden"
                      textOverflow="ellipsis"
                    >
                      {menu.name}
                    </Text>
                  </Box>
                </a>
              </Link>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </>
  )
}
