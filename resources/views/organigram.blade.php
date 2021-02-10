@extends('layouts.app')
@section('title','Organigram')

@section('content')
<div class="organigram flex-grow p-8">
  <h1 class="text-4xl font-bold">Organigram</h1>
  <form action="/organigram" method="post" enctype="multipart/form-data">
    @csrf
    @if(session('upload_status'))
    <div class="flash {{ session('theme') }} inline-block px-4 py-2 mt-8 rounded-md">{{ session('upload_status') }}</div>
    @endif
    <div class="flex flex-col sm:flex-row sm:items-start gap-8 mt-8">
      <img src="{{ $organigram_url }}" class="rounded-md self-start xl:w-1/3 sm:w-1/2" alt="organigram">
      <div class="flex flex-col gap-4">

        <label for="organigram_url">Image URL</label>
        <div class="organigram-link-input flex border rounded-md">
          <input type="url" name="organigram_url" id="organigram_url" class="p-2 focus:ring-indigo-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 flex-grow rounded-l-md" placeholder="File url" value="{{ $organigram_url }}" disabled>
          <div id="organigram_url" class="edit-icon rounded-r-md p-2 flex justify-center items-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
            <i class="fas fa-pen text-gray-500"></i>
          </div>
        </div>

        <button type="submit" name="btn_organigram_submit" value="true" class="flex justify-center py-2 px-8 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Simpan
        </button>

        <div name="cloudinary-ml" id="cloudinary-ml" class="flex justify-center py-2 px-8 font-medium rounded-md text-blue-500 border border-blue-500 hover:bg-blue-100 cursor-pointer">
          <input type="hidden" id="signature" value="{{ $signature }}" disabled />
          Media library
        </div>
        <x-cloudinary-js />

        <div class="p-2 rounded-md bg-yellow-100 border border-yellow-300 text-yellow-500">
          <p class="font-bold">Akun media library</p>
          <p>Username : msi.fisdas@gmail.com</p>
          <p>Password : Msi@ayee007</p>
        </div>
      </div>
    </div>
  </form>
</div>
@endsection