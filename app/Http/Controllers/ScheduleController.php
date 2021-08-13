<?php

namespace App\Http\Controllers;

use App\Models\ClassSchedule;
use App\Models\ModuleSchedule;
use Illuminate\Http\Request;

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

    public static function get_all_schedule()
    {
        return [
            'class_schedule' => ClassSchedule::all()[0],
            'module_schedule' => ModuleSchedule::all(),
        ];
    }

    public static function update_class_schedule($class_schedule)
    {
        $existing_class_schedule = ClassSchedule::find($class_schedule['id']);
        if ($existing_class_schedule->original_url == $class_schedule['file_url'])
            return false;
        $existing_class_schedule->original_url = $class_schedule['file_url'];
        $existing_class_schedule->prepared_url = str_replace('view', 'preview', $class_schedule['file_url']);
        return $existing_class_schedule->save() ? ['jadwal kelas'] : false;
    }

    public static function update_module_schedule($module_schedules)
    {
        $updated_module_schedules = [];
        foreach ($module_schedules as $key => $module_schedule) {
            $existing_module_schedule = ModuleSchedule::find($key);
            if ($existing_module_schedule->original_url == $module_schedule['file_url'])
                continue;
            $existing_module_schedule->original_url = $module_schedule['file_url'];
            $existing_module_schedule->prepared_url = str_replace('view', 'preview', $module_schedule['file_url']);
            $is_update_success = $existing_module_schedule->save();
            if ($is_update_success) {
                $updated_module_schedule = ModuleSchedule::find($key);
                array_push($updated_module_schedules, "jadwal modul $updated_module_schedule->faculty");
            }
        }
        return $updated_module_schedules;
    }

    public static function update(Request $request)
    {
        $class_schedule_update_result = self::update_class_schedule($request->input('class_schedule'));
        $module_schedule_update_result = self::update_module_schedule($request->input('module_schedules'));
        return array_merge(
            is_array($class_schedule_update_result) ? $class_schedule_update_result : [],
            $module_schedule_update_result
        );
    }
}
