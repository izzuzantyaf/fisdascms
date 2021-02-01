@extends('layouts.app')
@section('title','Modul')

@section('content')
<div class="handouts flex-grow p-8">
  <h1 class="text-4xl font-bold">Modul praktikum</h1>

  <form action="/practicum-handouts" method="post">
    @csrf
    <div class="mt-8 flex flex-col gap-8 p-4 border border-gray-300 rounded-lg">
      <div class="handout-form-list grid grid-cols-1 sm:grid-cols-2 gap-8">
        <?php foreach ($practicum_handouts as [
          'id' => $id,
          'faculty' => $faculty,
          'lang' => $lang,
          'file_url' => $file_url,
          'visibility' => $visibility,
        ]) { ?>
          <x-practicum-handout-input-field :id="$id" :faculty="$faculty" :lang="$lang" :file-url="$file_url" :visibility="$visibility" />
        <?php } ?>
      </div>
      <button type="submit" name="btn_handout1_submit" value="true" class="sm:w-1/3 sm:self-center flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Simpan
      </button>
    </div>
  </form>

</div>
@endsection