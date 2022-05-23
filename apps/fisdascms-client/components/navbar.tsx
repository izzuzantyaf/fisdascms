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
import Link from "next/link"
import shadowedBoxStyle from "../chakra-style-props/shadowed-box"
import { menu, Route } from "../lib/constants"
import { authService } from "../services/auth"

export default function Navbar() {
  const handleSignOut = () => {
    authService.signOut()
    location.href = location.origin + Route.SIGN_IN
  }

  return (
    <>
      <Container paddingTop={4} maxWidth="container.lg">
        <Flex
          padding={2}
          paddingX={4}
          alignItems="center"
          {...shadowedBoxStyle}
        >
          <Link href={Route.HOME}>
            <a>
              <Heading size="md" color="blue.500">
                Fisdas CMS
              </Heading>
            </a>
          </Link>
          <Spacer />
          <Menu autoSelect={false} direction="rtl">
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<FontAwesomeIcon icon="bars" />}
              variant="ghost"
            />
            <MenuList>
              {/* {menu.map((menu) => (
                <MenuItem
                  icon={<FontAwesomeIcon icon={menu.faIconName} />}
                  // color="red.500"
                  // bgColor="red.50"
                >
                  {menu.name}
                </MenuItem>
              ))} */}
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
