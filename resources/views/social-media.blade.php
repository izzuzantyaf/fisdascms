@extends('layouts.app')
@section('title', 'Social Media')

@section('content')
<div class="social-media flex-grow p-4 pt-8">
  <h1 class="text-4xl font-bold">Social media</h1>
  <div class="mt-8 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 bg-white shadow-md rounded-lg">
    <?php foreach ($social_medias as [
      'name' => $name,
      'icon' => $icon,
      'link' => $link,
      'color' => $color,
      'bg_color' => $bg_color,
      'visibility' => $visibility,
    ]) { ?>
      <div class="grid grid-cols-12 gap-4 items-center <?= $visibility ? "$color $bg_color" : "text-gray-300 bg-gray-100" ?> rounded-md p-4">
        <div class="col-span-2 lg:col-span-1"><i class="<?= $icon ?> text-3xl"></i></div>
        <div class="col-span-10 lg:col-span-2 text-xl font-bold"><?= $name ?></div>
        <div class="col-span-full lg:col-span-7 overflow-hidden">
          <a href="<?= $link ?>" class="underline cursor-pointer"><?= $link ?></a>
          <input type="url" value="<?= $link ?>" class="text-black w-full p-2 rounded-md hidden">
        </div>
        <div class="col-span-1 sm:col-span-2 md:col-span-1 justify-self-center px-2 py-1 cursor-pointer rounded-md transition-colors duration-300 bg-black bg-opacity-0 hover:bg-opacity-10">
          <i class="fas <?= $visibility ? 'fa-eye' : 'fa-eye-slash text-gray-700' ?>"></i>
        </div>
        <div class="col-span-1 sm:col-span-2 md:col-span-1 justify-self-center px-2 py-1 cursor-pointer rounded-md transition-colors duration-300 bg-black bg-opacity-0 hover:bg-opacity-10">
          <i class="fas fa-pencil-alt <?= $visibility ? '' : 'text-gray-700' ?>"></i>
        </div>
      </div>
    <?php } ?>
  </div>
</div>
@endsection