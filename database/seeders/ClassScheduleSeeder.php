<?php

namespace Database\Seeders;

use App\Models\ClassSchedule;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClassScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        array_walk(ClassSchedule::$initial_data, function ($class_schedule) {
            DB::table('class_schedules')->insert($class_schedule);
        });
    }
}
