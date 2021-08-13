@extends('layouts.app')
@section('title','Cover Jurnal')

@section('content')
<div class="journal-cover flex-grow p-4 pt-8">
  <h1 class="text-4xl font-bold ">Cover Jurnal</h1>

  @if(session('journal_cover_update_message'))
  <x-success-banner message="{{ session('journal_cover_update_message') }}" />
  @endif

  <form action="/journal-cover" method="POST">
    <div class="journal-cover-form-list mt-8 p-4 bg-white rounded-lg shadow-md grid grid-cols-12 gap-8">
      @method('PUT')
      @csrf
      <?php foreach ($journal_covers as $key => [
        'id' => $id,
        'name' => $name,
        'acronym' => $acronym,
        'icon' => $icon,
        'journal_cover_link' => $link,
        'journal_cover_visibility' => $visibility,
      ]) { ?>
        <x-journal-cover-input-field :id="$id" :name="$name" :acronym="$acronym" :icon="$icon" :link="$link" :visibility="$visibility" />
      <?php } ?>
      <button type="submit" class="col-span-full sm:justify-self-end flex justify-center py-2 px-8 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Simpan
      </button>
    </div>
  </form>

</div>
@endsection