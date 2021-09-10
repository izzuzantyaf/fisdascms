@extends('layouts.html')
@section('title', 'Verifikasi email')

@section('main')
<form action="{{ route('verification.send') }}" method="POST">
  <button class="p-2 rounded-md bg-blue-600">Resend</button>
  @if(session('message'))
  <div>{{ $message }}</div>
  @endif
</form>
@endsection