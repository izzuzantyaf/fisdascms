import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Flex,
  Spacer,
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
          boxShadow="md"
          rounded="lg"
          // border="1px"
          // borderColor="gray.300"
          // bgColor="gray.50"
          alignItems="center"
        >
          <Text fontWeight="bold">Fisdas CMS</Text>
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
