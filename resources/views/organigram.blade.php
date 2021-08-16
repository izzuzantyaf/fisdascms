@extends('layouts.app')
@section('title','Organigram')

@section('content')
<div class="organigram flex-grow p-4 pt-8">
  <h1 class="text-4xl font-bold">Organigram</h1>

  @if(session('organigram_update_message'))
  <x-success-banner message="{{ session('organigram_update_message') }}" />
  @endif

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 bg-white rounded-md p-4 shadow-md">
    <iframe class="col-span-full sm:col-span-1 w-full h-screen rounded-md bg-gray-100" src="{{ $organigram->prepared_url }}"></iframe>
    <form action="{{ route('organigram', ['id' => $organigram->id]) }}" method="POST" class="col-span-full sm:col-span-1 flex flex-col gap-4">
      @method('PUT')
      @csrf
      <label for="organigram_url">Link Google Drive organigram</label>
      <input type="url" id="organigram_url" name="organigram_url" class="organigram-link-input rounded-md p-2 focus:ring-indigo-500 focus:border-blue-500 shadow-sm border border-gray-300" placeholder="Link" value="{{ $organigram->original_url }}">
      <button type="submit" class="flex justify-center py-2 px-8 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Simpan
      </button>
    </form>
  </div>
</div>
@endsection