<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

class EmailVerificationController extends Controller
{
    public static function notice()
    {
        return view('auth.verify-email');
    }

    public static function verify(EmailVerificationRequest $request)
    {
        $request->fulfill();
        return redirect()->route('home');
    }

    public static function send(Request $request)
    {
        $request->user()->sendEmailVerificationNotification();
        return back()->with('resend_email_verification', 'Link verifikasi terkirim');
    }
}
