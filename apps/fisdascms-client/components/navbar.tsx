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
  HStack,
} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import shadowedBoxStyle from "../chakra-style-props/shadowed-box"
import { menu, Route } from "../core/lib/constants"
import { authService } from "../core/services/auth.service"
import fisdasCMSLogo from "../public/fisdascms-logo.svg"

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
          paddingLeft={6}
          alignItems="center"
          // {...shadowedBoxStyle}
          bgColor="gray.100"
          rounded="xl"
        >
          <Link href={Route.HOME}>
            <a>
              <HStack>
                <Image
                  src={fisdasCMSLogo}
                  width="24px"
                  height="24px"
                  alt="Fisdas CMS Logo"
                />
                <Heading size="md" color="blue.500">
                  Fisdas CMS
                </Heading>
              </HStack>
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
