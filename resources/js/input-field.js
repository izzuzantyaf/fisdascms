const inputField = {
  editIcons: Array.from(document.querySelectorAll('.edit-icon')),
  handleActiveInactive() {
    this.editIcons.forEach((editIcon) => {
      const linkField = editIcon.parentElement.querySelector('input#' + editIcon.id)
      editIcon.addEventListener('click', () => {
        linkField.toggleAttribute('disabled')
        if (!linkField.hasAttribute('disabled'))
          linkField.parentElement.classList.add('border-blue-500')
        else
          linkField.parentElement.classList.remove('border-blue-500')
      })
    })
  }
}
module.exports = inputField