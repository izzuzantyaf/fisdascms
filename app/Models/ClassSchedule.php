<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassSchedule extends Model
{
    public static $initial_data = [
        [
            'image_url' => 'https://static.files-simplefileupload.com/yra0jtg58ywi7a00xabrv1nqby1a/class-schedule.png',
        ],
    ];
    use HasFactory;
}
