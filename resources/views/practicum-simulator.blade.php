@extends('layouts.app')
@section('title','Simulator Praktikum')

@section('content')
<div class="practicum-simulator flex-grow p-8">
  <h1 class="text-4xl font-bold ">Simulator Praktikum</h1>

  <form action="/practicum-simulator" method="post">
    <div class="practicum-simulator-form-list mt-8 p-4 bg-white rounded-lg shadow-md grid grid-cols-12 gap-8">
      @csrf
      <?php foreach ($practicum_simulators as [
        'id' => $id,
        'name' => $name,
        'acronym' => $acronym,
        'icon' => $icon,
        'simulator_link' => $link,
        'simulator_visibility' => $visibility,
      ]) { ?>
        <x-practicum-simulator-input-field :id="$id" :name="$name" :acronym="$acronym" :icon="$icon" :link="$link" :visibility="$visibility" />
      <?php } ?>
      <button type="submit" name="btn_practicum_simulator_submit" value="true" class="col-span-full sm:justify-self-end flex justify-center py-2 px-8 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Simpan
      </button>
    </div>
  </form>

</div>
@endsection