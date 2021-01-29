<?php

namespace Database\Seeders;

use App\Models\PracticumHandout;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PracticumHandoutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        array_walk(PracticumHandout::$initial_data, function ($handout) {
            DB::table('practicum_handouts')->insert($handout);
        });
    }
}
