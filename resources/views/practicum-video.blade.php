@extends('layouts.app')
@section('title','Video Praktikum')

@section('content')
<div class="practicum-video flex-grow p-8">
  <h1 class="text-4xl font-bold">Video praktikum</h1>

  <form action="/practicum-video" method="post">
    <div class="practicum-video-form-list mt-8 p-4 rounded-lg grid grid-cols-12 gap-8 bg-white shadow-md">
      @csrf
      <?php foreach ($practicum_videos as [
        'id' => $id,
        'name' => $name,
        'acronym' => $acronym,
        'icon' => $icon,
        'video_link' => $video_link,
        'video_visibility' => $visibility,
      ]) { ?>
        <x-practicum-video-input-field :id="$id" :name="$name" :acronym="$acronym" :icon="$icon" :videoLink="$video_link" :visibility="$visibility" />
      <?php } ?>
      <button type="submit" name="btn_practicum_video_submit" value="true" class="col-span-full sm:justify-self-end justify-center py-2 px-8 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Simpan
      </button>
    </div>
  </form>
</div>
@endsection