@extends('layouts.app')
@section('title','Tata Tertib')

@section('components-js')
<script defer type="text/javascript" src="/js/success-banner.js"></script>
@endsection

@section('content')
<div class="code-of-conduct flex-grow p-4 pt-8">
  <h1 class="text-4xl font-bold">Tata tertib</h1>

  @if(session('code_of_conduct_update_message'))
  <x-success-banner message="{{ session('code_of_conduct_update_message') }}" />
  @endif

  <form action="{{ route('code-of-conduct.update', ['id' => $code_of_conduct['id']]) }}" method="POST">
    @method('PUT')
    @csrf
    <div class="mt-8 grid grid-cols-12 gap-4 bg-white rounded-lg shadow-lg p-4 items-start">

      <iframe src="<?= $code_of_conduct['prepared_url'] ?>" width="100%" allow="autoplay" class="col-span-full sm:col-span-6 h-screen bg-gray-100 rounded-md"></iframe>

      <div class="flex flex-col gap-4 col-span-full sm:col-span-6">
        <div>Link Google Drive PDF Tata Tertib</div>
        <div class="code-of-conduct-link-input flex border rounded-md">
          <input type="url" name="file_url" class="p-2 focus:ring-indigo-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 flex-grow rounded-l-md" placeholder="Link" value="<?= $code_of_conduct['original_url'] ?>">
        </div>
        <button type="submit" name="code_of_conduct_submit" value="true" class="flex flex-grow justify-center py-2 px-8 border-0 font-medium rounded-md text-white transition-colors duration-300 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Simpan
        </button>
      </div>

    </div>
  </form>
</div>
@endsection