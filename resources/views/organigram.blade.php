@extends('layouts.app')
@section('title','Organigram')

@section('content')
<div class="organigram flex-grow p-8">
  <h1 class="text-4xl font-bold">Organigram</h1>
  <form action="/organigram" method="post" enctype="multipart/form-data">
    @csrf
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 bg-white rounded-md p-4 shadow-md">
      @if(session('upload_status'))
      <div class="flash col-span-full lg:justify-self-start {{ session('theme') }} inline-block px-4 py-2 rounded-md">{{ session('upload_status') }}</div>
      @endif
      <img src="{{ $organigram_url }}" class="rounded-md" alt="organigram">
      <div class="flex flex-col gap-4">

        <x-media-library-credentials />

        <label for="organigram_url">Image URL</label>
        <div class="organigram-link-input flex border rounded-md">
          <input type="url" name="organigram_url" id="organigram_url" class="p-2 focus:ring-indigo-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 flex-grow rounded-l-md" placeholder="Image URL" value="{{ $organigram_url }}" disabled>
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

      </div>
    </div>
  </form>
</div>
@endsection