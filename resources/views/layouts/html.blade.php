<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title','Dashboard') | Fisdas CMS</title>
  <link rel="stylesheet" href="/css/app.css">
  <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico">
  <!-- <script type="text/javascript" src="https://media-library.cloudinary.com/global/all.js"></script> -->
  <script defer type="text/javascript" src="/js/app.js"></script>
</head>

<body class="bg-gray-50 text-sm">
  @yield('main')
</body>

</html>