import Head from "next/head"
import { useState } from "react"
import * as jose from "jose"
import {
  Button,
  Center,
  Container,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { authService } from "../core/services/auth.service"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
                onChange={(e: any) => {
                  setEmail(e.target.value)
                }}
              />
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
                      icon={isPasswordShowed ? "eye" : "eye-slash"}
                    />
                  </Icon>
                </InputRightElement>
              </InputGroup>

              <Button
                type="submit"
                isLoading={isSignInLoading}
                isDisabled={!isAbleToSubmit}
                colorScheme="blue"
                w="100%"
                onClick={async (e: any) => {
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
