<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Tel-U Physics Laboratory CMS website">
  <title>@yield('title','Dashboard') | Fisdas CMS</title>
  <link rel="stylesheet" type="text/css" href="/css/app.css">
  {{-- <link rel="preload" href="/css/app.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript>
    <link rel="stylesheet" href="/css/app.css">
  </noscript> --}}
  <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
  <!-- <script type="text/javascript" src="https://media-library.cloudinary.com/global/all.js"></script> -->
  <script defer type="text/javascript" src="/js/global.js"></script>
  @yield('app-page-js')
  @yield('components-js')
</head>

<body class="bg-gray-50 text-sm">
  @if (env('APP_ENV') !== 'production')
    <div class="bg-yellow-100 text-yellow-500 text-center py-2">Fisdas CMS (Beta)</div>
  @endif
  @yield('main')
</body>

</html>