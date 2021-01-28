<?php

namespace Database\Seeders;

use App\Models\Assistant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssistantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        array_walk(Assistant::$initial_data, function ($assistant) {
            DB::table('assistants')->insert($assistant);
        });
    }
}
