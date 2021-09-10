<?php

namespace App\Http\Controllers;

use App\Models\Assistant;
use App\Models\ClassSchedule;
use App\Models\CodeOfConduct;
use App\Models\ModuleSchedule;
use App\Models\Organigram;
use App\Models\PracticumHandout;
use App\Models\PracticumModule;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public static function get_total_faculty()
    {
        return 2;
    }

    public static function get_total_modules()
    {
        return PracticumModule::count() / 2;
    }

    public static function get_total_assistants()
    {
        return Assistant::count();
    }

    public static function get_modules()
    {
        return PracticumModule::select(['id', 'acronym', 'icon'])
            ->where('lang', 'id')
            ->orderBy('id')
            ->get();
    }

    public static function get_statuses()
    {
        $code_of_conduct = CodeOfConduct::select('prepared_link')->first();
        $handouts = PracticumHandout::select(['faculty', 'lang', 'visibility'])->get();
        $class_shcedule = ClassSchedule::select('prepared_link')->first();
        $module_shcedules = ModuleSchedule::select(['faculty', 'prepared_link'])->get();
        $organigram = Organigram::select('prepared_link')->first();
    }
}
