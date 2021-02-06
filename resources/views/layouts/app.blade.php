<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title','Dashboard') | Fisdas CMS</title>
  <link rel="stylesheet" href="/css/app.css">
  <script defer type="text/javascript" src="/js/app.js"></script>
  <script defer src="https://app.simplefileupload.com/buckets/a29c61c07761ea09e44844a7c3fbd2bb.js"></script>
</head>

<body>

  <x-navbar />

  <div class="flex min-h-screen">
    <x-sidebar />
    @yield('content')
  </div>

</body>

</html>