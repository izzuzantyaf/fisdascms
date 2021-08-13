@extends('layouts.app')
@section('title','Tugas Pendahuluan')

@section('content')
<div class="preliminary-test flex-grow p-4 pt-8">
  <h1 class="text-4xl font-bold ">Tugas pendahuluan</h1>

  @if(session('preliminary_test_update_message'))
  <x-success-banner message="{{ session('preliminary_test_update_message') }}" />
  @endif

  <form action="/preliminary-test" method="POST">
    <div class="preliminary-test-form-list mt-8 p-4 rounded-lg grid grid-cols-12 gap-8 bg-white shadow-md">
      @method('PUT')
      @csrf
      <?php foreach ($preliminary_tests as [
        'id' => $id,
        'name' => $name,
        'acronym' => $acronym,
        'icon' => $icon,
        'preliminary_test_link' => $link,
        'preliminary_test_visibility' => $visibility,
      ]) { ?>
        <x-preliminary-test-input-field :id="$id" :name="$name" :acronym="$acronym" :icon="$icon" :link="$link" :visibility="$visibility" />
      <?php } ?>
      <button type="submit" class="col-span-full sm:justify-self-end justify-center py-2 px-8 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Simpan
      </button>
    </div>
  </form>

</div>
@endsection