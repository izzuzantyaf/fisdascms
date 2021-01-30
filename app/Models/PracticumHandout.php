<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PracticumHandout extends Model
{
    use HasFactory;
    public static $initial_data = [
        [
            'faculty' => 'FTE',
            'lang' => 'id',
        ],
        [
            'faculty' => 'FTE',
            'lang' => 'en',
        ],
        [
            'faculty' => 'FRI',
            'lang' => 'id',
        ],
        [
            'faculty' => 'FRI',
            'lang' => 'en',
        ],
    ];
}
