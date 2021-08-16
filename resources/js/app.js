require('./bootstrap')
require('@fortawesome/fontawesome-free/js/solid.min.js')
require('@fortawesome/fontawesome-free/js/brands.min.js')
require('@fortawesome/fontawesome-free/js/fontawesome.min.js')

const { pathname } = window.location

const sidebar = require('./sidebar')
sidebar.handleShowHide()

const avatar = require('./avatar')
avatar.showHideProfileDropdown()

const visibilityToggler = require('./visibility-toggler')
visibilityToggler.handleOnOff()

const successBanner = require('./success-banner')
successBanner.hydrate()

if (pathname == '/assistant') {
  const assistant = require('./assistant')
  assistant.hydrate()
}

if (pathname == '/social-media') {
  const socialMediaCard = require('./social-media-card')
  socialMediaCard.hydrate()
}