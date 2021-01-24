<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title','Dashboard') | Fisdas CMS</title>
  <link rel="stylesheet" href="/css/app.css">
  <!-- <script defer src="/node_modules/@fortawesome/fontawesome-free/js/brands.js"></script>
  <script defer src="/node_modules/@fortawesome/fontawesome-free/js/solid.js"></script>
  <script defer src="/node_modules/@fortawesome/fontawesome-free/js/fontawesome.js"></script> -->
  <script defer type="text/javascript" src="/js/app.js"></script>
</head>

<body>

  @include('components.navbar')

  <div class="flex border h-screen">
    @include('components.sidebar')
    @yield('content')
  </div>

</body>

</html>