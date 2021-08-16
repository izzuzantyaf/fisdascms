<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
            'username' => ['required', 'max:255'],
            'password' => ['required', 'max:255'],
        ]);

        $existing_admin = Admin::firstWhere('username', $validatedCredentials['username']);

        if ($existing_admin == null)
            return back()
                ->withInput($request->except(['password']))
                ->withErrors(['username' => 'Kamu belum terdaftar']);

        if (!Hash::check($validatedCredentials['password'], $existing_admin->password))
            return back()
                ->withInput($request->except(['password']))
                ->withErrors(['password' => 'Coba cek lagi password kamu']);

        $request->session()->put('logged_admin', $existing_admin);

        return redirect()->route('home');
    }
}
