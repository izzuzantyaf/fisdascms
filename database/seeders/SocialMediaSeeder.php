<?php

namespace Database\Seeders;

use App\Models\SocialMedia;
use Illuminate\Database\Seeder;

class SocialMediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        SocialMedia::factory()->createMany([
            [
                'name' => 'Instagram',
                'icon' => 'fab fa-instagram',
                'reactjs_icon' => 'fab-instagram',
                'color' => 'text-white',
                'bg_color' => 'bg-pink-600',
                'visibility' => 1,
                'link' => 'https://instagram.com/labfisdas_telu',
            ],
            [
                'name' => 'Line',
                'icon' => 'fab fa-line',
                'reactjs_icon' => 'fab-line',
                'color' => 'text-white',
                'bg_color' => 'bg-lime-500',
                'visibility' => 1,
                'link' => 'https://line.me/R/ti/p/@117kcqca',
            ],
            [
                'name' => 'Facebook',
                'icon' => 'fab fa-facebook',
                'reactjs_icon' => 'fab-facebook',
                'color' => 'text-white',
                'bg_color' => 'bg-sky-500',
                'visibility' => 1,
                'link' => 'https://www.facebook.com/groups/295536318321197/',
            ],
            [
                'name' => 'Twitter',
                'icon' => 'fab fa-twitter',
                'reactjs_icon' => 'fab-twitter',
                'color' => 'text-white',
                'bg_color' => 'bg-cyan-400',
                'visibility' => 1,
                'link' => 'https://twitter.com/Fisika2020',
            ],
            [
                'name' => 'Youtube',
                'icon' => 'fab fa-youtube',
                'reactjs_icon' => 'fab-youtube',
                'color' => 'text-white',
                'bg_color' => 'bg-red-500',
                'visibility' => 1,
                'link' => 'https://www.youtube.com/channel/UCLA9oIMMOeYOL3Yrqb9T0yA',
            ],
            [
                'name' => 'TikTok',
                'icon' => 'fab fa-tiktok',
                'reactjs_icon' => 'fab-tiktok',
                'color' => 'text-white',
                'bg_color' => 'bg-gray-800',
                'visibility' => 0,
                'link' => null,
            ],
            [
                'name' => 'Telegram',
                'icon' => 'fab fa-telegram-plane',
                'reactjs_icon' => 'fab-telegram-plane',
                'color' => 'text-white',
                'bg_color' => 'bg-blue-400',
                'visibility' => 0,
                'link' => null,
            ],
            [
                'name' => 'LinkedIn',
                'icon' => 'fab fa-linkedin',
                'reactjs_icon' => 'fab-linkedin',
                'color' => 'text-white',
                'bg_color' => 'bg-sky-600',
                'visibility' => 0,
                'link' => null,
            ],
            [
                'name' => 'Discord',
                'icon' => 'fab fa-discord',
                'reactjs_icon' => 'fab-discord',
                'color' => 'text-white',
                'bg_color' => 'bg-indigo-500',
                'visibility' => 0,
                'link' => null,
            ],
        ]);
    }
}
