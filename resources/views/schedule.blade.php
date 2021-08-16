@extends('layouts.app')
@section('title','Jadwal Praktikum')

@section('content')
<div class="schedule flex-grow p-4 pt-8">
  <h1 class="text-4xl font-bold">Jadwal praktikum</h1>

  @if(session('schedule_update_message'))
  <x-success-banner message="{{ session('schedule_update_message') }}" />
  @endif

  <form action="{{ route('schedule.update') }}" method="POST">
    @method('PUT')
    @csrf
    <div class="mt-8 p-4 grid grid-cols-12 gap-8 bg-white shadow-md rounded-lg">

      <div class="flex flex-col gap-4 col-span-full sm:col-span-6 lg:col-span-4">
        <h3 class="text-2xl">Jadwal kelas</h3>
        <iframe class="col-span-full w-full h-96 sm:h-48 md:h-96 rounded-md flex-grow bg-gray-100" src="{{ $class_schedule->prepared_url }}"></iframe>
        <input type="hidden" name="class_schedule[id]" value="{{ $class_schedule->id }}">
        <input type="url" name="class_schedule[file_url]" class="p-2 focus:ring-indigo-500 focus:border-blue-500 rounded-md shadow-sm border border-gray-300" placeholder="Link" value="{{ $class_schedule->original_url }}" />
      </div>

      <?php foreach ($module_schedules as [
        'id' => $id,
        'faculty' => $faculty,
        'original_url' => $original_url,
        'prepared_url' => $prepared_url,
      ]) { ?>
        <div class="flex flex-col gap-4 col-span-full sm:col-span-6 lg:col-span-4">
          <h3 class="text-2xl col-span-full">Jadwal modul <span class="uppercase">{{ $faculty }}</span></h3>
          <iframe class="col-span-full h-96 sm:h-48 md:h-96 w-full rounded-md flex-grow bg-gray-100" src="{{ $prepared_url }}" allow="autoplay"></iframe>
          <input type="url" name="module_schedules[{{ $id }}][file_url]" class="p-2 focus:ring-indigo-500 focus:border-blue-500 shadow-sm border border-gray-300 rounded-md" placeholder="Link" value="{{ $original_url }}" />
        </div>
      <?php } ?>

      <div class="col-span-full flex flex-col sm:flex-row-reverse md:justify-self-end gap-4">
        <button type="submit" class="flex flex-grow justify-center py-2 px-8 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Simpan
        </button>
      </div>

    </div>
  </form>
</div>
@endsection