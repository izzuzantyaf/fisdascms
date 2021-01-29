@extends('layouts.app')
@section('title','Modul')

@section('content')
<div class="handouts flex-grow p-8">
  <h1 class="text-4xl font-bold ">Modul praktikum</h1>

  <div class="mt-8 mx-auto md:w-2/4 flex flex-col gap-4">
    <form action="/practicum-handouts" method="post">
      @csrf
      <div class="handout-form-list flex flex-col gap-8 p-4 border border-gray-300 rounded-lg">
        <?php foreach ($practicum_handouts as [
          'faculty' => $faculty,
          'lang' => $lang,
          'file_url' => $file_url,
          'visibility' => $visibility,
        ]) { ?>
          <x-practicum-handout-input-field :faculty="$faculty" :lang="$lang" :file-url="$file_url" :visibility="$visibility" />
        <?php } ?>
        <button type="submit" name="btn_handout1_submit" value="true" class="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Simpan
        </button>
      </div>
    </form>
  </div>

</div>
@endsection