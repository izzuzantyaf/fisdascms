const visibilityToggler = {
  visibilityTogglers: Array.from(document.querySelectorAll('.visibility-toggler')),
  handleOnOff() {
    this.visibilityTogglers.forEach((toggler) => {
      const visibilityInput = toggler.querySelector('input#' + toggler.id)
      toggler.addEventListener('click', () => {
        if (parseInt(visibilityInput.value)) {
          visibilityInput.value = 0
          toggler.classList.replace('bg-green-500', 'bg-gray-300')
          toggler.classList.remove('justify-end')
        }
        else {
          visibilityInput.value = 1
          toggler.classList.replace('bg-gray-300', 'bg-green-500')
          toggler.classList.add('justify-end')
        }
      })
    })
  }
}
module.exports = visibilityToggler