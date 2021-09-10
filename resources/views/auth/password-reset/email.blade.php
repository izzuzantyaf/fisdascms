@extends('layouts.html')
@section('title', 'Reset Password')

@section('main')
<div class="password-reset-email-input min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
  <div class="flex flex-col w-full max-w-xs items-stretch gap-4">
    <form id="email" action="{{ route('password-reset.request') }}" method="POST" class="space-y-2">
      @csrf
      <label for="email">Input email kamu</label>
      <input type="email" name="email" placeholder="Email" required autofocus autocomplete="true" class="rounded-md w-full px-3 py-2 border @error('email') border-red-600 @else border-gray-300 @enderror placeholder-gray-500 focus:outline-none focus:border-indigo-500" value="{{ old('email') }}" />
      @error('email')
      <div class="text-red-600 text-xs">{{ $message }}</div>
      @enderror
    </form>
    <div class="navigator flex justify-between">
      <a href="{{ route('login') }}" class="navigator-item">
        <i class="fas fa-arrow-left"></i>
        Batal
      </a>
      <button type="submit" form="email" class="navigator-item">
        Lanjut
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</div>
@endsection