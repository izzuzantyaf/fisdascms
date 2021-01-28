@extends('layouts.app')
@section('title','Asisten')

@section('content')
<div class="assistants overflow-x-auto flex-grow p-8">
  <h1 class="text-4xl font-bold">Asisten</h1>
  <div class="mt-8 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle sm:px-6 lg:px-8">
      <div class="shadow border-b border-gray-200 sm:rounded-lg">
        <table class="w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kode
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tingkat
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Link feedback
              </th>
              <th scope="col" class="relative px-6 py-3">
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
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="text-sm font-medium text-gray-900">
                      <?= $name ?>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900"><?= $code ?></div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm <?= $gender === 'male' ? 'text-blue-500' : 'text-pink-500' ?>">
                  <?= $gender ?>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <?= $standing ?>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <?= $feedback_link ?>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
              </tr>
            <?php } ?>
            <!-- More items... -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
@endsection