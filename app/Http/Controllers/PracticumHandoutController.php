<?php

namespace App\Http\Controllers;

use App\Models\PracticumHandout;
use Illuminate\Http\Request;

class PracticumHandoutController extends Controller
{
    public static function get_handouts()
    {
        return PracticumHandout::orderBy('faculty', 'desc')
            ->orderBy('lang', 'desc')
            ->get();
    }

    public static function update_handouts(Request $request)
    {
        $request_input = $request->input();
        array_pop($request_input);
        array_shift($request_input);
        foreach ($request_input as $key => $value) {
            [$faculty, $lang, $column] = explode('-', $key);
            PracticumHandout::where('faculty', $faculty)
                ->where('lang', $lang)
                ->update([$column => $value]);
        }
    }
}
