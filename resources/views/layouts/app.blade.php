<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title','Dashboard') | Fisdas CMS</title>
  <link rel="stylesheet" href="/css/app.css">
</head>

<body>

  @include('components.navbar')

  @include('components.sidebar')

  @yield('content')

  <script type="text/javascript" src="/js/app.js"></script>
</body>

</html>