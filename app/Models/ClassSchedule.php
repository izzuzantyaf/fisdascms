<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassSchedule extends Model
{
    public static $initial_data = [
        [
            'image_url' => null,
        ],
    ];
    use HasFactory;
}
