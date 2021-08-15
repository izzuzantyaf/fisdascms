@extends('layouts.html')

@section('main')
<!-- navbar -->
<x-navbar />
<div class="lg:container mx-auto">
  <div class="flex gap-4 min-h-screen">
    <?php $current_route = explode('/', url()->current())[3] ?>
    <!-- sidebar -->
    <x-sidebar :current-route="$current_route" />
    <!-- main content -->
    @yield('content')
  </div>
</div>
@endsection