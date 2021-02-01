<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialMedia extends Model
{
    protected $table = 'social_medias';

    public static $initial_data = [
        [
            'name' => 'Instagram',
            'icon' => 'fab fa-instagram',
            'reactjs_icon' => 'fab-instagram',
            'link' => 'https://instagram.com/labfisdas_telu',
        ],
        [
            'name' => 'Line',
            'icon' => 'fab fa-line',
            'reactjs_icon' => 'fab-line',
            'link' => 'https://line.me/R/ti/p/@117kcqca',
        ],
        [
            'name' => 'Facebook',
            'icon' => 'fab fa-facebook',
            'reactjs_icon' => 'fab-facebook',
            'link' => 'https://www.facebook.com/groups/295536318321197/',
        ],
        [
            'name' => 'Twitter',
            'icon' => 'fab fa-twitter',
            'reactjs_icon' => 'fab-twitter',
            'link' => 'https://twitter.com/Fisika2020',
        ],
        [
            'name' => 'Youtube',
            'icon' => 'fab fa-youtube',
            'reactjs_icon' => 'fab-youtube',
            'link' => 'https://www.youtube.com/channel/UCLA9oIMMOeYOL3Yrqb9T0yA',
        ],
    ];

    use HasFactory;
}
