<form action="{{ route('verification.send') }}" method="POST">
    @csrf
    <div class="email-verification-warning p-2 bg-yellow-200 text-yellow-600 text-center lg:mt-4 lg:rounded-md">
        Link untuk verifikasi email sudah terkirim ke email kamu, atau <button class="underline">kirim ulang link verifikasi</button>
    </div>
</form>
@if(session('resend_email_verification'))
<x-success-banner message="{{ session('resend_email_verification') }}" />
@endif