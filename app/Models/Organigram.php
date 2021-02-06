<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organigram extends Model
{
    public static $initial_data = [
        [
            'image_url' => 'https://static.files-simplefileupload.com/cyny466nr6p3gp7kjq35eigl55fo/1598764183966-min.jpg',
        ],
    ];
    use HasFactory;
}
