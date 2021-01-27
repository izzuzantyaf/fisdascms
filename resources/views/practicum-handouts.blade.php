@extends('layouts.app')
@section('title','Modul')

@section('content')
<div class="handouts flex-grow p-8">
  <h1 class="text-4xl font-bold ">Modul praktikum</h1>
  <div class="layout flex flex-wrap mt-8 gap-8">

    <div class="semester-1 flex flex-col gap-4 flex-grow">
      <h3 class="text-2xl font-semibold">Semester 1</h3>
      <form action="/practicum-handouts" method="post">
        @csrf
        <div class="handout-form-list flex flex-col gap-8 p-4 border border-gray-300 rounded-lg">
          <?php foreach ($semester1_handouts as [
            'faculty' => $faculty,
            'lang' => $lang,
            'file_url' => $file_url,
            'semester' => $semester,
          ]) { ?>
            <div class="handout-section flex flex-col gap-4">
              <div class="handout-info">
                <div class="handout-title text-2xl font-semibold"><?= $faculty ?></div>
                <div class="handout-lang"><?php echo $lang === 'id' ? 'Bahasa Indonesia' : 'English' ?></div>
              </div>
              <div class="handout-link-input flex border rounded-md">
                <input type="url" name="<?= $faculty . '_' . $semester . '_' . $lang . '_handout' ?>" id="<?= $faculty . '_' . $semester . '_' . $lang . '_handout' ?>" class="p-2 focus:ring-indigo-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 flex-grow rounded-l-md" placeholder="File link" value="<?= $file_url ?>" disabled>
                <div id="<?= $faculty . '_' . $semester . '_' . $lang . '_handout' ?>" class="edit-icon rounded-r-md p-2 flex justify-center items-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
                  <i class="fas fa-pen text-gray-500"></i>
                </div>
              </div>
            </div>
          <?php } ?>
          <button type="submit" name="btn_handout1_submit" value="true" class="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Submit
          </button>
        </div>
      </form>
    </div>

    <div class="semester-2 flex flex-col gap-4 flex-grow">
      <h3 class="text-2xl font-semibold">Semester 2</h3>
      <form action="/practicum-handouts" method="post">
        <div class="handout-form-list flex flex-col gap-8 p-4 border border-gray-300 rounded-lg">
          <?php foreach ($semester2_handouts as [
            'faculty' => $faculty,
            'lang' => $lang,
            'file_url' => $file_url,
            'semester' => $semester,
          ]) { ?>
            <div class="handout-section flex flex-col gap-4">
              <div class="handout-info">
                <div class="handout-title text-2xl font-semibold"><?= $faculty ?></div>
                <div class="handout-lang"><?php echo $lang === 'id' ? 'Bahasa Indonesia' : 'English' ?></div>
              </div>
              <div class="handout-link-input flex border rounded-md">
                <input type="url" name="<?= $faculty . '_' . $semester . '_' . $lang . '_handout' ?>" id="<?= $faculty . '_' . $semester . '_' . $lang . '_handout' ?>" class="p-2 focus:ring-indigo-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 flex-grow rounded-l-md" placeholder="File link" value="<?= $file_url ?>" disabled>
                <div id="<?= $faculty . '_' . $semester . '_' . $lang . '_handout' ?>" class="edit-icon rounded-r-md p-2 flex justify-center items-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
                  <i class="fas fa-pen text-gray-500"></i>
                </div>
              </div>
            </div>
          <?php } ?>
          <button type="submit" name="btn_handout2_submit" value="true" class="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Submit
          </button>
        </div>
      </form>
    </div>

  </div>
</div>
@endsection