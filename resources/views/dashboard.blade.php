@extends('layouts.app')

@section('content')
<div class="dashboard container mx-auto flex-grow px-6 lg:px-4 pb-8 mt-8 space-y-8">
  <h1 class="title text-4xl font-bold">Dashboard</h1>
  <div class="container grid grid-cols-12 gap-6">
    {{-- total faculty --}}
    <div class="col-span-full sm:col-span-4 transition-shadow duration-300 shadow-sm hover:shadow-md bg-white text-blue-500 rounded-xl p-4 flex items-center">
      <div class="bg-blue-100 p-4 rounded-full">
        <i class="fas fa-university text-4xl"></i>
      </div>
      <div class="flex-grow text-right">
        <div class="text-6xl font-bold">{{ $total_faculty }}</div>
        <div class="text-2xl">Fakultas</div>
      </div>
    </div>
    {{-- total modules --}}
    <div class="col-span-full sm:col-span-4 transition-shadow duration-300 shadow-sm hover:shadow-md bg-white text-blue-500 rounded-xl p-4 flex items-center">
      <div class="bg-blue-100 p-4 rounded-full">
        <i class="fas fa-book text-4xl"></i>
      </div>
      <div class="flex-grow text-right">
        <div class="text-6xl font-bold">{{ $total_modules }}</div>
        <div class="text-2xl">Modul</div>
      </div>
    </div>
    {{-- total assistants --}}
    <div class="col-span-full sm:col-span-4 transition-shadow duration-300 shadow-sm hover:shadow-md bg-white text-blue-500 rounded-xl p-4 flex items-center">
      <div class="bg-blue-100 p-4 rounded-full">
        <i class="fas fa-user-alt text-4xl"></i>
      </div>
      <div class="flex-grow text-right">
        <div class="text-6xl font-bold">{{ $total_assistants }}</div>
        <div class="text-2xl">Asisten</div>
      </div>
    </div>

    {{-- overview --}}
    <div class="overview col-span-full sm:col-span-6 lg:col-span-8 space-y-2">
      <div class="title text-2xl">Overview</div>
      <div class="container grid lg:grid-cols-2 gap-6">
        {{-- others overview --}}
        <div class="others-overview bg-white shadow-md rounded-xl flex flex-col gap-4 p-4">
          @foreach ($others_overview as [
            'name' => $name,
            'status' => $status,
          ])
          <div class="flex justify-between items-center">
            <div class="data">
              {{ $name }}
            </div>
            @if($status)
              <div class="status text-xs text-green-500 font-bold">
                Aktif
              </div>
            @else
              <div class="status text-xs text-gray-300 font-bold">
                Nonaktif
              </div>
            @endif
          </div>
          @endforeach
        </div>
        {{-- social media overview --}}
        <div class="socmed-overview bg-white shadow-md rounded-xl flex flex-col gap-4 p-4">
          @foreach ($social_media_overview as [
            'name' => $name,
            'icon' => $icon,
            'color' => $color,
            'status' => $status,
          ])
          <div class="flex justify-between items-center">
            <div class="data flex items-center">
              <div class="icon w-12">
                <i class="{{ $icon }} {{ $color }} text-2xl"></i>
              </div>
              {{ $name }}
            </div>
            @if($status)
              <div class="status text-xs text-green-500 font-bold">
                Aktif
              </div>
            @else
              <div class="status text-xs text-gray-300 font-bold">
                Nonaktif
              </div>
            @endif
          </div>
          @endforeach
        </div>
      </div>
    </div>
    
    {{-- admin list --}}
    <div class="admin-list col-span-full sm:col-span-6 lg:col-span-4 flex flex-col gap-2">
      <div class="title text-2xl">Admin</div>
      <div class="card bg-blue-500 text-white rounded-xl p-4 flex flex-col gap-2">
        @foreach($admins as ['name' => $name])
        <div>{{ $name }}</div>
        @endforeach
      </div>
    </div>
  </div>
</div>
@endsection