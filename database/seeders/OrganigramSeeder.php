<?php

namespace Database\Seeders;

use App\Models\Organigram;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrganigramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        array_walk(Organigram::$initial_data, function ($organigram) {
            DB::table('organigrams')->insert($organigram);
        });
    }
}
