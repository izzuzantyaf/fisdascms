<?php

namespace Database\Seeders;

use App\Models\PracticumModule;
use Illuminate\Database\Seeder;

class PracticumModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        PracticumModule::factory()->createMany([
            [
                'name' => 'Pengukuran Angka Penting',
                'acronym' => 'PAP',
                'lang' => 'id',
                'icon' => 'fas fa-sort-numeric-up-alt',
                'reactjs_icon' => 'sort-numeric-up-alt',
                'video_url' => 'https://youtu.be/zpuMpagyBZA',
                'video_embed_url' => 'https://www.youtube.com/embed/zpuMpagyBZA',
            ],
            [
                'name' => 'Measurement and Significant Figures',
                'acronym' => 'PAP',
                'lang' => 'en',
                'icon' => 'fas fa-sort-numeric-up-alt',
                'reactjs_icon' => 'sort-numeric-up-alt',
                'video_url' => 'https://youtu.be/OILNU_cEpPg',
                'video_embed_url' => 'https://www.youtube.com/embed/OILNU_cEpPg',
            ],
            [
                'name' => 'Gerak Melingkar Beraturan I dan Gerak Melingkar Beraturan II',
                'acronym' => 'GMB',
                'lang' => 'id',
                'icon' => 'fas fa-circle-notch',
                'reactjs_icon' => 'circle-notch',
                'video_url' => 'https://youtu.be/C0lmsWzGBqY',
                'video_embed_url' => 'https://www.youtube.com/embed/C0lmsWzGBqY',
            ],
            [
                'name' => 'Uniform Circular Motion I and Uniform Circular Motion II',
                'acronym' => 'GMB',
                'lang' => 'en',
                'icon' => 'fas fa-circle-notch',
                'reactjs_icon' => 'circle-notch',
                'video_url' => 'https://youtu.be/L6kn35kZU3w',
                'video_embed_url' => 'https://www.youtube.com/embed/L6kn35kZU3w',
            ],
            [
                'name' => 'Gerak Osilasi dan Gerak Jatuh Bebas',
                'acronym' => 'GJB',
                'lang' => 'id',
                'icon' => 'fas fa-parachute-box',
                'reactjs_icon' => 'parachute-box',
                'video_url' => 'https://youtu.be/_d7rTW_MJLk',
                'video_embed_url' => 'https://www.youtube.com/embed/_d7rTW_MJLk',
            ],
            [
                'name' => 'Oscillatory Motion and Free Fall Motion',
                'acronym' => 'GJB',
                'lang' => 'en',
                'icon' => 'fas fa-parachute-box',
                'reactjs_icon' => 'parachute-box',
                'video_url' => 'https://youtu.be/V5wuEmfOY6Y',
                'video_embed_url' => 'https://www.youtube.com/embed/V5wuEmfOY6Y',
            ],
            [
                'name' => 'Pendahuluan Listrik',
                'acronym' => 'PL',
                'lang' => 'id',
                'icon' => 'fas fa-bolt',
                'reactjs_icon' => 'bolt',
                'video_url' => 'https://youtu.be/tSoHDrNeR6s',
                'video_embed_url' => 'https://www.youtube.com/embed/tSoHDrNeR6s',
            ],
            [
                'name' => 'Introduction to Electricity',
                'acronym' => 'PL',
                'lang' => 'en',
                'icon' => 'fas fa-bolt',
                'reactjs_icon' => 'bolt',
                'video_url' => 'https://youtu.be/zFiOw0jBIAI',
                'video_embed_url' => 'https://www.youtube.com/embed/zFiOw0jBIAI',
            ],
            [
                'name' => 'Superposisi Getaran Harmonik',
                'acronym' => 'SGH',
                'lang' => 'id',
                'icon' => 'fas fa-wave-square',
                'reactjs_icon' => 'wave-square',
                'video_url' => 'https://youtu.be/U-uN9gMiF7U',
                'video_embed_url' => 'https://www.youtube.com/embed/U-uN9gMiF7U',
                'simulator_link' => 'https://academo.org/demos/virtual-oscilloscope/',
            ],
            [
                'name' => 'Superposition Of Harmonic Vibration',
                'acronym' => 'SGH',
                'lang' => 'en',
                'icon' => 'fas fa-wave-square',
                'reactjs_icon' => 'wave-square',
                'video_url' => 'https://youtu.be/KMWu69PPwnI',
                'video_embed_url' => 'https://www.youtube.com/embed/KMWu69PPwnI',
                'simulator_link' => 'https://academo.org/demos/virtual-oscilloscope/',
            ],
            [
                'name' => 'Pengukuran Besaran Listrik',
                'acronym' => 'PBL',
                'lang' => 'id',
                'icon' => 'fas fa-calculator',
                'reactjs_icon' => 'calculator',
                'video_url' => 'https://youtu.be/7rJ5rVlCTME',
                'video_embed_url' => 'https://www.youtube.com/embed/7rJ5rVlCTME',
                'simulator_link' => 'http://amrita.olabs.edu.in/?sub=1&brch=4&sim=99&cnt=4',
            ],
            [
                'name' => 'Measurement Of Electrical Quantities',
                'acronym' => 'PBL',
                'lang' => 'en',
                'icon' => 'fas fa-calculator',
                'reactjs_icon' => 'calculator',
                'video_url' => 'https://youtu.be/ONLbrO0oEUY',
                'video_embed_url' => 'https://www.youtube.com/embed/ONLbrO0oEUY',
                'simulator_link' => 'http://amrita.olabs.edu.in/?sub=1&brch=4&sim=99&cnt=4',
            ],
            [
                'name' => 'GLBB, GLB, dan Momen Inersia',
                'acronym' => 'GLB',
                'lang' => 'id',
                'icon' => 'fas fa-grip-lines-vertical',
                'reactjs_icon' => 'grip-lines-vertical',
                'video_url' => 'https://youtu.be/1j6FxITNOHE',
                'video_embed_url' => 'https://www.youtube.com/embed/1j6FxITNOHE',
                'simulator_link' => 'http://amrita.olabs.edu.in/?sub=1&brch=1&sim=44&cnt=4',
            ],
            [
                'name' => 'Uniform Accelerated Linear Motion, Uniform Linear Motion, and Pulley Inertia Moment',
                'acronym' => 'GLB',
                'lang' => 'en',
                'icon' => 'fas fa-grip-lines-vertical',
                'reactjs_icon' => 'grip-lines-vertical',
                'video_url' => 'https://youtu.be/bnsX7_u82WA',
                'video_embed_url' => 'https://www.youtube.com/embed/bnsX7_u82WA',
                'simulator_link' => 'http://amrita.olabs.edu.in/?sub=1&brch=1&sim=44&cnt=4',
            ],
            [
                'name' => 'Resonansi Gelombang Bunyi',
                'acronym' => 'RGB',
                'lang' => 'id',
                'icon' => 'fas fa-satellite-dish',
                'reactjs_icon' => 'satellite-dish',
                'video_url' => 'https://youtu.be/l7Z_9Rp30m4',
                'video_embed_url' => 'https://www.youtube.com/embed/l7Z_9Rp30m4',
                'simulator_link' => 'http://amrita.olabs.edu.in/?sub=1&brch=5&sim=36&cnt=4',
            ],
            [
                'name' => 'Resonance of Sound Waves',
                'acronym' => 'RGB',
                'lang' => 'en',
                'icon' => 'fas fa-satellite-dish',
                'reactjs_icon' => 'satellite-dish',
                'video_url' => 'https://youtu.be/i01m1jeWbW0',
                'video_embed_url' => 'https://www.youtube.com/embed/i01m1jeWbW0',
                'simulator_link' => 'http://amrita.olabs.edu.in/?sub=1&brch=5&sim=36&cnt=4',
            ],
            [
                'name' => 'Induksi Magnetik',
                'acronym' => 'IM',
                'lang' => 'id',
                'icon' => 'fas fa-magnet',
                'reactjs_icon' => 'magnet',
                'video_url' => 'https://youtu.be/ffVD-vI2hzc',
                'video_embed_url' => 'https://www.youtube.com/embed/ffVD-vI2hzc',
                'simulator_link' => 'http://cdac.olabs.edu.in/?sub=74&brch=9&sim=242&cnt=4',
            ],
            [
                'name' => 'Magnetic Induction',
                'acronym' => 'IM',
                'lang' => 'en',
                'icon' => 'fas fa-magnet',
                'reactjs_icon' => 'magnet',
                'video_url' => 'https://youtu.be/IhblFR5Z00k',
                'video_embed_url' => 'https://www.youtube.com/embed/IhblFR5Z00k',
                'simulator_link' => 'http://cdac.olabs.edu.in/?sub=74&brch=9&sim=242&cnt=4',
            ],
            [
                'name' => 'Pengisian dan Pengosongan Kapasitor',
                'acronym' => 'KAP',
                'lang' => 'id',
                'icon' => 'fas fa-plug',
                'reactjs_icon' => 'plug',
                'video_url' => 'https://youtu.be/-u71VfZc6uw',
                'video_embed_url' => 'https://www.youtube.com/embed/-u71VfZc6uw',

            ],
            [
                'name' => 'Charging and Discharging Capacitors',
                'acronym' => 'KAP',
                'lang' => 'en',
                'icon' => 'fas fa-plug',
                'reactjs_icon' => 'plug',
                'video_url' => 'https://youtu.be/EEVoWxOr520',
                'video_embed_url' => 'https://www.youtube.com/embed/EEVoWxOr520',

            ],
            [
                'name' => 'Jembatan Wheatstone',
                'acronym' => 'JW',
                'lang' => 'id',
                'icon' => 'fas fa-draw-polygon',
                'reactjs_icon' => 'draw-polygon',
                'video_url' => 'https://youtu.be/PGhqCtgiRz4',
                'video_embed_url' => 'https://www.youtube.com/embed/PGhqCtgiRz4',

            ],
            [
                'name' => 'Wheatstone Bridge',
                'acronym' => 'JW',
                'lang' => 'en',
                'icon' => 'fas fa-draw-polygon',
                'reactjs_icon' => 'draw-polygon',
                'video_url' => 'https://youtu.be/4NWxCnmg6ho',
                'video_embed_url' => 'https://www.youtube.com/embed/4NWxCnmg6ho',

            ],
        ]);
    }
}
