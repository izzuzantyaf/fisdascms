require('./bootstrap')
// require('@fortawesome/fontawesome-free/js/solid.min.js')
// require('@fortawesome/fontawesome-free/js/brands.min.js')
// require('@fortawesome/fontawesome-free/js/fontawesome.min.js')
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import {
  faUserCircle, faSignOutAlt, faUserAlt, faUniversity, faBook, faPager, faBalanceScale, faTasks, faPlay, faGamepad, faFile, faUsers, faCalendarMinus, faSitemap, faThumbsUp, faCheck, faSortNumericUpAlt, faCircleNotch, faParachuteBox, faBolt, faWaveSquare, faCalculator, faGripLinesVertical, faSatelliteDish, faMagnet, faPlug, faDrawPolygon, faPlus, faPencilAlt, faTrashAlt, faEye, faEyeSlash, faBars, faArrowLeft
} from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebook, faTwitter, faYoutube, faLine, faDiscord, faTelegramPlane, faTiktok, faLinkedin } from '@fortawesome/free-brands-svg-icons'

library.add(faUserCircle, faSignOutAlt, faUserAlt, faUniversity, faBook, faPager, faBalanceScale, faTasks, faPlay, faGamepad, faFile, faUsers, faCalendarMinus, faSitemap, faThumbsUp, faCheck, faSortNumericUpAlt, faCircleNotch, faParachuteBox, faBolt, faWaveSquare, faCalculator, faGripLinesVertical, faSatelliteDish, faMagnet, faPlug, faDrawPolygon, faPlus, faPencilAlt, faTrashAlt, faEye, faEyeSlash, faBars, faArrowLeft, faInstagram, faFacebook, faTwitter, faYoutube, faLine, faDiscord, faTelegramPlane, faTiktok, faLinkedin)
dom.watch()

const { pathname } = window.location

const sidebar = require('./sidebar')
sidebar.hydrate()

const avatar = require('./avatar')
avatar.hydrate()

const visibilityToggler = require('./visibility-toggler')
visibilityToggler.hydrate()

const successBanner = require('./success-banner')
successBanner.hydrate()

const adminProfilePage = require('./admin-profile')
adminProfilePage.hydrate()

if (pathname == '/assistant') {
  const assistant = require('./assistant')
  assistant.hydrate()
}

if (pathname == '/social-media') {
  const socialMediaCard = require('./social-media-card')
  socialMediaCard.hydrate()
}