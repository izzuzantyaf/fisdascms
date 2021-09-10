<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public static function create(Request $request)
    {
        $validatedCredentials = $request->validate([
            // 'username' => 'required|max:255|unique:admins',
            'email' => 'required|email:rfc,dns|max:255|unique:admins',
            'name' => 'required|max:255',
            'password' => 'required|min:8',
        ]);

        $newAdmin = new Admin;
        // $newAdmin->username = $validatedCredentials['username'];
        $newAdmin->email = $validatedCredentials['email'];
        $newAdmin->name = $validatedCredentials['name'];
        $newAdmin->password = Hash::make($validatedCredentials['password']);
        $newAdmin->save();

        // event(new Registered($newAdmin));

        return redirect()
            ->route('login')
            ->with('registration_message', 'Registrasi berhasil, kamu sekarang admin.');
    }
}
