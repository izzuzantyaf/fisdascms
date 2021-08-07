<?php

namespace Database\Seeders;

use App\Models\CodeOfConduct;
use Illuminate\Database\Seeder;

class CodeOfConductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        CodeOfConduct::factory()->createOne([
            'file_url' => null,
        ]);
    }
}
