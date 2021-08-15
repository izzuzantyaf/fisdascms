<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public static function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        return true;
    }
}
