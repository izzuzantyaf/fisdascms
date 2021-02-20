@extends('layouts.app')
@section('title','Asisten')

@section('content')
<div class="assistants overflow-x-auto flex-grow p-8">
  <h1 class="text-4xl font-bold">Asisten</h1>
  <div class="w-full mt-8 overflow-scroll max-h-screen shadow border border-gray-200 rounded-lg">
    <table class="divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr class="text-left text-xs font-medium text-gray-500 uppercase">
          <th scope="col" class="px-6 py-3 tracking-wider">
            Nama
          </th>
          <th scope="col" class="px-6 py-3 tracking-wider">
            Kode
          </th>
          <th scope="col" class="px-6 py-3 tracking-wider">
            Gender
          </th>
          <th scope="col" class="px-6 py-3 tracking-wider">
            Tingkat
          </th>
          <th scope="col" class="px-6 py-3 tracking-wider">
            Link feedback
          </th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <?php foreach ($assistants as [
          'name' => $name,
          'code' => $code,
          'gender' => $gender,
          'standing' => $standing,
          'feedback_link' => $feedback_link,
        ]) { ?>
          <tr class="text-xs">
            <td class="px-6 py-4 font-medium text-gray-900 capitalize">
              <?= $name ?>
            </td>
            <td class="px-6 py-4 text-gray-900 uppercase">
              <?= $code ?>
            </td>
            <td class="px-6 py-4 <?= $gender === 'male' ? 'text-blue-500' : 'text-pink-500' ?> capitalize">
              <?= $gender ?>
            </td>
            <td class="px-6 py-4 text-gray-500 capitalize">
              <?= $standing ?>
            </td>
            <td class="px-6 py-4 text-gray-500">
              <?= $feedback_link ?>
            </td>
            <td class="px-6 py-4 text-right font-medium">
              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
            </td>
          </tr>
        <?php } ?>
      </tbody>
    </table>
  </div>
</div>
@endsection