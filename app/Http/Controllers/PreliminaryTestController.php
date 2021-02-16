<?php

namespace App\Http\Controllers;

use App\Models\PracticumModule;
use Illuminate\Http\Request;

class PreliminaryTestController extends Controller
{
    public static function get_preliminary_tests()
    {
        return PracticumModule::select('id', 'name', 'acronym', 'icon', 'preliminary_test_link', 'preliminary_test_visibility')
            ->where('lang', 'id')
            ->orderBy('id', 'asc')
            ->get();
    }

    public static function get_visible_preliminary_tests()
    {
        return PracticumModule::select('id', 'name', 'acronym', 'reactjs_icon', 'preliminary_test_link', 'preliminary_test_visibility')
            ->where('lang', 'id')
            ->where('preliminary_test_visibility', 1)
            ->orderBy('id', 'asc')
            ->get();
    }

    public static function update_preliminary_test(Request $request)
    {
        $request_input = $request->input();
        array_pop($request_input);
        array_shift($request_input);
        foreach ($request_input as $key => $value) {
            [$column, $id] = explode('-', $key);
            PracticumModule::where('id', $id)
                ->update([$column => $value]);
        }
    }
}
