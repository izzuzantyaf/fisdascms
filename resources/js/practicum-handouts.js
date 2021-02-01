let editIcons = document.querySelectorAll('.edit-icon')
editIcons = Array.from(editIcons)
editIcons = editIcons.map((editIcon) => {
  const linkField = editIcon.parentElement.querySelector('input#' + editIcon.id)
  editIcon.addEventListener('click', () => {
    linkField.toggleAttribute('disabled')
    if (!linkField.hasAttribute('disabled'))
      linkField.parentElement.classList.add('border-blue-500')
    else
      linkField.parentElement.classList.remove('border-blue-500')
  })
})

let visibilityTogglers = document.querySelectorAll('.visibility-toggler')
visibilityTogglers = Array.from(visibilityTogglers)
visibilityTogglers = visibilityTogglers.map((toggler) => {
  const visibilityInput = toggler.querySelector('input#' + toggler.id)

  toggler.addEventListener('click', () => {
    visibilityInput.toggleAttribute('disabled')
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