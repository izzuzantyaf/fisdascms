@include('header')
<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Buat akun
      </h2>
    </div>
    <form class="mt-8 space-y-6" action="/register" method="POST">
      @csrf
      <div class="shadow-sm flex flex-col gap-2 -space-y-px">
        @if(session('register_username_error'))
        <div class="text-red-600 text-xs">Username sudah dipakai</div>
        @endif
        <div>
          <label for="username" class="sr-only">Username</label>
          <input id="username" name="username" type="text" autocomplete="on" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" value="{{ old('username') }}">
        </div>
        @if(session('register_username_error'))
        <div class="text-red-600 text-xs">Email sudah dipakai</div>
        @endif
        <div>
          <label for="email" class="sr-only">Email</label>
          <input id="email" name="email" type="email" autocomplete="on" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email" value="{{ old('email') }}">
        </div>
        <div>
          <label for="name" class="sr-only">Nama lengkap</label>
          <input id="name" name="name" type="text" autocomplete="on" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Nama lengkap" value="{{ old('name') }}">
        </div>
        @if(session('register_password_error'))
        <div class="text-red-600 text-xs">Password tidak cocok</div>
        @endif
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" type="password" autocomplete="off" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value="{{ old('password') }}">
        </div>
        <div>
          <label for="password_confirm" class="sr-only">Password Confirm</label>
          <input id="password_confirm" name="password_confirm" type="password" autocomplete="off" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Tulis ulang password" value="{{ old('password_confirm') }}">
        </div>
      </div>

      <div>
        <button type="submit" name="btn_register" value="true" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Register
        </button>
      </div>
    </form>
  </div>
</div>
@include('footer')