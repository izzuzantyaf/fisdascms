<?php

namespace App\Http\Controllers;

use App\Models\CodeOfConduct;
use Illuminate\Http\Request;

class CodeOfConductController extends Controller
{
    public static function get_all_code_of_conducts()
    {
        return CodeOfConduct::select()->orderBy('order', 'asc')->get();
    }

    public static function get_all_visible_code_of_conducts()
    {
        return CodeOfConduct::select()
            ->where('image_url', '!=', null)
            ->orderBy('order', 'asc')
            ->get();
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
