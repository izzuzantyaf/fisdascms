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
    <div class="max-w-md w-full space-y-8">

      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in dulu
        </h2>
      </div>

      <form class="mt-8 space-y-6" action="/login" method="POST">
        @csrf
        <input type="hidden" name="remember" value="true">
        <div class="flex flex-col gap-2 shadow-sm -space-y-px">

          <div>
            <label for="username" class="sr-only">Username</label>
            <input id="username" name="username" type="text" autocomplete="on" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" value="{{ old('username') }}">
          </div>

          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="off" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value="{{ old('password') }}">
          </div>

          @if(session('login_error'))
          <div class="text-red-600 text-xs">Username atau password kamu salah</div>
          @endif
        </div>

        <div class="flex items-center justify-end">
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Aduh, lupa password?
            </a>
          </div>
        </div>

        <div>
          <button type="submit" name="btn_login" value="true" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Log in
          </button>
        </div>
      </form>
    </div>
  </div>

  <script type="text/javascript" src="/js/app.js"></script>
</body>

</html>