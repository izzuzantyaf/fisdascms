@extends('layouts.app')
@section('title','Asisten')

@section('functionality-js')
<script defer type="text/javascript" src="/js/assistant.js"></script>
@endsection

@section('components-js')
<script defer type="text/javascript" src="/js/success-banner.js"></script>
@endsection

@section('content')
<div class="assistants max-w-full overflow-x-auto flex-grow flex flex-col gap-4 p-4 pt-8">
  <h1 class="text-4xl font-bold">Asisten</h1>

  @if(session('result_message'))
  <x-success-banner message="{{ session('result_message')}}" />
  @endif

  <div class="flex gap-4 justify-between">
    <button type="submit" form="assistant-table" class="transition-colors duration-300 bg-red-600 hover:bg-red-700 text-white rounded-md py-2 px-2">
      <i class="fas fa-trash-alt"></i>
    </button>
    <button class="add-assistant-btn transition-colors duration-300 bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-6">
      <i class="fas fa-plus"></i>
      Asisten baru
    </button>
  </div>

  <!-- Table -->
  <div class="max-w-full self-start overflow-x-auto max-h-screen shadow border border-gray-200 rounded-lg">
    <table class="divide-y divide-gray-200 table-fixed w-full">
      <thead class="bg-gray-50">
        <tr class="text-left text-xs font-medium text-gray-500 uppercase">
          <th class="px-4 py-2 w-6"><span class="sr-only">Check</span></th>
          <th class="px-4 py-2 w-6"><span class="sr-only">Edit</span></th>
          <th class="px-4 py-2 w-6"><span class="sr-only">Hapus</span></th>
          <th class="px-4 py-2 w-48">Nama</th>
          <th class="px-4 py-2 w-12">Kode</th>
          <th class="px-4 py-2 w-28">No HP</th>
          <th class="px-4 py-2 w-28">Line ID</th>
          <th class="px-4 py-2 w-72">Link feedback</th>
        </tr>
      </thead>
      <form action="{{ route('assistant.delete-multiple') }}" method="POST" id="assistant-table">
        @method('DELETE')
        @csrf
        <tbody class="bg-white divide-y divide-gray-200">
          <?php foreach ($assistants as [
            'id' => $id,
            'name' => $name,
            'code' => $code,
            'phone_number' => $phone_number,
            'line_id' => $line_id,
            'feedback_link' => $feedback_link,
          ]) { ?>
            <tr class="text-xs">
              <td class="px-4 py-2 font-medium text-gray-900"><input type="checkbox" class="cursor-pointer" name="assistant_selected[]" id="<?= $id ?>" value="<?= $id ?>"></td>
              <input type="hidden" name="id" value="<?= $id ?>">
              <td class="px-4 py-2 font-medium">
                <button type="button" class="edit-assistant-icon hover:bg-indigo-100 cursor-pointer min-w-full rounded-md p-2">
                  <i class="fas fa-pencil-alt text-indigo-600"></i>
                </button>
              </td>
              <td class="px-4 py-2 font-medium">
                <button type="button" class="delete-assistant-icon hover:bg-red-100 cursor-pointer min-w-full rounded-md p-2">
                  <i class="fas fa-trash-alt text-red-600"></i>
                </button>
              </td>
              <td class="name px-4 py-2 font-medium text-gray-900 capitalize"><?= $name ?></td>
              <td class="code px-4 py-2 text-gray-900 uppercase"><?= $code ?></td>
              <td class="phone px-4 py-2 text-gray-500"><?= $phone_number ?></td>
              <td class="line-id px-4 py-2 text-gray-500"><?= $line_id ?></td>
              <td class="feedback-link px-4 py-2 text-gray-500 truncate"><a class="underline" href="<?= $feedback_link ?>"><?= $feedback_link ?></a></td>
            </tr>
          <?php } ?>
        </tbody>
      </form>
    </table>
  </div>

  <div class="assistant-modal-overlay z-20 fixed inset-0 bg-black bg-opacity-25 hidden justify-center items-center p-4">
    <div class="assistant-modal bg-white p-4 rounded-md flex-grow max-w-prose">
      <form action="{{ route('assistant.create') }}" method="POST" class="flex flex-col gap-4">
        <input type="hidden" name="_method" value="POST">
        @csrf
        <div class="title font-bold text-2xl">Tambah asisten</div>
        <input type="text" name="name" required placeholder="Nama" class="py-2 px-4 rounded-md border">
        <input type="text" name="code" required placeholder="Kode" class="py-2 px-4 rounded-md border">
        <input type="tel" pattern="^[0-9]*$" name="phone_number" placeholder="No Hp (optional)" class="py-2 px-4 rounded-md border">
        <input type="text" name="line_id" placeholder="Id Line (optional)" class="py-2 px-4 rounded-md border">
        <input type="text" name="feedback_link" placeholder="Link feedback (optional)" class="py-2 px-4 rounded-md border">
        <div class="flex gap-4 justify-end">
          <div class="close-assistant-modal py-2 px-6 rounded-md text-gray-600  text-center cursor-pointer transition-colors duration-300 ease-in-out bg-gray-200 hover:bg-gray-300 w-1/2 sm:w-auto">Batal</div>
          <button type="submit" class="transition-colors duration-300 ease-in-out bg-blue-600 hover:bg-blue-700 py-2 px-6 text-white rounded-md w-1/2 sm:w-auto">Simpan</button>
        </div>
      </form>
    </div>
  </div>
</div>
@endsection