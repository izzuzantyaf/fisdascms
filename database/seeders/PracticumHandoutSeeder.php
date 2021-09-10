<?php

namespace Database\Seeders;

use App\Models\PracticumHandout;
use Illuminate\Database\Seeder;

class PracticumHandoutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        PracticumHandout::factory()->createMany([
            [
                'faculty' => 'FTE',
                'lang' => 'id',
            ],
            [
                'faculty' => 'FTE',
                'lang' => 'en',
            ],
            [
                'faculty' => 'FRI',
                'lang' => 'id',
            ],
            [
                'faculty' => 'FRI',
                'lang' => 'en',
            ],
        ]);
    }
}
