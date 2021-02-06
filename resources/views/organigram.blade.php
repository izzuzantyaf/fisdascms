@extends('layouts.app')
@section('title','Organigram')

@section('content')
<div class="organigram flex-grow p-8">
  <h1 class="text-4xl font-bold">Organigram</h1>
  <form action="/organigram" method="post">
    @csrf
    @if(session('upload_status'))
    <div class="flash {{ session('theme') }} inline-block px-4 py-2 mt-8 rounded-md">{{ session('upload_status') }}</div>
    @endif
    <div class="flex flex-col sm:flex-row sm:items-start items-center gap-8 mt-8">
      <img src="{{ $organigram_url }}" class="rounded-md self-start xl:w-1/3 sm:w-1/2" alt="organigram">
      <div class="flex flex-col gap-4">
        <input type="hidden" name="organigram_url" id="organigram_url" class="simple-file-upload">
        <button type="submit" name="btn_organigram_submit" value="true" class="flex justify-center py-2 px-8 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Simpan
        </button>
      </div>
    </div>
  </form>
</div>
@endsection