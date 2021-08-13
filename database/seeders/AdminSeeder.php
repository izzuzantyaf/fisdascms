<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public static function run()
    {
        Admin::factory()->createMany([
            [
                "username" => "msi.fisdas",
                "name" => "MSI Fisdas",
                "email" => "msi.fisdas@gmail.com",
                "password" => "862973f4332930096b613fca3f90bbe4",
                "remember_token" => "610e6de2f37cb",
            ],
            [
                "username" => "izzuzantyaf",
                "name" => "Izzu Zantya Fawwas",
                "email" => "izzuzantyaf@gmail.com",
                "password" => "0945fc9611f55fd0e183fb8b044f1afe",
                "remember_token" => "610e7c9a322d6"
            ],
            [
                "username" => "faradisyaheris",
                "name" => "faradisyaheris",
                "email" => "faradisyaheris@gmail.com",
                "password" => "86552c77a2fdfe954df76d3db4d70301",
                "remember_token" => "60250ab7810ad"
            ],
            [
                "username" => "mikailrizkyena",
                "name" => "mikailrizkyena",
                "email" => "mikailrizkyena@student.telkomuniversity.ac.id",
                "password" => "005a8129ef8e267b68bda40566ee19b8",
                "remember_token" => "60310a05d3969",
            ],
            [
                "username" => "nuryudha",
                "name" => "nur yudha",
                "email" => "nur.yudha16@gmail.com",
                "password" => "bca21cee14ab489f7af8bd4e11c835db",
                "remember_token" => "603a334bd1fc6",
            ],
            [
                "username" => "faradisyaheriss",
                "name" => "faradisyaheriss",
                "email" => "herisalsabila24@gmail.com",
                "password" => "fe1dd85fef2e3111f6164a48972c53c3",
                "remember_token" => "603a5fbd7a948",
            ],
            [
                "username" => "alfariziwiranata",
                "name" => "Alfarizi Wiranata",
                "email" => "ziw.fisikadasar@gmail.com",
                "password" => "36a3c71f82aaea4d5afd8cab842713a0",
                "remember_token" => "603bb077c2edc",
            ],
            [
                "username" => "ayaayiayu",
                "name" => "Ilham Nadiyansyah Firdaus",
                "email" => "ind.fisikadasar@gmail.com",
                "password" => "71daee16259b919329f095fa4c1faf16",
                "remember_token" => "603c75cfddd01",
            ],
            [
                "username" => "raissanandiva",
                "name" => "Raissa Nur Andiva",
                "email" => "raissanandiva@student.telkomuniversity.ac.id",
                "password" => "febe2b71756967c38807fcb29bee3fdf",
                "remember_token" => "60e84250d1044",
            ],
        ]);
    }
}
