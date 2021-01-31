@extends('layouts.app')
@section('title','Tugas Pendahuluan')

@section('content')
<div class="preliminary-test flex-grow p-8">
  <h1 class="text-4xl font-bold ">Tugas pendahuluan</h1>

  <div class="mt-8 mx-auto md:w-2/4">
    <form action="/preliminary-test" method="post">
      @csrf
      <div class="preliminary-test-form-list flex flex-col gap-8 p-4 border border-gray-300 rounded-lg">
        <?php foreach ($preliminary_tests as [
          'id' => $id,
          'name' => $name,
          'acronym' => $acronym,
          'icon' => $icon,
          'preliminary_test_link' => $link,
        ]) { ?>
          <x-preliminary-test-input-field :id="$id" :name="$name" :acronym="$acronym" :icon="$icon" :link="$link" />
        <?php } ?>
        <button type="submit" name="btn_preliminary_test_submit" value="true" class="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Simpan
        </button>
      </div>
    </form>
  </div>



</div>
@endsection