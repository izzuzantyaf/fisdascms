<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebConfig extends Model
{
    public static $initial_data = [
        [
            'active_semester' => 2,
            'active_year' => '2020/2021',
        ]
    ];
    use HasFactory;
}
