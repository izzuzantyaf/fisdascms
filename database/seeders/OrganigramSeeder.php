<?php

namespace Database\Seeders;

use App\Models\Organigram;
use Illuminate\Database\Seeder;

class OrganigramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        Organigram::factory()->createOne([
            'original_url' => null,
            'prepared_url' => null,
        ]);
    }
}
