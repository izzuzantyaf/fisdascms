class AdminProfilePage {
  #page = document.querySelector('.admin-profile')
  #editBtn = this.#page?.querySelector('.edit-btn')
  #deleteBtn = this.#page?.querySelector('.delete-btn')
  #deleteModal = this.#page?.querySelector('.delete-modal-overlay')
  #cancelBtn = this.#deleteModal?.querySelector('.cancel-btn')
  hydrate() {
    if (this.#page != null) {
      this.#handleEdit()
      this.#handleDelete()
    }
  }
  #handleEdit() {
    this.#editBtn.addEventListener('click', () => {
      // hide all non edit elements
      const nonEditElems = Array.from(this.#page.querySelectorAll('.non-edit-el'))
      for (const element of nonEditElems) {
        element.classList.add('hidden')
      }
      // show all edit elements
      const EditElems = Array.from(this.#page.querySelectorAll('.edit-el'))
      for (const element of EditElems) {
        element.classList.remove('hidden')
      }
    })
  }
  #handleDelete() {
    this.#deleteModal.addEventListener('click', (e) => {
      if (e.target == this.#cancelBtn || e.target == this.#deleteModal)
        this.#deleteModal.classList.replace('flex', 'hidden')
    })
    this.#deleteBtn.addEventListener('click', () => {
      this.#deleteModal.classList.replace('hidden', 'flex')
    })
  }
}
module.exports = new AdminProfilePage