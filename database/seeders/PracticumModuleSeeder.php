<?php

namespace Database\Seeders;

use App\Models\PracticumModule;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PracticumModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        array_walk(PracticumModule::$initial_data, function ($module) {
            DB::table('practicum_modules')->insert($module);
        });
    }
}
