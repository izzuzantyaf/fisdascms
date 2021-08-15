<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public static function authenticate(Request $request)
    {
        $validatedCredentials = $request->validate([
            'username' => ['required'],
            'password' => ['required', 'max:255'],
        ]);

        $existing_admin = Admin::firstWhere('username', $validatedCredentials['username']);

        if ($existing_admin == null)
            return false;

        if (!Hash::check($validatedCredentials['password'], $existing_admin->password))
            return false;

        Auth::attempt($validatedCredentials);
        $request->session()->regenerate();
        return true;
    }
}
