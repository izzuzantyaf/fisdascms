<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        AdminSeeder::run();
        PracticumHandoutSeeder::run();
        AssistantSeeder::run();
        PracticumModuleSeeder::run();
        SocialMediaSeeder::run();
        WebConfigSeeder::run();
        OrganigramSeeder::run();
        ModuleScheduleSeeder::run();
        ClassScheduleSeeder::run();
    }
}
