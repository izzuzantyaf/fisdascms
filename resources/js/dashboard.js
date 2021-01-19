const hamburgerMenu = document.querySelector('.hamburger-menu')
const mobileMenu = document.querySelector('.mobile-menu')
hamburgerMenu.addEventListener('click', () => {
  if (mobileMenu.classList.contains('hidden'))
    mobileMenu.classList.replace('hidden', 'block')
  else
    mobileMenu.classList.replace('block', 'hidden')
})