const sidebar = {
  self: document.querySelector('aside'),
  overlay: document.querySelector('.sidebar-overlay'),
  hamburgerMenu: document.querySelector('.hamburger-menu'),
  backBtn: document.querySelector('.back-btn'),
  hydrate() {
    if (this.overlay != null) {
      this.handleShowHide()
    }
  },
  show() {
    this.overlay.classList.remove('-translate-x-72')
    this.overlay.classList.remove('w-0')
    this.overlay.classList.replace('bg-opacity-0', 'bg-opacity-30')
  },
  hide() {
    this.overlay.classList.add('-translate-x-72')
    this.overlay.classList.add('w-0')
    this.overlay.classList.replace('bg-opacity-30', 'bg-opacity-0')
  },
  handleShowHide() {
    this.hamburgerMenu.addEventListener('click', () => {
      this.show()
    })
    this.backBtn.addEventListener('click', () => {
      this.hide()
    })
    this.overlay.addEventListener('click', (e) => {
      if (e.target != this.self)
        this.hide()
    })
  }
}
module.exports = sidebar