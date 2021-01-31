<?php

namespace Database\Seeders;

use App\Models\WebConfig;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WebConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        array_walk(WebConfig::$initial_data, function ($web_config) {
            DB::table('web_configs')->insert($web_config);
        });
    }
}
