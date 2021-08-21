@extends('layouts.html')
@section('title', 'Register')

@section('main')
<div class="min-h-screen bg-white flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
  <div class="flex flex-col w-full max-w-xs items-stretch gap-4">
    <img src="https://res.cloudinary.com/hxquybrtx/image/upload/v1613030969/logo/new_fisdas_logo_gipexs.png" alt="fisdas cms logo" class="mx-auto" width="128" height="102">
    <h2 class="text-center text-3xl font-extrabold text-gray-900">
      Buat akun
    </h2>
    <form class="flex flex-col gap-4" action="{{ route('register.create') }}" method="POST">
      @csrf
      <!-- email -->
      <input id="email" name="email" type="email" autocomplete="on" required class="rounded-md px-3 py-2 border @error('email') border-red-600 @enderror placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500" placeholder="Email" value="{{ old('email') }}">
      @error('email')
      <div class="text-red-600 text-xs">{{ $message }}</div>
      @enderror
      <!-- name -->
      <input id="name" name="name" type="text" autocomplete="on" maxlength="255" required class="rounded-md px-3 py-2 border @error('name') border-red-600 @enderror placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500" placeholder="Nama" value="{{ old('name') }}">
      @error('name')
      <div class="text-red-600 text-xs">{{ $message }}</div>
      @enderror
      <!-- password -->
      <input id="password" name="password" type="password" minlength="8" maxlength="255" autocomplete="off" required class="rounded-md px-3 py-2 border @error('password') border-red-600 @enderror placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500" placeholder="Password">
      @error('password')
      <div class="text-red-600 text-xs">{{ $message }}</div>
      @enderror
      <!-- submit button -->
      <button type="submit" class="group flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Register
      </button>
    </form>
    <p class="self-center text-xs">Sudah punya akun?, <a href="{{ route('login') }}" class="text-blue-500">Login disini</a></p>
  </div>
</div>
@endsection