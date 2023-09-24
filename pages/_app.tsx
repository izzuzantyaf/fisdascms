import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react"
import { library } from "@fortawesome/fontawesome-svg-core"
// prettier-ignore
import { faArrowLeft, faArrowRight, faArrowRightFromBracket, faArrowUpRightFromSquare, faBalanceScale, faBars, faBolt, faBook, faBowlingBall, faCalculator, faCalendarMinus, faChessPawn, faChessQueen, faCircleInfo, faCircleNotch, faDrawPolygon, faEye, faEyeSlash, faFile, faFolderOpen, faGamepad, faGripLinesVertical, faHurricane, faLanguage, faMagnet, faMagnifyingGlass, faMars, faPager, faParachuteBox, faPen, faPlay, faPlug, faPlus, faSatelliteDish, faSitemap, faSortNumericUpAlt, faTasks, faThumbsUp, faTrashCan, faUser, faUsers, faUserSecret, faVenus, faWaveSquare } from "@fortawesome/free-solid-svg-icons"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { faLine } from "@fortawesome/free-brands-svg-icons"
import { AssistantProvider } from "../contexts/assistant.context"
import { AuthProvider } from "../contexts/auth.context"
config.autoAddCss = false
// prettier-ignore
library.add(faUserSecret, faUser, faArrowRightFromBracket, faPager, faBalanceScale, faBook, faTasks, faPlay, faGamepad, faFile, faUsers, faCalendarMinus, faSitemap, faThumbsUp, faArrowLeft, faArrowRight, faBars, faFolderOpen, faSortNumericUpAlt, faCircleNotch, faParachuteBox, faBolt, faWaveSquare, faCalculator, faGripLinesVertical, faSatelliteDish, faMagnet, faPlug, faDrawPolygon, faEye, faEyeSlash, faArrowUpRightFromSquare, faMagnifyingGlass, faPen, faMars, faVenus, faPlus, faTrashCan, faLine, faChessPawn, faChessQueen, faLanguage, faCircleInfo, faBowlingBall, faHurricane)

const customizedTheme = extendTheme({
  fonts: {
    body: "Inter, Heebo, system-ui, sans-serif",
    heading: "Inter, Heebo, system-ui, sans-serif",
  },
  components: {
    Container: {
      baseStyle: {
        maxWidth: "container.lg",
      },
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AssistantProvider>
        <ChakraProvider theme={customizedTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AssistantProvider>
    </AuthProvider>
  )
}

export default MyApp
