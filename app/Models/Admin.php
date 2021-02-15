<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    public static $initial_data = [
        [
            'username' => 'izzuzantyaf',
            'name' => 'Izzu Zantya Fawwas',
            'email' => 'izzuzantyaf@gmail.com',
            'password' => '0945fc9611f55fd0e183fb8b044f1afe',
            'remember_token' => 'klsdjfloaisduf',
        ],
        [
            'username' => 'faradisyaheris',
            'name' => 'faradisyaheris',
            'email' => 'faradisyaheris@gmail.com',
            'password' => '86552c77a2fdfe954df76d3db4d70301',
            'remember_token' => '60250ab7810ad',
        ],
    ];
    use HasFactory;
}
