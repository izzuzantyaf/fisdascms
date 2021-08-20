@extends('layouts.app')

@section('content')
<div class="dashboard container mx-auto flex-grow px-6 lg:px-4 mt-8 space-y-8">
  <h1 class="title text-4xl font-bold">Dashboard</h1>
  <div class="container grid grid-cols-12 gap-4">
    <div class="col-span-full sm:col-span-6 lg:col-span-4 transition-shadow duration-300 shadow-sm hover:shadow-md bg-white text-blue-500 rounded-xl p-4 flex items-center">
      <div class="bg-blue-100 p-4 rounded-full">
        <i class="fas fa-university text-4xl"></i>
      </div>
      <div class="flex-grow text-right">
        <div class="text-6xl font-bold">{{ $total_faculty }}</div>
        <div class="text-2xl">Fakultas</div>
      </div>
    </div>
    <div class="col-span-full sm:col-span-6 lg:col-span-4 transition-shadow duration-300 shadow-sm hover:shadow-md bg-white text-blue-500 rounded-xl p-4 flex items-center">
      <div class="bg-blue-100 p-4 rounded-full">
        <i class="fas fa-book text-4xl"></i>
      </div>
      <div class="flex-grow text-right">
        <div class="text-6xl font-bold">{{ $total_modules }}</div>
        <div class="text-2xl">Modul</div>
      </div>
    </div>
    <div class="col-span-full sm:col-span-6 lg:col-span-4 transition-shadow duration-300 shadow-sm hover:shadow-md bg-white text-blue-500 rounded-xl p-4 flex items-center">
      <div class="bg-blue-100 p-4 rounded-full">
        <i class="fas fa-user-alt text-4xl"></i>
      </div>
      <div class="flex-grow text-right">
        <div class="text-6xl font-bold">{{ $total_assistants }}</div>
        <div class="text-2xl">Asisten</div>
      </div>
    </div>
  </div>
</div>
@endsection