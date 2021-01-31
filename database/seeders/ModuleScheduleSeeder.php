<?php

namespace Database\Seeders;

use App\Models\ModuleSchedule;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModuleScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        array_walk(ModuleSchedule::$initial_data, function ($module_schedule) {
            DB::table('module_schedules')->insert($module_schedule);
        });
    }
}
