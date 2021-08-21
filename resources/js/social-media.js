class SocialMedia {
  self = Array.from(document.querySelectorAll('.social-media-card'))
  hydrate() {
    this.#handleEditLink()
  }
  #handleEditLink() {
    this.self.forEach((socmedCard) => {
      const socmedLink = socmedCard.querySelector('.social-media-link')
      const linkInputField = socmedCard.querySelector('.social-media-link-input-field')
      const cancelEditLinkBtn = socmedCard.querySelector('.cancel-social-media-link-btn')
      const editLinkBtn = socmedCard.querySelector('.edit-social-media-link-btn')
      const saveLinkBtn = socmedCard.querySelector('.save-social-media-link-btn')
      // edit button clicked
      editLinkBtn.addEventListener('click', () => {
        // show link input field
        socmedLink.classList.add('hidden')
        linkInputField.classList.remove('hidden')
        cancelEditLinkBtn.classList.remove('hidden')
        // show save button
        editLinkBtn.classList.add('hidden')
        saveLinkBtn.classList.remove('hidden')
      })
      // if cancel button clicked then hide input field
      cancelEditLinkBtn.addEventListener('click', () => {
        // hide link input field
        socmedLink.classList.remove('hidden')
        linkInputField.classList.add('hidden')
        cancelEditLinkBtn.classList.add('hidden')
        // hide save button
        editLinkBtn.classList.remove('hidden')
        saveLinkBtn.classList.add('hidden')
      })
    })
  }
}
(new SocialMedia).hydrate()