import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { library } from "@fortawesome/fontawesome-svg-core"
// prettier-ignore
import { faArrowLeft, faArrowRight, faArrowRightFromBracket, faBalanceScale, faBook, faCalendarMinus, faFile, faGamepad, faPager, faPlay, faSitemap, faTasks, faThumbsUp, faUser, faUsers, faUserSecret } from "@fortawesome/free-solid-svg-icons"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false
// prettier-ignore
library.add(faUserSecret, faUser, faArrowRightFromBracket, faPager, faBalanceScale, faBook, faTasks, faPlay, faGamepad, faFile, faUsers, faCalendarMinus, faSitemap, faThumbsUp, faArrowLeft, faArrowRight)

const customizedTheme = extendTheme({
  fonts: {
    body: "Inter, Heebo, system-ui, sans-serif",
    heading: "Inter, Heebo, system-ui, sans-serif",
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customizedTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
