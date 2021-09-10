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
        $this->call([
            AdminSeeder::class,
            PracticumHandoutSeeder::class,
            AssistantSeeder::class,
            PracticumModuleSeeder::class,
            SocialMediaSeeder::class,
            WebConfigSeeder::class,
            OrganigramSeeder::class,
            ModuleScheduleSeeder::class,
            ClassScheduleSeeder::class,
            CodeOfConductSeeder::class,
        ]);
    }
}
