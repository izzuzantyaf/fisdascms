<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CodeOfConduct extends Model
{
    use HasFactory;

    public static $initial_data = [
        [
            'order' => '1',
        ],
        [
            'order' => '2',
        ],
        [
            'order' => '3',
        ],
        [
            'order' => '4',
        ],
        [
            'order' => '5',
        ],
        [
            'order' => '6',
        ],
    ];
}
