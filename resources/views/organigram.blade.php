@extends('layouts.app')
@section('title','Organigram')

@section('content')
<div class="organigram flex-grow p-8">
  <h1 class="text-4xl font-bold">Organigram</h1>
  <form action="/organigram" method="post" enctype="multipart/form-data">
    <div class="md:w-1/4 flex flex-col gap-4 mt-4">
      @if(session('upload_status'))
      <div class="flash {{ session('theme') }} px-4 py-2 rounded-md">{{ session('upload_status') }}</div>
      @endif
      <img src="{{ $organigram_url }}" alt="organigram">
      @csrf
      <input type="file" name="organigram" id="organigram" class="border rounded-md">
      <button type="submit" name="btn_organigram_submit" value="true" class="sm:w-1/3 sm:self-center flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Simpan
      </button>
    </div>
  </form>
</div>
</div>
@endsection