@extends('layouts.app')
@section('title','Modul')

@section('content')
<div class="handouts flex-grow p-4 pt-8 space-y-8">
  <h1 class="text-4xl font-bold">Modul praktikum</h1>

  @if(session('handout_update_message'))
  <x-success-banner message="{{ session('handout_update_message') }}" />
  @endif

  <form action="{{ route('handout.update') }}" method="POST">
    @method('PUT')
    @csrf
    <div class="handout-form-list mt-4 grid grid-cols-12 gap-8 p-4 bg-white shadow-md rounded-lg">
      <?php foreach ($handouts as [
        'id' => $id,
        'faculty' => $faculty,
        'lang' => $lang,
        'file_url' => $file_url,
        'visibility' => $visibility,
      ]) { ?>
        <x-practicum-handout-input-field :id="$id" :faculty="$faculty" :lang="$lang" :file-url="$file_url" :visibility="$visibility" />
      <?php } ?>
      <button type="submit" class="col-span-full sm:justify-self-end py-2 px-8 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Simpan
      </button>
    </div>
  </form>

</div>
@endsection