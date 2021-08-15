<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public static function run()
    {
        Admin::factory()->createOne([
            "username" => "msi.fisdas",
            "name" => "MSI Fisdas",
            "email" => "msi.fisdas@gmail.com",
            "password" => Hash::make('msiayeee'),
        ]);
    }
}
