<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Assistant;
use App\Models\ClassSchedule;
use App\Models\CodeOfConduct;
use App\Models\ModuleSchedule;
use App\Models\Organigram;
use App\Models\PracticumHandout;
use App\Models\PracticumModule;
use App\Models\SocialMedia;
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
        return PracticumModule::select('id', 'acronym', 'icon')
            ->where('lang', 'id')
            ->orderBy('id')
            ->get();
    }

    public static function get_admin()
    {
        return Admin::select('name')->orderBy('name', 'ASC')->get();
    }

    public static function get_others_overview()
    {
        $code_of_conduct  = CodeOfConduct::select('prepared_url')->first();
        $handouts = PracticumHandout::select('faculty', 'lang', 'visibility')->get();
        $class_shcedule = ClassSchedule::select('prepared_url')->first();
        $module_shcedules = ModuleSchedule::select('faculty', 'prepared_url')->get();
        $organigram = Organigram::select('prepared_url')->first();

        $overview_data = [
            [
                'name' => 'Tata tertib',
                'status' => $code_of_conduct->prepared_url ? true : false,
            ],
            [
                'name' => 'Jadwal kelas',
                'status' => $class_shcedule->prepared_url ? true : false,
            ],
            [
                'name' => 'Organigram',
                'status' => $organigram->prepared_url ? true : false,
            ],
        ];

        // add module schedules data into overview data
        foreach ($module_shcedules as [
            'faculty' => $faculty,
            'prepared_url' => $prepared_url,
        ]) {
            array_push($overview_data, [
                'name' => 'Jadwal modul ' . $faculty,
                'status' => $prepared_url ? true : false,
            ]);
        }

        // add handouts data into overview data
        foreach ($handouts as [
            'faculty' => $faculty,
            'lang' => $lang,
            'visibility' => $visibility,
        ]) {
            array_push($overview_data, [
                'name' => "Modul $faculty ($lang)",
                'status' => $visibility,
            ]);
        }

        return $overview_data;
    }

    public static function get_social_media_overview()
    {
        $social_media = SocialMedia::select('name', 'icon', 'icon_color', 'visibility')
            ->orderBy('name', 'ASC')
            ->get();

        return array_map(function ($socmed) {
            return [
                'name' => $socmed['name'],
                'icon' => $socmed['icon'],
                'color' => $socmed['icon_color'],
                'status' => $socmed['visibility'],
            ];
        }, $social_media->toArray());
    }
}
