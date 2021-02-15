<?php

namespace Database\Seeders;

use App\Models\CodeOfConduct;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CodeOfConductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        array_walk(CodeOfConduct::$initial_data, function ($code_of_conduct) {
            DB::table('code_of_conducts')->insert($code_of_conduct);
        });
    }
}
