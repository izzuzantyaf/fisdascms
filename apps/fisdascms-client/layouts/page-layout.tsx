import { Button, Container, IconButton } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Breadcrump from "../components/breadcrump"
import Navbar from "../components/navbar"

export default function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      <Container maxWidth="container.lg" paddingBottom="4">
        {/* <Breadcrump /> */}
        {/* <IconButton
          aria-label="back"
          variant="ghost"
          icon={<FontAwesomeIcon icon="arrow-left" />}
          // fontWeight="normal"
          onClick={() => {
            history.back()
          }}
        ></IconButton> */}
        {children}
      </Container>
    </>
  )
}
