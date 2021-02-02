@extends('layouts.app')
@section('title','Cover Jurnal')

@section('content')
<div class="journal-cover flex-grow p-8">
  <h1 class="text-4xl font-bold ">Cover Jurnal</h1>

  <form action="/journal-cover" method="post">
    <div class="mt-8 flex flex-col gap-8 p-4 border border-gray-300 rounded-lg">
      <div class="journal-cover-form-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        @csrf
        <?php foreach ($journal_covers as [
          'id' => $id,
          'name' => $name,
          'acronym' => $acronym,
          'icon' => $icon,
          'journal_cover_link' => $link,
          'journal_cover_visibility' => $visibility,
        ]) { ?>
          <x-journal-cover-input-field :id="$id" :name="$name" :acronym="$acronym" :icon="$icon" :link="$link" :visibility="$visibility" />
        <?php } ?>
      </div>
      <button type="submit" name="btn_journal_cover_submit" value="true" class="flex sm:self-center sm:w-1/3 justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Simpan
      </button>
    </div>
  </form>

</div>
@endsection