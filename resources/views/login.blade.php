<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Login | Fisdas CMS</title>
  <link rel="stylesheet" href="/css/app.css">

</head>

<body>

  @if(session('registration_message'))
  <x-banner />
  @endif

  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-xs w-full">

      <img src="https://res.cloudinary.com/hxquybrtx/image/upload/v1613030969/logo/new_fisdas_logo_gipexs.png" alt="fisdas cms logo" class="w-32 mx-auto">

      <form action="/login" method="POST">
        @csrf
        <input type="hidden" name="remember" value="true">
        <div class="flex flex-col gap-4 shadow-sm -space-y-px mt-8">

          <h2 class="text-3xl font-extrabold text-gray-900 self-center">
            Log in dulu
          </h2>

          <input id="username" name="username" type="text" autocomplete="on" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" value="{{ old('username') }}">

          <input id="password" name="password" type="password" autocomplete="off" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value="{{ old('password') }}">

          @if(session('login_error'))
          <div class="text-red-600 text-xs">Username atau password kamu salah</div>
          @endif

          <div class="text-sm py-2 self-end">
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
              Aduh, lupa password?
            </a>
          </div>

          <button type="submit" name="btn_login" value="true" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Masuk
          </button>

          <p class="self-center text-xs">Belum punya akun?, <a href="/register" class="text-blue-500">Daftar disini</a></p>
        </div>

      </form>
    </div>
  </div>

  <script type="text/javascript" src="/js/app.js"></script>
</body>

</html>