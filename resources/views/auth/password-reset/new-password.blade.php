@extends('layouts.html')
@section('title', 'Reset Password')

@section('main')
<div class="password-reset-new-password min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
  <div class="flex flex-col w-full max-w-xs items-stretch gap-4">
    <form id="password" action="{{ route('password-reset.reset', ['id' => session('password_reset_admin_id')]) }}" method="POST" class="space-y-2">
      @method('PUT')
      @csrf
      <label for="password">Input password baru</label>
      <input type="password" name="password" placeholder="Password" minlength="8" maxlength="255" required autofocus class="rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
      @error('password')
      <div class="text-red-600 text-xs">{{ $message }}</div>
      @enderror
      <input type="password" name="password_confirm" placeholder="Tulis ulang" minlength="8" maxlength="255" required class="rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
      @error('password_confirm')
      <div class="text-red-600 text-xs">{{ $message }}</div>
      @enderror
    </form>
    <div class="navigator flex justify-between">
      <a href="{{ route('password-reset') }}" class="navigator-item">
        <i class="fas fa-arrow-left"></i>
        Kembali
      </a>
      <button type="submit" form="password" class="navigator-item">
        Selesai
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</div>
@endsection