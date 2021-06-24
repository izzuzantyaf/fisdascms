@extends('layouts.app')
@section('title','Jadwal Praktikum')

@section('content')
<div class="schedule flex-grow p-8">
  <h1 class="text-4xl font-bold">Jadwal praktikum</h1>
  <form action="/schedule" method="post">
    @csrf
    <div class="mt-8 p-4 grid grid-cols-12 gap-8 bg-white shadow-md rounded-lg">

      <div class="flex flex-col gap-4 col-span-full sm:col-span-6 lg:col-span-4">
        <h3 class="text-2xl">Jadwal kelas</h3>
        <iframe class="col-span-full aspect-w-16 aspect-h-9 w-full rounded-md flex-grow bg-gray-100" src="<?= $class_schedule->image_url ? 'https://drive.google.com/file/d/' . explode('/', $class_schedule->image_url)[5] . '/preview' : '' ?>"></iframe>
        <div class="flex border rounded-md">
          <input type="url" name="class_schedules-image_url-{{ $class_schedule->id }}" id="class_schedules-image_url-{{ $class_schedule->id }}" class="p-2 focus:ring-indigo-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 flex-grow rounded-l-md" placeholder="File URL" value="{{ $class_schedule->image_url }}" disabled />
          <div id="class_schedules-image_url-{{ $class_schedule->id }}" class="edit-icon rounded-r-md p-2 flex justify-center items-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
            <i class="fas fa-pen text-gray-500"></i>
          </div>
        </div>
      </div>

      <?php foreach ($module_schedules as [
        'id' => $id,
        'faculty' => $faculty,
        'image_url' => $image_url,
      ]) { ?>
        <div class="flex flex-col gap-4 col-span-full sm:col-span-6 lg:col-span-4">
          <h3 class="text-2xl col-span-full">Jadwal modul <span class="uppercase"><?= $faculty ?></span></h3>
          <iframe class="col-span-full aspect-w-16 aspect-h-9 w-full rounded-md flex-grow bg-gray-100" src="<?= $class_schedule->image_url ? 'https://drive.google.com/file/d/' . explode('/', $class_schedule->image_url)[5] . '/preview' : '' ?>" allow="autoplay"></iframe>
          <div class="flex border rounded-md">
            <input type="url" name="module_schedules-image_url-<?= $id ?>" id="module_schedules-image_url-<?= $id ?>" class="p-2 focus:ring-indigo-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 flex-grow rounded-l-md" placeholder="File URL" value="{{ $image_url }}" disabled />
            <div id="module_schedules-image_url-<?= $id ?>" class="edit-icon rounded-r-md p-2 flex justify-center items-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
              <i class="fas fa-pen text-gray-500"></i>
            </div>
          </div>
        </div>
      <?php } ?>

      <div class="col-span-full flex flex-col sm:flex-row-reverse md:justify-self-end gap-4">
        <button type="submit" name="btn_schedule_submit" value="true" class="flex flex-grow justify-center py-2 px-8 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Simpan
        </button>
      </div>

    </div>
  </form>
</div>
@endsection