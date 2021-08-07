const assistantModal = {
  self: document.querySelector('.assistant-modal-overlay'),
  closeAssistantModalBtn: document.querySelector('.close-assistant-modal'),
  addAssistantBtn: document.querySelector('.add-assistant-btn'),
  editAssistantBtns: Array.from(document.querySelectorAll('.edit-assistant-icon')),
  deleteAssistantBtns: Array.from(document.querySelectorAll('.delete-assistant-icon')),
  show() {
    this.self.classList.replace('hidden', 'flex')
  },
  hide() {
    this.self.classList.replace('flex', 'hidden')
  },
  fillData(method = 'POST', assistant = null) {
    this.self.querySelector('form').action = `/assistants${method == 'PUT' || method == 'DELETE' ? `/${assistant.id}` : ''}`
    this.self.querySelector('input[name="_method"]').value = method
    if (method == 'PUT')
      this.self.querySelector('.title').innerHTML = 'Edit Asisten'
    else if (method == 'DELETE')
      this.self.querySelector('.title').innerHTML = 'Hapus Asisten'
    else
      this.self.querySelector('.title').innerHTML = 'Tambah Asisten'
    this.self.querySelector('input[name=assistant_name]').value = method == 'PUT' || method == 'DELETE' ? assistant.name : null
    this.self.querySelector('input[name=assistant_code]').value = method == 'PUT' || method == 'DELETE' ? assistant.code : null
    this.self.querySelector('input[name=assistant_phone]').value = method == 'PUT' || method == 'DELETE' ? assistant.phone : null
    this.self.querySelector('input[name=assistant_line_id]').value = method == 'PUT' || method == 'DELETE' ? assistant.lineId : null
    this.self.querySelector('input[name=assistant_feedback_link]').value = method == 'PUT' || method == 'DELETE' ? assistant.feedbackLink : null
  },
  adjustTheme(operation = 'default') {
    if (operation == 'delete') {
      this.self.querySelector('.title').classList.add('text-red-600')
      this.self.querySelector('button[type=submit]').innerHTML = 'Hapus'
      this.self.querySelector('button[type=submit]').classList.replace('bg-blue-600', 'bg-red-600')
      this.self.querySelector('button[type=submit]').classList.replace('hover:bg-blue-700', 'hover:bg-red-700')
    } else {
      this.self.querySelector('.title').classList.remove('text-red-600')
      this.self.querySelector('button[type=submit]').innerHTML = 'Simpan'
      this.self.querySelector('button[type=submit]').classList.replace('bg-red-600', 'bg-blue-600')
      this.self.querySelector('button[type=submit]').classList.replace('hover:bg-red-700', 'hover:bg-blue-700')
    }
  },
  enableInputField(enabled = true) {
    if (enabled) {
      this.self.querySelector('input[name=assistant_name]').removeAttribute('disabled')
      this.self.querySelector('input[name=assistant_code]').removeAttribute('disabled')
      this.self.querySelector('input[name=assistant_phone]').removeAttribute('disabled')
      this.self.querySelector('input[name=assistant_line_id]').removeAttribute('disabled')
      this.self.querySelector('input[name=assistant_feedback_link]').removeAttribute('disabled')
    } else {
      this.self.querySelector('input[name=assistant_name]').setAttribute('disabled', 'true')
      this.self.querySelector('input[name=assistant_code]').setAttribute('disabled', 'true')
      this.self.querySelector('input[name=assistant_phone]').setAttribute('disabled', 'true')
      this.self.querySelector('input[name=assistant_line_id]').setAttribute('disabled', 'true')
      this.self.querySelector('input[name=assistant_feedback_link]').setAttribute('disabled', 'true')
    }
  },
  handleAddNewAssistant() {
    this.addAssistantBtn.addEventListener('click', () => {
      // fill form field with the assistant data
      this.fillData()
      // adjust theme
      this.adjustTheme()
      // disable input field
      this.enableInputField()
      // show the modal
      this.show()
    })
  },
  handleEditAssistant() {
    this.editAssistantBtns.forEach((btn) => {
      const id = btn.parentElement.parentElement.querySelector('input[name=assistant_id]').value
      const name = btn.parentElement.parentElement.querySelector('.assistant-name').innerText
      const code = btn.parentElement.parentElement.querySelector('.assistant-code').innerText
      const phone = btn.parentElement.parentElement.querySelector('.assistant-phone').innerText
      const lineId = btn.parentElement.parentElement.querySelector('.assistant-line-id').innerText
      const feedbackLink = btn.parentElement.parentElement.querySelector('.assistant-feedback-link').innerText
      btn.addEventListener('click', () => {
        // fill form field with the assistant data
        this.fillData('PUT', { id, name, code, phone, lineId, feedbackLink })
        // adjust theme
        this.adjustTheme()
        // disable input field
        this.enableInputField()
        // show the modal
        this.show()
      })
    })
  },
  handleDeleteAssistant() {
    this.deleteAssistantBtns.forEach((btn) => {
      const id = btn.parentElement.parentElement.querySelector('input[name=assistant_id]').value
      const name = btn.parentElement.parentElement.querySelector('.assistant-name').innerText
      const code = btn.parentElement.parentElement.querySelector('.assistant-code').innerText
      const phone = btn.parentElement.parentElement.querySelector('.assistant-phone').innerText
      const lineId = btn.parentElement.parentElement.querySelector('.assistant-line-id').innerText
      const feedbackLink = btn.parentElement.parentElement.querySelector('.assistant-feedback-link').innerText
      btn.addEventListener('click', () => {
        // fill form field with the assistant data
        this.fillData('DELETE', { id, name, code, phone, lineId, feedbackLink })
        // adjust theme
        this.adjustTheme('delete')
        // disable input field
        this.enableInputField(false)
        // show the modal
        this.show()
      })
    })
  },
  handleClose() {
    this.self.addEventListener('click', (e) => {
      // close the assistant modal if overlay or cancel button is clicked
      if (e.target === this.self || e.target === this.closeAssistantModalBtn)
        this.hide()
    })
  }
}
module.exports = assistantModal