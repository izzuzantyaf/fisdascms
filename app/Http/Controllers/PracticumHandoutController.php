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
        $request_input = $request->input();
        array_pop($request_input);
        array_shift($request_input);
        foreach ($request_input as $key => $value) {
            [$faculty, $semester, $lang] = explode('_', $key);
            PracticumHandout::where('faculty', $faculty)
                ->where('semester', intval($semester))
                ->where('lang', $lang)
                ->update(['file_url' => $value]);
        }
    }
}
