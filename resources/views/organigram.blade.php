@extends('layouts.app')
@section('title','Organigram')

@section('content')
<div class="organigram flex-grow p-4 pt-8">
  <h1 class="text-4xl font-bold">Organigram</h1>
  <form action="/organigram" method="post" enctype="multipart/form-data">
    @csrf
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 bg-white rounded-md p-4 shadow-md">
      @if(session('upload_status'))
      <div class="flash col-span-full {{ session('theme') }} inline-block px-4 py-2 rounded-md">{{ session('upload_status') }}</div>
      @endif
      <iframe class="col-span-full sm:col-span-1 w-full h-screen rounded-md flex-grow bg-gray-100" src="<?= $organigram_url ? 'https://drive.google.com/file/d/' . explode('/', $organigram_url)[5] . '/preview' : '' ?>"></iframe>
      <div class="flex flex-col gap-4">

        <label for="organigram_url">Link Google Drive organigram</label>
        <div class="organigram-link-input flex border rounded-md">
          <input type="url" name="organigram_url" id="organigram_url" class="p-2 focus:ring-indigo-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 flex-grow rounded-l-md" placeholder="Input link" value="{{ $organigram_url }}" disabled>
          <div id="organigram_url" class="edit-icon rounded-r-md p-2 flex justify-center items-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
            <i class="fas fa-pen text-gray-500"></i>
          </div>
        </div>

        <button type="submit" name="btn_organigram_submit" value="true" class="flex justify-center py-2 px-8 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Simpan
        </button>

      </div>
    </div>
  </form>
</div>
@endsection