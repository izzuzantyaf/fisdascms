import { Box, Container } from "@chakra-ui/react"
import Navbar from "../components/navbar"

export default function PageLayout({ children }) {
  return (
    <>
      <Box bgColor="gray.50" minHeight="100vh" minWidth="256px">
        <Navbar />
        <Container paddingBottom="4">
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
      </Box>
    </>
  )
}
