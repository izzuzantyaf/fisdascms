const hamburgerMenu = document.querySelector('.hamburger-menu')
const backBtn = document.querySelector('.back-btn')
const sidebar = document.querySelector('.sidebar')
hamburgerMenu.addEventListener('click', () => {
  sidebar.classList.remove('-translate-x-72')
})
backBtn.addEventListener('click', () => {
  sidebar.classList.add('-translate-x-72')
})

const avatar = document.querySelector('.avatar')
const profileDropdown = document.querySelector('.profile-dropdown')
avatar.addEventListener('click', () => {
  if (profileDropdown.classList.contains('scale-0'))
    profileDropdown.classList.replace('scale-0', 'scale-100')
  else
    profileDropdown.classList.replace('scale-100', 'scale-0')
})