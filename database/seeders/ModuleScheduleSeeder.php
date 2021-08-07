<?php

namespace Database\Seeders;

use App\Models\ModuleSchedule;
use Illuminate\Database\Seeder;

class ModuleScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        ModuleSchedule::factory()->createMany([
            [
                'faculty' => 'FTE',
            ],
            [
                'faculty' => 'FRI',
            ],
        ]);
    }
}
