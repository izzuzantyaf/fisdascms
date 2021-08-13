@extends('layouts.app')
@section('title','Profile')

@section('content')
<div class="admin-profile flex flex-col flex-grow gap-6 pt-8 p-4">

  <a href="/" class="self-start">
    <div class="flex gap-4 items-center">
      <i class="fas fa-arrow-left"></i>
      <span>Kembali</span>
    </div>
  </a>

  <h1 class="lg:max-w-md sm:self-center text-4xl font-bold">Profil kamu</h1>

  <div class="grid grid-cols-2 gap-4 p-4 lg:max-w-md sm:self-center bg-white rounded-md shadow-md">

    <div class="edit-admin-btn flex gap-2 items-center col-span-full justify-self-end font-semibold text-blue-500">
      <i class="fas fa-pen"></i>
      <span>Edit</span>
    </div>

    <?php [
      'username' => $username,
      'email' => $email,
      'name' => $name,
    ] = $logged_admin; ?>
    <div class="justify-self-start">Nama</div>
    <div class="justify-self-end text-right"><?= $name ?></div>
    <div class="justify-self-start">Username</div>
    <div class="justify-self-end text-right"><?= $username ?></div>
    <div class="justify-self-start">Email</div>
    <div class="justify-self-end text-right"><?= $email ?></div>
    <button type="submit" name="btn_delete_admin" value="true" class="col-span-full justify-self-end justify-center py-2 px-8 border border-red-600 font-medium rounded-md text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
      Hapus akun
    </button>
  </div>
</div>
@endsection