const sidebar = {
  hamburgerMenu: document.querySelector('.hamburger-menu'),
  backBtn: document.querySelector('.back-btn'),
  self: document.querySelector('.sidebar'),
  handleShowHide() {
    this.hamburgerMenu.addEventListener('click', () => {
      this.self.classList.remove('-translate-x-72')
    })
    this.backBtn.addEventListener('click', () => {
      this.self.classList.add('-translate-x-72')
    })
  }
}
module.exports = sidebar