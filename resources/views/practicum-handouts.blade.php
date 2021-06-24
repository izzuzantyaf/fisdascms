@extends('layouts.app')
@section('title','Modul')

@section('content')
<div class="handouts flex-grow p-4 pt-8">
  <h1 class="text-4xl font-bold">Modul praktikum</h1>

  <form action="/practicum-handouts" method="post">
    @csrf
    <div class="handout-form-list mt-8 grid grid-cols-12 gap-8 p-4 bg-white shadow-md rounded-lg">
      <?php foreach ($practicum_handouts as [
        'id' => $id,
        'faculty' => $faculty,
        'lang' => $lang,
        'file_url' => $file_url,
        'visibility' => $visibility,
      ]) { ?>
        <x-practicum-handout-input-field :id="$id" :faculty="$faculty" :lang="$lang" :file-url="$file_url" :visibility="$visibility" />
      <?php } ?>
      <button type="submit" name="btn_handout1_submit" value="true" class="col-span-full sm:justify-self-end py-2 px-8 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Simpan
      </button>
    </div>
  </form>

</div>
@endsection