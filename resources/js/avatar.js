const avatar = {
  self: document.querySelector('.avatar'),
  profileDropdown: document.querySelector('.profile-dropdown'),
  hydrate() {
    if (this.profileDropdown != null) {
      this.showHideProfileDropdown()
    }
  },
  showHideProfileDropdown() {
    this.self.addEventListener('click', () => {
      if (this.profileDropdown.classList.contains('scale-0'))
        this.profileDropdown.classList.replace('scale-0', 'scale-100')
      else
        this.profileDropdown.classList.replace('scale-100', 'scale-0')
    })
  }
}
module.exports = avatar