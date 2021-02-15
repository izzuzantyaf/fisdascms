@extends('layouts.app')
@section('title','Tata Tertib')

@section('content')
<div class="code-of-conduct flex-grow p-8">
  <h1 class="text-4xl font-bold">Tata tertib</h1>
  <form action="/code-of-conduct" method="post">
    @csrf
    <div class="mt-8 grid grid-cols-12 gap-8 bg-white rounded-lg shadow-md p-4 items-end">
      <?php foreach ($code_of_conducts as [
        'id' => $id,
        'image_url' => $image_url,
        'order' => $order,
      ]) { ?>
        <div class="flex flex-col gap-2 col-span-6 lg:col-span-4">
          <?php if (!is_null($image_url)) { ?>
            <img src="<?= $image_url ?>" alt="Tata tertib" class="rounded-md border">
          <?php } ?>
          <div>Halaman <?= $order ?></div>
          <div class="code-of-conduct-link-input flex border rounded-md">
            <input type="url" name="<?= 'image_url-' . $id ?>" id="<?= 'image_url-' . $id ?>" class="p-2 focus:ring-indigo-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 flex-grow rounded-l-md" placeholder="Image URL" value="<?= $image_url ?>" disabled>
            <div id="<?= 'image_url-' . $id ?>" class="edit-icon rounded-r-md p-2 flex justify-center items-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
              <i class="fas fa-pen text-gray-500"></i>
            </div>
          </div>
        </div>
      <?php } ?>
      <div class="col-span-full flex flex-col sm:flex-row-reverse md:justify-self-end gap-4">
        <button type="submit" name="code_of_conduct_submit" value="true" class="flex flex-grow justify-center py-2 px-8 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Simpan
        </button>
        <div name="cloudinary-ml" id="cloudinary-ml" class="flex flex-grow justify-center py-2 px-8 font-medium rounded-md text-blue-500 border border-blue-500 hover:bg-blue-100 cursor-pointer">
          <input type="hidden" class="signature" value="{{ $signature }}" disabled />
          Media library
        </div>
        <x-cloudinary-js />
      </div>
    </div>
  </form>
</div>
@endsection