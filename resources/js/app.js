require('./bootstrap')
require('@fortawesome/fontawesome-free/js/solid')
// require('@fortawesome/fontawesome-free/js/brands')
require('@fortawesome/fontawesome-free/js/fontawesome')

const sidebar = require('./sidebar')
sidebar.handleShowHide()

const avatar = require('./avatar')
avatar.showHideProfileDropdown()

const visibilityToggler = require('./visibility-toggler')
visibilityToggler.handleOnOff()

const inputField = require('./input-field')
inputField.handleActiveInactive()

const assistantModal = require('./assistant-modal')
assistantModal.handleAddNewAssistant()
assistantModal.handleClose()
assistantModal.handleEditAssistant()
assistantModal.handleDeleteAssistant()