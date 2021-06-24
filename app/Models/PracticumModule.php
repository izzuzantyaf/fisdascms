<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PracticumModule extends Model
{
    use HasFactory;

    public static $initial_data = [
        [
            'name' => 'Pengukuran Angka Penting',
            'acronym' => 'PAP',
            'lang' => 'id',
            'icon' => 'fas fa-sort-numeric-up-alt',
            'reactjs_icon' => 'sort-numeric-up-alt',
            'video_link' => 'https://youtu.be/zpuMpagyBZA',
        ],
        [
            'name' => 'Measurement and Significant Figures',
            'acronym' => 'PAP',
            'lang' => 'en',
            'icon' => 'fas fa-sort-numeric-up-alt',
            'reactjs_icon' => 'sort-numeric-up-alt',
            'video_link' => 'https://youtu.be/OILNU_cEpPg',
        ],
        [
            'name' => 'Gerak Melingkar Beraturan I dan Gerak Melingkar Beraturan II',
            'acronym' => 'GMB',
            'lang' => 'id',
            'icon' => 'fas fa-circle-notch',
            'reactjs_icon' => 'circle-notch',
            'video_link' => 'https://youtu.be/C0lmsWzGBqY',
        ],
        [
            'name' => 'Uniform Circular Motion I and Uniform Circular Motion II',
            'acronym' => 'GMB',
            'lang' => 'en',
            'icon' => 'fas fa-circle-notch',
            'reactjs_icon' => 'circle-notch',
            'video_link' => 'https://youtu.be/L6kn35kZU3w',
        ],
        [
            'name' => 'Gerak Osilasi dan Gerak Jatuh Bebas',
            'acronym' => 'GJB',
            'lang' => 'id',
            'icon' => 'fas fa-parachute-box',
            'reactjs_icon' => 'parachute-box',
            'video_link' => 'https://youtu.be/_d7rTW_MJLk',
        ],
        [
            'name' => 'Oscillatory Motion and Free Fall Motion',
            'acronym' => 'GJB',
            'lang' => 'en',
            'icon' => 'fas fa-parachute-box',
            'reactjs_icon' => 'parachute-box',
            'video_link' => 'https://youtu.be/V5wuEmfOY6Y',
        ],
        [
            'name' => 'Pendahuluan Listrik',
            'acronym' => 'PL',
            'lang' => 'id',
            'icon' => 'fas fa-bolt',
            'reactjs_icon' => 'bolt',
            'video_link' => 'https://youtu.be/tSoHDrNeR6s',
        ],
        [
            'name' => 'Introduction to Electricity',
            'acronym' => 'PL',
            'lang' => 'en',
            'icon' => 'fas fa-bolt',
            'reactjs_icon' => 'bolt',
            'video_link' => 'https://youtu.be/zFiOw0jBIAI',
        ],
        [
            'name' => 'Superposisi Getaran Harmonik',
            'acronym' => 'SGH',
            'lang' => 'id',
            'icon' => 'fas fa-wave-square',
            'reactjs_icon' => 'wave-square',
            'video_link' => 'https://youtu.be/U-uN9gMiF7U',
            'simulator_link' => 'https://academo.org/demos/virtual-oscilloscope/',
        ],
        [
            'name' => 'Superposition Of Harmonic Vibration',
            'acronym' => 'SGH',
            'lang' => 'en',
            'icon' => 'fas fa-wave-square',
            'reactjs_icon' => 'wave-square',
            'video_link' => 'https://youtu.be/KMWu69PPwnI',
            'simulator_link' => 'https://academo.org/demos/virtual-oscilloscope/',
        ],
        [
            'name' => 'Pengukuran Besaran Listrik',
            'acronym' => 'PBL',
            'lang' => 'id',
            'icon' => 'fas fa-calculator',
            'reactjs_icon' => 'calculator',
            'video_link' => 'https://youtu.be/7rJ5rVlCTME',
            'simulator_link' => 'http://amrita.olabs.edu.in/?sub=1&brch=4&sim=99&cnt=4',
        ],
        [
            'name' => 'Measurement Of Electrical Quantities',
            'acronym' => 'PBL',
            'lang' => 'en',
            'icon' => 'fas fa-calculator',
            'reactjs_icon' => 'calculator',
            'video_link' => 'https://youtu.be/ONLbrO0oEUY',
            'simulator_link' => 'http://amrita.olabs.edu.in/?sub=1&brch=4&sim=99&cnt=4',
        ],
        [
            'name' => 'GLBB, GLB, dan Momen Inersia',
            'acronym' => 'GLB',
            'lang' => 'id',
            'icon' => 'fas fa-grip-lines-vertical',
            'reactjs_icon' => 'grip-lines-vertical',
            'video_link' => 'https://youtu.be/1j6FxITNOHE',
            'simulator_link' => 'http://amrita.olabs.edu.in/?sub=1&brch=1&sim=44&cnt=4',
        ],
        [
            'name' => 'Uniform Accelerated Linear Motion, Uniform Linear Motion, and Pulley Inertia Moment',
            'acronym' => 'GLB',
            'lang' => 'en',
            'icon' => 'fas fa-grip-lines-vertical',
            'reactjs_icon' => 'grip-lines-vertical',
            'video_link' => 'https://youtu.be/bnsX7_u82WA',
            'simulator_link' => 'http://amrita.olabs.edu.in/?sub=1&brch=1&sim=44&cnt=4',
        ],
        [
            'name' => 'Resonansi Gelombang Bunyi',
            'acronym' => 'RGB',
            'lang' => 'id',
            'icon' => 'fas fa-satellite-dish',
            'reactjs_icon' => 'satellite-dish',
            'video_link' => 'https://youtu.be/l7Z_9Rp30m4',
            'simulator_link' => 'http://amrita.olabs.edu.in/?sub=1&brch=5&sim=36&cnt=4',
        ],
        [
            'name' => 'Resonance of Sound Waves',
            'acronym' => 'RGB',
            'lang' => 'en',
            'icon' => 'fas fa-satellite-dish',
            'reactjs_icon' => 'satellite-dish',
            'video_link' => 'https://youtu.be/i01m1jeWbW0',
            'simulator_link' => 'http://amrita.olabs.edu.in/?sub=1&brch=5&sim=36&cnt=4',
        ],
        [
            'name' => 'Induksi Magnetik',
            'acronym' => 'IM',
            'lang' => 'id',
            'icon' => 'fas fa-magnet',
            'reactjs_icon' => 'magnet',
            'video_link' => 'https://youtu.be/ffVD-vI2hzc',
            'simulator_link' => 'http://cdac.olabs.edu.in/?sub=74&brch=9&sim=242&cnt=4',
        ],
        [
            'name' => 'Magnetic Induction',
            'acronym' => 'IM',
            'lang' => 'en',
            'icon' => 'fas fa-magnet',
            'reactjs_icon' => 'magnet',
            'video_link' => 'https://youtu.be/IhblFR5Z00k',
            'simulator_link' => 'http://cdac.olabs.edu.in/?sub=74&brch=9&sim=242&cnt=4',
        ],
        [
            'name' => 'Pengisian dan Pengosongan Kapasitor',
            'acronym' => 'KAP',
            'lang' => 'id',
            'icon' => 'fas fa-plug',
            'reactjs_icon' => 'plug',
            'video_link' => 'https://youtu.be/-u71VfZc6uw',

        ],
        [
            'name' => 'Charging and Discharging Capacitors',
            'acronym' => 'KAP',
            'lang' => 'en',
            'icon' => 'fas fa-plug',
            'reactjs_icon' => 'plug',
            'video_link' => 'https://youtu.be/EEVoWxOr520',

        ],
        [
            'name' => 'Jembatan Wheatstone',
            'acronym' => 'JW',
            'lang' => 'id',
            'icon' => 'fas fa-draw-polygon',
            'reactjs_icon' => 'draw-polygon',
            'video_link' => 'https://youtu.be/PGhqCtgiRz4',

        ],
        [
            'name' => 'Wheatstone Bridge',
            'acronym' => 'JW',
            'lang' => 'en',
            'icon' => 'fas fa-draw-polygon',
            'reactjs_icon' => 'draw-polygon',
            'video_link' => 'https://youtu.be/4NWxCnmg6ho',

        ],
    ];
}
