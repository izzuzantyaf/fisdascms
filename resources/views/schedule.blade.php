@extends('layouts.app')
@section('title','Jadwal Praktikum')

@section('content')
<div class="schedule flex-grow p-8">
  <h1 class="text-4xl font-bold">Jadwal praktikum</h1>
  <form action="/schedule" method="post">
    @csrf
    <div class="mt-8 p-4 grid grid-cols-1 sm:grid-cols-8 gap-8 border border-gray-500 rounded-lg">
      <div class="class-schedule sm:col-span-4 flex flex-col gap-8">
        <h3 class="text-2xl font-light">Jadwal kelas</h3>
        <img src="{{ $class_schedule->image_url }}" alt="Jadwal kelas">
        <div class="self-center">
          <input type="hidden" name="class_schedules-image_url-{{ $class_schedule->id }}" id="class_schedules-image_url" class="simple-file-upload">
        </div>
      </div>
      <div class="module-schedule sm:col-span-4 flex flex-col gap-8">
        <?php foreach ($module_schedules as [
          'id' => $id,
          'faculty' => $faculty,
          'image_url' => $image_url,
        ]) { ?>
          <h3 class="text-2xl font-light uppercase">Jadwal modul <?= $faculty ?></h3>
          <img src="<?= $image_url ?>" alt="Jadwal kelas">
          <div class="self-center">
            <input type="hidden" name="module_schedules-image_url-<?= $id ?>" id="module_schedules-image_url-<?= $id ?>" class="simple-file-upload">
          </div>
        <?php } ?>
      </div>
      <button type="submit" name="btn_schedule_submit" value="true" class="sm:col-start-4 sm:col-span-2 flex justify-center py-2 px-8 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Simpan
      </button>
    </div>
  </form>
</div>
@endsection