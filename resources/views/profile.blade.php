@extends('layouts.app')
@section('title','Profile')

@section('content')
<div class="admin-profile flex flex-col flex-grow gap-6 p-8">

  <a href="/" class="self-start">
    <div class="flex gap-4 items-center">
      <i class="fas fa-arrow-left"></i>
      <span>Kembali</span>
    </div>
  </a>

  <h1 class="text-4xl font-bold">Profil kamu</h1>

  <div class="flex flex-col gap-4 p-4 bg-white rounded-md shadow-md">
    <?php [
      'username' => $username,
      'email' => $email,
      'name' => $name,
    ] = get_object_vars($logged_admin); ?>
    <div>Username : <?= $username ?></div>
    <div>Email : <?= $email ?></div>
    <div>Nama : <?= $name ?></div>
    <button type="submit" name="btn_delete_admin" value="true" class="self-end justify-center py-2 px-8 border border-red-600 font-medium rounded-md text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
      Hapus akun
    </button>
  </div>
</div>
@endsection