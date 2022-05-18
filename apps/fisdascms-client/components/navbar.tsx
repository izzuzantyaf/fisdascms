import {
  Container,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  Spacer,
  Heading,
} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Route } from "../lib/constants"
import { authService } from "../services/auth"

export default function Navbar() {
  const handleSignOut = () => {
    authService.signOut()
    location.href = location.origin + Route.SIGN_IN
  }

  return (
    <>
      <Container paddingY={4} maxWidth="container.lg">
        <Flex
          padding={2}
          paddingX={4}
          boxShadow="md"
          rounded="xl"
          bgColor="white"
          alignItems="center"
          borderWidth="1px"
          borderBottomWidth="0"
          borderColor="gray.100"
        >
          <Heading size="md" color="blue.500">
            Fisdas CMS
          </Heading>
          <Spacer />
          <Menu autoSelect={false} direction="rtl">
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<FontAwesomeIcon icon="user" />}
              // variant="outline"
              borderRadius="full"
            />
            <MenuList>
              <MenuItem
                icon={<FontAwesomeIcon icon="arrow-right-from-bracket" />}
                color="red.500"
                bgColor="red.50"
                onClick={handleSignOut}
              >
                Keluar
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Container>
    </>
  )
}
