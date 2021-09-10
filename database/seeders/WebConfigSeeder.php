<?php

namespace Database\Seeders;

use App\Models\WebConfig;
use Illuminate\Database\Seeder;

class WebConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        WebConfig::factory()->createOne([
            'active_semester' => 1,
            'active_year' => '2021/2022',
        ]);
    }
}
