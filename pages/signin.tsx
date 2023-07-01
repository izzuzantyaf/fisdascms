import Head from "next/head"
import { useState } from "react"
import * as jose from "jose"
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { authService } from "../core/services/auth.service"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import fisdasCMSLogo from "../public/fisdascms-logo.svg"
import Image from "next/image"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignInLoading, setIsSignInLoading] = useState(false)
  const [isPasswordShowed, setIsPasswordShowed] = useState(false)

  const toast = useToast()

  const isAbleToSubmit = email && password ? true : false

  const handleSignIn = async () => {
    setIsSignInLoading(true)
    const signInResponse = await authService.signIn(email, password)
    setIsSignInLoading(false)
    if (!signInResponse.isSuccess) {
      toast({ title: signInResponse.message, status: "error" })
      return
    }
    const { access_token } = signInResponse.data
    const decodedJwt: any = jose.decodeJwt(access_token)
    document.cookie = `jwt=${access_token}; expires=${new Date(
      decodedJwt?.exp * 1000
    ).toUTCString()}; path=/`
    location.href = location.origin
    return
  }

  return (
    <>
      <Head>
        <title>Masuk | Fisdas CMS</title>
      </Head>

      <Center h="100vh">
        <Container maxWidth="xs">
          <HStack spacing="4" marginBottom="2">
            <Image src={fisdasCMSLogo} width="32px" alt="Fisdas CMS Logo" />
            <Heading size="lg" color="blue.600">
              Fisdas CMS
            </Heading>
          </HStack>

          <Heading size="md" marginBottom="4">
            Masuk
          </Heading>

          <form>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e: any) => {
                    setEmail(e.target.value)
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    placeholder="Password"
                    type={isPasswordShowed ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e: any) => {
                      setPassword(e.target.value)
                    }}
                  />
                  <InputRightElement>
                    <Icon
                      cursor="pointer"
                      color={isPasswordShowed ? "black" : "gray.500"}
                      onClick={() => setIsPasswordShowed(!isPasswordShowed)}
                    >
                      <FontAwesomeIcon
                        icon={isPasswordShowed ? faEye : faEyeSlash}
                      />
                    </Icon>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                isLoading={isSignInLoading}
                isDisabled={!isAbleToSubmit}
                colorScheme="blue"
                w="100%"
                onClick={(e: any) => {
                  e.preventDefault()
                  handleSignIn()
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
