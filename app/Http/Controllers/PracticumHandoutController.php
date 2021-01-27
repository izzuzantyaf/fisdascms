<?php

namespace App\Http\Controllers;

use App\Models\PracticumHandout;
use Illuminate\Http\Request;

class PracticumHandoutController extends Controller
{
    public static function get_semester1_handouts()
    {
        return PracticumHandout::where('semester', 1)->get();
    }

    public static function get_semester2_handouts()
    {
        return PracticumHandout::where('semester', 2)->get();
    }

    public static function update_handouts(Request $request)
    {
    }
}
