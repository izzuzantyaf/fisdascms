@extends('layouts.html')
@section('title', 'Login')

@section('main')
@if(session('registration_message'))
<x-banner />
@endif
<div class="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
  <div class="flex flex-col w-full max-w-xs items-stretch gap-4">
    <img src="https://res.cloudinary.com/hxquybrtx/image/upload/v1613030969/logo/new_fisdas_logo_gipexs.png" alt="fisdas cms logo" class="w-32 mx-auto">
    <h2 class="text-3xl font-extrabold self-center">
      Log in dulu
    </h2>
    <form action="/login" method="POST" class="flex flex-col gap-4">
      @csrf
      <input type="hidden" name="remember" value="true">
      <input id="username" name="username" type="text" autocomplete="on" required class="rounded-md w-full px-3 py-2 border @error('username') border-red-600 @else border-gray-300 @enderror placeholder-gray-500 focus:outline-none focus:border-indigo-500" placeholder="Username" value="{{ old('username') }}">
      @error('username')
      <div class="text-red-600 text-xs">{{ $message }}</div>
      @enderror
      <input id="password" name="password" type="password" autocomplete="off" required class="rounded-md w-full px-3 py-2 border @error('password') border-red-600 @else border-gray-300 @enderror placeholder-gray-500 focus:outline-none focus:border-indigo-500" placeholder="Password" value="{{ old('password') }}">
      @error('password')
      <div class="text-red-600 text-xs">{{ $message }}</div>
      @enderror
      <div class="text-sm py-2 self-end">
        <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
          Aduh, lupa password?
        </a>
      </div>
      <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Masuk
      </button>
    </form>
    <p class="self-center text-xs">Belum punya akun?, <a href="/register" class="text-blue-500">Daftar disini</a></p>
  </div>
</div>
@endsection