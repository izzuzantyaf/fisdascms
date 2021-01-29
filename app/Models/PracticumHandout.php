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
            'visibility' => '1',
        ],
        [
            'faculty' => 'FTE',
            'lang' => 'en',
            'visibility' => '1',
        ],
        [
            'faculty' => 'FRI',
            'lang' => 'id',
            'visibility' => '1',
        ],
        [
            'faculty' => 'FRI',
            'lang' => 'en',
            'visibility' => '1',
        ],
    ];
}
