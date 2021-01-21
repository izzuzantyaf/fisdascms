const showOrHide = (element) => {
  if (element.classList.contains('hidden'))
    element.classList.replace('hidden', 'block')
  else
    element.classList.replace('block', 'hidden')
}

const hamburgerMenu = document.querySelector('.hamburger-menu')
const mobileMenu = document.querySelector('.mobile-menu')
hamburgerMenu.addEventListener('click', () => {
  showOrHide(mobileMenu)
})

const avatar = document.querySelector('.avatar')
const profileDropdown = document.querySelector('.profile-dropdown')
avatar.addEventListener('click', () => {
  showOrHide(profileDropdown)
})