@extends('layouts.app')
@section('title', 'Social Media')

@section('content')
<div class="social-media flex-grow p-4 pt-8">
  <h1 class="text-4xl font-bold">Social media</h1>
  <div class="mt-8 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 bg-white shadow-md rounded-lg">
    @if(session('result_message'))
    <div class="col-span-full bg-green-400 text-white rounded-md py-2 px-4">
      {{ session('result_message')}}
    </div>
    @endif
    <?php foreach ($social_medias as [
      'id' => $id,
      'name' => $name,
      'icon' => $icon,
      'link' => $link,
      'color' => $color,
      'bg_color' => $bg_color,
      'visibility' => $visibility,
    ]) { ?>
      <div class="social-media-card grid grid-cols-12 gap-4 items-center <?= $visibility ? "$color $bg_color" : "text-gray-300 bg-gray-100" ?> rounded-md p-4">
        <!-- logo -->
        <div class="col-span-2 lg:col-span-1"><i class="<?= $icon ?> text-3xl"></i></div>
        <!-- social media name -->
        <div class="col-span-10 lg:col-span-2 text-xl font-bold"><?= $name ?></div>
        <!-- link and link input field -->
        <div class="col-span-full lg:col-span-7 overflow-hidden flex gap-4 items-center">
          <a href="<?= $link ?>" class="social-media-link underline cursor-pointer"><?= $link ?></a>
          <form action="/social-media/<?= $id ?>/link" method="POST" id="social_media_link_<?= $id ?>" class="w-full">
            @method('PUT')
            @csrf
            <input type="url" name="social_media_link" value="<?= $link ?>" class="social-media-link-input-field hidden text-black w-full p-2 rounded-md <?= $visibility ? '' : 'border' ?>">
          </form>
          <div class="cancel-social-media-link-btn hidden px-2 py-1 cursor-pointer rounded-md transition-colors duration-300 bg-black bg-opacity-10 hover:bg-opacity-20">
            <i class="fas fa-times <?= $visibility ? '' : 'text-gray-700' ?>"></i>
          </div>
        </div>
        <!-- visibility, edit, save -->
        <div class="action col-span-full lg:col-span-2 flex gap-4 items-center justify-end">
          <form action="/social-media/<?= $id ?>/visibility" method="POST">
            @method('PUT')
            @csrf
            <input type="hidden" name="social_media_visibility" value="<?= $visibility ?>">
            <!-- visibility button -->
            <button type="submit" class="px-2 py-1 cursor-pointer rounded-md transition-colors duration-300 bg-black bg-opacity-10 hover:bg-opacity-20">
              <i class="fas <?= $visibility ? 'fa-eye' : 'fa-eye-slash text-gray-700' ?>"></i>
            </button>
          </form>
          <!-- edit button -->
          <div class="edit-social-media-link-btn px-2 py-1 cursor-pointer rounded-md transition-colors duration-300 bg-black bg-opacity-10 hover:bg-opacity-20">
            <i class="fas fa-pencil-alt <?= $visibility ? '' : 'text-gray-700' ?>"></i>
          </div>
          <!-- save button -->
          <button type="submit" form="social_media_link_<?= $id ?>" class="save-social-media-link-btn hidden px-2 py-1 cursor-pointer rounded-md transition-colors duration-300 bg-black bg-opacity-10 hover:bg-opacity-20">
            <i class="fas fa-save <?= $visibility ? '' : 'text-gray-700' ?>"></i>
          </button>
        </div>
      </div>
    <?php } ?>
  </div>
</div>
@endsection