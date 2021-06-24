<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    public static $initial_data = [
        [
            "username" => "izzuzantyaf",
            "name" => "Izzu Zantya Fawwas",
            "email" => "izzuzantyaf@gmail.com",
            "password" => "0945fc9611f55fd0e183fb8b044f1afe",
            "remember_token" => "klsdjfloaisduf"
        ],
        [
            "username" => "faradisyaheris",
            "name" => "faradisyaheris",
            "email" => "faradisyaheris@gmail.com",
            "password" => "86552c77a2fdfe954df76d3db4d70301",
            "remember_token" => "60250ab7810ad"
        ],
        [
            "username" => "littledust",
            "name" => "Little Dust",
            "email" => "littledust@gmail.com",
            "password" => "5edb0b03b3ff9fa2597053ce160138f4",
            "remember_token" => "603104faa4fa2",
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
        ]
    ];
    use HasFactory;
}
