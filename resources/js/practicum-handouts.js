let editIcons = document.querySelectorAll('.edit-icon')
editIcons = Array.from(editIcons)
editIcons = editIcons.map((editIcon) => {
  const linkField = document.getElementById(editIcon.id)
  editIcon.addEventListener('click', () => {
    linkField.toggleAttribute('disabled')
    if (!linkField.hasAttribute('disabled'))
      linkField.parentElement.classList.add('border-blue-500')
    else
      linkField.parentElement.classList.remove('border-blue-500')
  })
})