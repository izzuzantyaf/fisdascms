<?php

namespace App\Http\Controllers;

use App\Models\PracticumModule;
use Illuminate\Http\Request;

class PracticumSimulatorController extends Controller
{
    public static function get_practicum_simulators()
    {
        return PracticumModule::select('id', 'name', 'acronym', 'icon', 'simulator_link', 'simulator_visibility')
            ->where('lang', 'id')
            ->orderBy('id', 'asc')
            ->get();
    }

    public static function get_visible_practicum_simulators()
    {
        return PracticumModule::select('id', 'name', 'acronym', 'reactjs_icon', 'simulator_link')
            ->where('simulator_visibility', 1)
            ->orderBy('id', 'asc')
            ->get();
    }

    public static function update_practicum_simulator(Request $request)
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
