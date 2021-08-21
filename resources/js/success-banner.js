class SuccessBanner {
  self = document.querySelector('.success-banner')
  hydrate() {
    if (this.self)
      this.#handleDissmiss()
  }
  #handleDissmiss() {
    this.self.classList.add('translate-y-24')
  }
}
(new SuccessBanner).hydrate()