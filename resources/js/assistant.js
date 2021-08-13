class AssistantModal {
  #self = document.querySelector('.assistant-modal-overlay')
  constructor() {
    this.#handleClose()
  }
  show() {
    this.#self.classList.replace('hidden', 'flex')
  }
  close() {
    this.#self.classList.replace('flex', 'hidden')
  }
  #handleClose() {
    this.#self.addEventListener('click', (e) => {
      const closeAssistantModalBtn = this.#self.querySelector('.close-assistant-modal')
      // close the modal if overlay or cancel button is clicked
      if (e.target === this.#self || e.target === closeAssistantModalBtn)
        this.close()
    })
  }
  fillData(method = 'POST', assistant = null) {
    this.#self.querySelector('form').action = `/assistants${method == 'PUT' || method == 'DELETE' ? `/${assistant.id}` : ''}`
    this.#self.querySelector('input[name="_method"]').value = method
    if (method == 'PUT')
      this.#self.querySelector('.title').innerHTML = 'Edit Asisten'
    else if (method == 'DELETE')
      this.#self.querySelector('.title').innerHTML = 'Hapus Asisten'
    else
      this.#self.querySelector('.title').innerHTML = 'Tambah Asisten'
    this.#self.querySelector('input[name=assistant_name]').value = method == 'PUT' || method == 'DELETE' ? assistant.name : null
    this.#self.querySelector('input[name=assistant_code]').value = method == 'PUT' || method == 'DELETE' ? assistant.code : null
    this.#self.querySelector('input[name=assistant_phone]').value = method == 'PUT' || method == 'DELETE' ? assistant.phone : null
    this.#self.querySelector('input[name=assistant_line_id]').value = method == 'PUT' || method == 'DELETE' ? assistant.lineId : null
    this.#self.querySelector('input[name=assistant_feedback_link]').value = method == 'PUT' || method == 'DELETE' ? assistant.feedbackLink : null
  }
  adjustTheme(operation = 'default') {
    if (operation == 'red') {
      this.#self.querySelector('.title').classList.add('text-red-600')
      this.#self.querySelector('button[type=submit]').innerHTML = 'Hapus'
      this.#self.querySelector('button[type=submit]').classList.replace('bg-blue-600', 'bg-red-600')
      this.#self.querySelector('button[type=submit]').classList.replace('hover:bg-blue-700', 'hover:bg-red-700')
    } else {
      this.#self.querySelector('.title').classList.remove('text-red-600')
      this.#self.querySelector('button[type=submit]').innerHTML = 'Simpan'
      this.#self.querySelector('button[type=submit]').classList.replace('bg-red-600', 'bg-blue-600')
      this.#self.querySelector('button[type=submit]').classList.replace('hover:bg-red-700', 'hover:bg-blue-700')
    }
  }
  enableInputField(enabled = true) {
    if (enabled) {
      this.#self.querySelector('input[name=assistant_name]').removeAttribute('disabled')
      this.#self.querySelector('input[name=assistant_code]').removeAttribute('disabled')
      this.#self.querySelector('input[name=assistant_phone]').removeAttribute('disabled')
      this.#self.querySelector('input[name=assistant_line_id]').removeAttribute('disabled')
      this.#self.querySelector('input[name=assistant_feedback_link]').removeAttribute('disabled')
    } else {
      this.#self.querySelector('input[name=assistant_name]').setAttribute('disabled', 'true')
      this.#self.querySelector('input[name=assistant_code]').setAttribute('disabled', 'true')
      this.#self.querySelector('input[name=assistant_phone]').setAttribute('disabled', 'true')
      this.#self.querySelector('input[name=assistant_line_id]').setAttribute('disabled', 'true')
      this.#self.querySelector('input[name=assistant_feedback_link]').setAttribute('disabled', 'true')
    }
  }
}

class Assistant {
  #assistantModal = new AssistantModal
  #addNewAssistantBtn = document.querySelector('.add-assistant-btn')
  #editAssistantBtns = Array.from(document.querySelectorAll('.edit-assistant-icon'))
  #deleteAssistantBtns = Array.from(document.querySelectorAll('.delete-assistant-icon'))
  hydrate() {
    this.#handleAddNewAssistant()
    for (let i = 0; i < this.#editAssistantBtns.length; i++) {
      const editBtn = this.#editAssistantBtns[i]
      const deleteBtn = this.#deleteAssistantBtns[i]
      // grab assistant data
      const id = editBtn.parentElement.parentElement.querySelector('input[name=assistant_id]').value
      const name = editBtn.parentElement.parentElement.querySelector('.assistant-name').innerText
      const code = editBtn.parentElement.parentElement.querySelector('.assistant-code').innerText
      const phone = editBtn.parentElement.parentElement.querySelector('.assistant-phone').innerText
      const lineId = editBtn.parentElement.parentElement.querySelector('.assistant-line-id').innerText
      const feedbackLink = editBtn.parentElement.parentElement.querySelector('.assistant-feedback-link').innerText
      // add listener to edit and delete button
      this.#handleEditAssistant(editBtn, { id, name, code, phone, lineId, feedbackLink })
      this.#handleDeleteAssistant(deleteBtn, { id, name, code, phone, lineId, feedbackLink })
    }
  }
  #handleAddNewAssistant() {
    // if add new assistant button clicked then show the modal
    this.#addNewAssistantBtn.addEventListener('click', () => {
      this.#assistantModal.enableInputField()
      this.#assistantModal.fillData()
      this.#assistantModal.adjustTheme()
      this.#assistantModal.show()
    })
  }
  #handleEditAssistant(btn, { id, name, code, phone, lineId, feedbackLink }) {
    // if edit button clicked then show the modal populated with assistant's data
    btn.addEventListener('click', () => {
      this.#assistantModal.enableInputField()
      this.#assistantModal.fillData('PUT', { id, name, code, phone, lineId, feedbackLink })
      this.#assistantModal.adjustTheme()
      this.#assistantModal.show()
    })
  }
  #handleDeleteAssistant(btn, { id, name, code, phone, lineId, feedbackLink }) {
    // if delete button clicked then show the modal populated with assistant's data
    btn.addEventListener('click', () => {
      this.#assistantModal.fillData('DELETE', { id, name, code, phone, lineId, feedbackLink })
      this.#assistantModal.enableInputField(false)
      this.#assistantModal.adjustTheme('red')
      this.#assistantModal.show()
    })
  }
}

module.exports = new Assistant