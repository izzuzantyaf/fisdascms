<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModuleSchedule extends Model
{
    public static $initial_data = [
        [
            'faculty' => 'FTE',
        ],
        [
            'faculty' => 'FRI',
        ],
    ];
    use HasFactory;
}
