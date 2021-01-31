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
        ]
    ];
    use HasFactory;
}
