@extends('layouts.app')
@section('title','Ubah Password')

@section('content')
<div class="change-password flex flex-col flex-grow gap-6 pt-8 p-6">

  <h1 class="sm:self-center text-4xl font-bold">Ubah password</h1>

  <form action="{{ route('admin.change-password.update', ['id' => auth()->id()]) }}" method="POST" class="change-password-form grid grid-cols-2 gap-4 p-4 lg:max-w-md sm:self-center bg-white rounded-md shadow-md">
    @method('PUT')
    @csrf
    <!-- current password -->
    <div class="col-span-full sm:col-span-1">Password sekarang</div>
    <input
      type="password"
      name="old_password"
      required
      maxlength="255"
      autofocus
      class="col-span-full sm:col-span-1 rounded-md w-full px-3 py-2 border @error('old_password') border-red-600 @enderror placeholder-gray-500 focus:outline-none focus:border-indigo-500"
      placeholder="Password sekarang"/>
    @error('old_password')
      <div class="col-span-full text-red-600 text-xs text-right">{{ $message }}</div>
    @enderror
    <!-- new password -->
    <div class="col-span-full sm:col-span-1">Password baru</div>
    <input
      type="password" 
      name="new_password" 
      required 
      minlength="8" 
      maxlength="255" 
      class="col-span-full sm:col-span-1 rounded-md w-full px-3 py-2 border @error('new_password') border-red-600 @enderror placeholder-gray-500 focus:outline-none focus:border-indigo-500" 
      placeholder="Password baru"/>
    <input
      type="password"
      name="new_password_confirmation"
      required
      minlength="8"
      maxlength="255"
      class="col-span-full sm:col-span-1 sm:col-start-2 rounded-md w-full px-3 py-2 border @error('new_password') border-red-600 @enderror placeholder-gray-500 focus:outline-none focus:border-indigo-500"
      placeholder="Tulis ulang"/>
    @error('new_password')
      <div class="col-span-full text-red-600 text-xs text-right">{{ $message }}</div>
    @enderror
    <!-- save button -->
    <button class="change-btn col-span-full py-2 px-6 text-center font-medium rounded-md bg-blue-600 text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">Ubah</button>
  </form>
</div>
@endsection