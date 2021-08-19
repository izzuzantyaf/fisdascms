@extends('layouts.app')
@section('title','Profil')

@section('content')
<div class="admin-profile flex flex-col flex-grow gap-6 pt-8 p-6">

  @if(session('admin_update_message'))
  <x-success-banner message="{{ session('admin_update_message') }}" />
  @endif

  <h1 class="sm:self-center text-4xl font-bold">Profil kamu</h1>

  <form action="{{ route('admin.update', ['id' => auth()->id()]) }}" method="POST" class="admin-profile-form grid grid-cols-2 gap-4 p-4 lg:max-w-md sm:self-center bg-white rounded-md shadow-md">
    @method('PUT')
    @csrf
    <!-- name -->
    <div>Nama</div>
    <div class="name non-edit-el text-right">{{ auth()->user()->name }}</div>
    <!-- name input -->
    <input type="text" name="name" required maxlength="255" class="edit-el hidden rounded-md w-full px-3 py-2 border placeholder-gray-500 focus:outline-none focus:border-indigo-500" value="{{ auth()->user()->name }}" />
    <!-- email -->
    <div>Email</div>
    <div class="email non-edit-el text-right">{{ auth()->user()->email }}</div>
    <!-- email input -->
    <input type="email" name="email" maxlength="255" required class="edit-el hidden rounded-md w-full px-3 py-2 border placeholder-gray-500 focus:outline-none focus:border-indigo-500" value="{{ auth()->user()->email }}" />
    @error('email')
      <div class="col-span-full text-red-600 text-xs text-right">{{ $message }}</div>
    @enderror
    <!-- password input -->
    <div>Password</div>
    <a href="{{ route('admin.change-password') }}" class="text-blue-600 underline text-right">Ubah password?</a>
    <!-- cancel button -->
    <a class="edit-el hidden" href="{{ route('admin') }}">
      <div class="cancel-btn py-2 px-6 text-center font-medium rounded-md text-gray-600 transition-colors duration-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer">Batal</div>
    </a>
    <!-- save button -->
    <button class="save-btn edit-el hidden py-2 px-6 text-center font-medium rounded-md bg-blue-600 text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">Simpan</button>
    <!-- edit button -->
    <div class="edit-btn non-edit-el col-span-full py-2 px-6 text-center font-medium rounded-md border border-blue-300 text-blue-600 transition-colors duration-300 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">Edit</div>
    <!-- delete button -->
    <div class="delete-btn col-span-full py-2 px-6 text-center font-medium rounded-md text-red-600 transition-colors duration-300 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer">
      Hapus akun
    </div>
  </form>
  <x-delete-confirmation-modal action="{{ route('admin.delete', ['id' => auth()->id()]) }}" message="Akun kamu akan terhapus dan otomatis log out"/>
</div>
@endsection