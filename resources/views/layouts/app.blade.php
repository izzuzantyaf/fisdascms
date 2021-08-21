@extends('layouts.html')

@section('app-page-js')
<script defer type="text/javascript" src="/js/sidebar.js"></script>
<script defer type="text/javascript" src="/js/avatar.js"></script>
@yield('functionality-js')
@endsection

@section('main')
<!-- navbar -->
<x-navbar />
<div class="lg:container mx-auto">
  {{-- @if(auth()->user()->email_verified_at == null)
  <x-email-verification-warning />
  @endif --}}
  <div class="flex gap-4 items-start">
    <!-- sidebar -->
    <x-sidebar />
    <!-- main content -->
    @yield('content')
  </div>
</div>
@endsection