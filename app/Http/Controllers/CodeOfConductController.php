<?php

namespace App\Http\Controllers;

use App\Models\CodeOfConduct;
use Illuminate\Http\Request;

class CodeOfConductController extends Controller
{
    public static function get_code_of_conduct()
    {
        return CodeOfConduct::select()->get();
    }

    public static function update_code_of_conduct(Request $request)
    {
        $request_input = $request->input();
        array_pop($request_input);
        array_shift($request_input);
        foreach ($request_input as $key => $value) {
            [$column, $id] = explode('-', $key);
            CodeOfConduct::where('id', $id)
                ->update([$column => $value]);
        }
    }
}
