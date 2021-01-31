<?php

namespace App\Http\Controllers;

use App\Models\PracticumModule;
use Illuminate\Http\Request;

class PreliminaryTestController extends Controller
{
    public static function get_preliminary_tests()
    {
        return PracticumModule::select('id', 'name', 'acronym', 'icon', 'preliminary_test_link')
            ->where('lang', 'id')
            ->orderBy('id', 'asc')
            ->get();
    }

    public static function update_preliminary_test(Request $request)
    {
        $request_input = $request->input();
        array_pop($request_input);
        array_shift($request_input);
        foreach ($request_input as $key => $preliminary_test_link) {
            $practicum_module_id = explode('_', $key);
            $practicum_module_id = $practicum_module_id[count($practicum_module_id) - 1];
            PracticumModule::where('id', $practicum_module_id)
                ->update(['preliminary_test_link' => $preliminary_test_link]);
        }
    }
}
