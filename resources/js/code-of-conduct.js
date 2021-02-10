let codeOfConductCards = Array.from(document.querySelectorAll('.code-of-conduct-card'))
const plusBtn = document.querySelector('.add-code-of-conduct')
plusBtn.addEventListener('click', function (e) {
  // create new card
  const newCodeOfConductCard = new DOMParser().parseFromString(`
  <div class="code-of-conduct-card md:col-span-4 xl:col-span-3 grid grid-rows-6 grid-cols-6 border border-gray-300 rounded-md h-96 overflow-hidden">
        <img src="" alt="safsafaf" class="col-span-full row-span-full">
        <div class="page col-span-5 flex justify-center items-center bg-gray-100">
          Halaman ${codeOfConductCards.length + 1}
        </div>
        <div class="text-center text-white py-2 bg-red-500">
          <i class="fas fa-trash-alt"></i>
        </div>
      </div>
  `, 'text/html').body.firstChild
  console.log(newCodeOfConductCard)
  codeOfConductCards.push(newCodeOfConductCard)
  e.target.before(newCodeOfConductCard)
  // const codeOfConductList = document.querySelector('.code-of-conduct-list')
  // codeOfConductCards.map(card => {
  //   // codeOfConductList.appendChild(card)
  // })
})

const deleteBtns = Array.from(document.querySelectorAll('.delete-btn'))
deleteBtns.map((deleteBtn, index) => {
  deleteBtn.addEventListener('click', () => {
    deleteBtn.parentElement.remove()
    codeOfConductCards.splice(index, 1);
  })
})
