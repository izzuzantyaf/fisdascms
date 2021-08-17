@extends('layouts.html')

@section('main')
<!-- navbar -->
<x-navbar />
<div class="lg:container mx-auto">
  <!-- @if(auth()->user()->email_verified_at == null)
  <x-email-verification-warning />
  @endif -->
  <div class="flex gap-4 min-h-screen">
    <!-- sidebar -->
    <x-sidebar />
    <!-- main content -->
    @yield('content')
  </div>
</div>
@endsection