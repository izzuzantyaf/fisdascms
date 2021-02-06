<?php

namespace App\Http\Controllers;

use App\Models\ClassSchedule;
use App\Models\ModuleSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScheduleController extends Controller
{
    public static function get_class_schedule()
    {
        return ClassSchedule::all()[0];
    }

    public static function get_module_schedule()
    {
        return ModuleSchedule::all();
    }

    public static function update_schedule(Request $request)
    {
        $request_input = $request->input();
        array_shift($request_input);
        array_pop($request_input);

        $request_input = array_filter($request_input, function ($input) {
            return $input !== null;
        });

        if ($request_input) {
            foreach ($request_input as $key => $value) {
                [$table, $column, $id] = explode('-', $key);
                DB::table($table)->where('id', $id)->update([$column => $value]);
            }
        }
    }
}
