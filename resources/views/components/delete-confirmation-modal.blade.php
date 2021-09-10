<div class="delete-modal-overlay z-20 fixed inset-0 bg-black bg-opacity-30 hidden justify-center items-center p-6">
    <div class="delete-modal h-32 bg-white p-4 rounded-md flex-grow sm:max-w-sm">
      <form action="{{ $action }}" method="POST" class="h-full flex flex-col gap-4">
        @method('DELETE')
        @csrf
        <div class="modal-body flex-grow flex justify-center items-center">
          {{ $message }}
        </div>
        <div class="flex gap-4 justify-end">
          <div class="cancel-btn py-2 px-6 rounded-md text-gray-600  text-center cursor-pointer transition-colors duration-300 bg-gray-200 hover:bg-gray-300 w-1/2 sm:w-auto">Batal</div>
          <button type="submit" class="transition-colors duration-300 bg-red-600 hover:bg-red-700 py-2 px-6 text-white rounded-md w-1/2 sm:w-auto">Hapus</button>
        </div>
      </form>
    </div>
  </div>