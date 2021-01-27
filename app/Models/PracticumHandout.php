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
            'file_url' => '',
            'semester' => '1',
        ],
        [
            'faculty' => 'FTE',
            'lang' => 'en',
            'file_url' => '',
            'semester' => '1',
        ],
        [
            'faculty' => 'FTE',
            'lang' => 'id',
            'file_url' => '',
            'semester' => '2',
        ],
        [
            'faculty' => 'FTE',
            'lang' => 'en',
            'file_url' => '',
            'semester' => '2',
        ],
        [
            'faculty' => 'FRI',
            'lang' => 'id',
            'file_url' => '',
            'semester' => '1',
        ],
        [
            'faculty' => 'FRI',
            'lang' => 'en',
            'file_url' => '',
            'semester' => '1',
        ],
        [
            'faculty' => 'FRI',
            'lang' => 'id',
            'file_url' => '',
            'semester' => '2',
        ],
        [
            'faculty' => 'FRI',
            'lang' => 'en',
            'file_url' => '',
            'semester' => '2',
        ],
    ];
}
