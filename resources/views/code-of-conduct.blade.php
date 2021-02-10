@extends('layouts.app')
@section('title','Tata Tertib')

@section('content')
<div class="code-of-conduct flex-grow p-8">
  <h1 class="text-4xl font-bold">Tata tertib</h1>
  <div class="code-of-conduct-list grid grid-cols-2 md:grid-cols-12 mt-8 gap-8">
    <?php for ($i = 0; $i < 5; $i++) { ?>
      <div class="code-of-conduct-card md:col-span-4 xl:col-span-3 grid grid-rows-6 grid-cols-6 border border-gray-300 rounded-md h-96 overflow-hidden">
        <img src="" alt="safsafaf" class="col-span-full row-span-full">
        <div class="page col-span-5 flex justify-center items-center bg-gray-100">
          <?= 'Halaman ' . $i + 1 ?>
        </div>
        <div class="delete-btn text-center text-white py-2 bg-red-500 cursor-pointer">
          <i class="fas fa-trash-alt"></i>
        </div>
      </div>
    <?php } ?>
    <div class="add-code-of-conduct md:col-span-4 xl:col-span-3 flex justify-center items-center border border-gray-300 rounded-md h-96 overflow-hidden text-2xl cursor-pointer">
      <i class="fas fa-plus"></i>
    </div>
  </div>
</div>
@endsection