let editIcons = document.querySelectorAll('.edit-icon')
editIcons = Array.from(editIcons)
editIcons = editIcons.map((editIcon) => {
  const linkField = document.getElementById(editIcon.id)
  editIcon.addEventListener('click', () => {
    linkField.toggleAttribute('disabled')
  })
})