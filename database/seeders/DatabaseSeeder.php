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
        // $this->call([
        AdminSeeder::run();
        PracticumHandoutSeeder::run();
        AssistantSeeder::run();
        PracticumModuleSeeder::run();
        SocialMediaSeeder::run();
        WebConfigSeeder::run();
        OrganigramSeeder::run();
        ModuleScheduleSeeder::run();
        ClassScheduleSeeder::run();
        CodeOfConductSeeder::run();
        // ]);
    }
}
