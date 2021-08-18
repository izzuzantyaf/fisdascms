<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;

class PasswordResetController extends Controller
{
    public static function request(Request $request)
    {
        // validate the request
        $validatedCredentials = $request->validate([
            'email' => 'required|email:rfc,dns',
        ]);

        // check if the user exists
        $is_user_exists = Admin::where('email', $validatedCredentials['email'])->first();

        if ($is_user_exists == null)
            return back()->withInput()->withErrors(['email' => 'Email tidak terdaftar']);

        $request->session()->put('password_reset_admin_id', $is_user_exists);
        return redirect()->route('password-reset.new');
    }

    public static function reset(Request $request, $id)
    {
        // validate the request
        $validatedCredentials = $request->validate([
            'password' => 'required|min:8',
            'password_confirm' => 'required|same:password',
        ]);
        // update the password
        $is_reset_successful = Admin::where('id', $id)->update(['password' => bcrypt($validatedCredentials['password'])]);
        // forget the admin id in the session
        $request->session()->forget('password_reset_admin_id');

        return redirect()->route('login')->with(['password_reset_message' => 'Password berhasil diubah']);
    }
}
