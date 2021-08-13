<?php

namespace App\Http\Controllers;

use App\Models\PracticumModule;
use Illuminate\Http\Request;

class PracticumSimulatorController extends Controller
{
    public static function get_all()
    {
        return PracticumModule::select('id', 'name', 'acronym', 'icon', 'simulator_link', 'simulator_visibility')
            ->where('lang', 'id')
            ->orderBy('id', 'asc')
            ->get();
    }

    public static function get_visible()
    {
        return PracticumModule::select('id', 'name', 'acronym', 'reactjs_icon', 'simulator_link')
            ->where('lang', 'id')
            ->where('simulator_visibility', 1)
            ->orderBy('id', 'asc')
            ->get();
    }

    public static function update(Request $request)
    {
        $simulators = $request->input('practicum_simulators');
        $updated_simulators = [];
        foreach ($simulators as $key => $simulator) {
            $existing_simulator = PracticumModule::find($key);
            if ($existing_simulator->simulator_link != $simulator['link'])
                $existing_simulator->simulator_link = $simulator['link'];
            else if ($existing_simulator->simulator_visibility != $simulator['visibility'])
                $existing_simulator->simulator_visibility = $simulator['visibility'];
            else
                continue;
            $is_update_success = $existing_simulator->save();
            if ($is_update_success) {
                $updated_simulator = PracticumModule::find($key);
                array_push($updated_simulators, $updated_simulator->acronym);
            }
        }
        return $updated_simulators;
    }
}
