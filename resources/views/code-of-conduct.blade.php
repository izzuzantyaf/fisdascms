@extends('layouts.app')
@section('title','Tata Tertib')

@section('content')
<div class="code-of-conduct flex-grow p-8">
  <h1 class="text-4xl font-bold">Tata tertib</h1>
  <form action="/code-of-conduct" method="post">
    @csrf
    <div class="mt-8 grid grid-cols-12 gap-8 bg-white rounded-lg shadow-md p-4 items-start">

      <iframe src="<?= $code_of_conduct['file_url'] ? 'https://drive.google.com/file/d/' . explode('/', $code_of_conduct['file_url'])[5] . '/preview' : '' ?>" width="100%" allow="autoplay" class="col-span-full sm:col-span-6 h-screen bg-gray-100 rounded-md"></iframe>

      <div class="flex flex-col gap-2 col-span-full sm:col-span-6">
        <div>Link Google Drive PDF Tata Tertib</div>
        <div class="code-of-conduct-link-input flex border rounded-md">
          <input type="url" name="<?= 'file_url-' . $code_of_conduct['id'] ?>" id="<?= 'file_url-' . $code_of_conduct['id'] ?>" class="p-2 focus:ring-indigo-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 flex-grow rounded-l-md" placeholder="Input link" value="<?= $code_of_conduct['file_url'] ? $code_of_conduct['file_url'] : '' ?>" disabled>
          <div id="<?= 'file_url-' . $code_of_conduct['id'] ?>" class="edit-icon rounded-r-md p-2 flex justify-center items-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
            <i class="fas fa-pen text-gray-500"></i>
          </div>
        </div>
        <button type="submit" name="code_of_conduct_submit" value="true" class="flex flex-grow justify-center py-2 px-8 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Simpan
        </button>
      </div>

    </div>
  </form>
</div>
@endsection