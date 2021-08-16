<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public static function index(Request $request)
    {
        if ($request->session()->has('logged_admin'))
            return redirect()->route('home');
        return view('login');
    }

    public static function authenticate(Request $request)
    {
        $validatedCredentials = $request->validate([
            'email' => ['required', 'email:rfc,dns', 'max:255'],
            'password' => ['required', 'max:255'],
        ]);

        if (Auth::attempt($validatedCredentials)) {
            $request->session()->regenerate();
            return redirect()->intended();
        }

        return back()
            ->withInput($request->except(['password']))
            ->withErrors(['login_error' => 'Login gagal']);
    }
}
