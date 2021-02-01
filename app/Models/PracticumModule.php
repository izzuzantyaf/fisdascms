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
            'video_id' => 'zpuMpagyBZA',
        ],
        [
            'name' => 'Measurement and Significant Figures',
            'acronym' => 'PAP',
            'lang' => 'en',
            'icon' => 'fas fa-sort-numeric-up-alt',
            'reactjs_icon' => 'sort-numeric-up-alt',
            'video_id' => 'OILNU_cEpPg',
        ],
        [
            'name' => 'Gerak Melingkar Beraturan I dan Gerak Melingkar Beraturan II',
            'acronym' => 'GMB',
            'lang' => 'id',
            'icon' => 'fas fa-circle-notch',
            'reactjs_icon' => 'circle-notch',
            'video_id' => 'C0lmsWzGBqY',
        ],
        [
            'name' => 'Uniform Circular Motion I and Uniform Circular Motion II',
            'acronym' => 'GMB',
            'lang' => 'en',
            'icon' => 'fas fa-circle-notch',
            'reactjs_icon' => 'circle-notch',
            'video_id' => 'L6kn35kZU3w',
        ],
        [
            'name' => 'Gerak Osilasi dan Gerak Jatuh Bebas',
            'acronym' => 'GJB',
            'lang' => 'id',
            'icon' => 'fas fa-infinity',
            'reactjs_icon' => 'infinity',
            'video_id' => '_d7rTW_MJLk',
        ],
        [
            'name' => 'Oscillatory Motion and Free Fall Motion',
            'acronym' => 'GJB',
            'lang' => 'en',
            'icon' => 'fas fa-infinity',
            'reactjs_icon' => 'infinity',
            'video_id' => 'V5wuEmfOY6Y',
        ],
        [
            'name' => 'Superposisi Getaran Harmonik',
            'acronym' => 'SGH',
            'lang' => 'id',
            'icon' => 'fas fa-wave-square',
            'reactjs_icon' => 'wave-square',
            'video_id' => 'U-uN9gMiF7U',
        ],
        [
            'name' => 'Superposition Of Harmonic Vibration',
            'acronym' => 'SGH',
            'lang' => 'en',
            'icon' => 'fas fa-wave-square',
            'reactjs_icon' => 'wave-square',
            'video_id' => 'KMWu69PPwnI',
        ],
        [
            'name' => 'Pengukuran Besaran Listrik',
            'acronym' => 'PBL',
            'lang' => 'id',
            'icon' => 'fas fa-bolt',
            'reactjs_icon' => 'bolt',
            'video_id' => '7rJ5rVlCTME',
        ],
        [
            'name' => 'Measurement Of Electrical Quantities',
            'acronym' => 'PBL',
            'lang' => 'en',
            'icon' => 'fas fa-bolt',
            'reactjs_icon' => 'bolt',
            'video_id' => 'ONLbrO0oEUY',
        ],
        [
            'name' => 'GLBB, GLB, dan Momen Inersia',
            'acronym' => 'GLB',
            'lang' => 'id',
            'icon' => 'fas fa-grip-lines-vertical',
            'reactjs_icon' => 'grip-lines-vertical',
            'video_id' => '1j6FxITNOHE',
        ],
        [
            'name' => 'Uniform Accelerated Linear Motion, Uniform Linear Motion, and Pulley Inertia Moment',
            'acronym' => 'GLB',
            'lang' => 'en',
            'icon' => 'fas fa-grip-lines-vertical',
            'reactjs_icon' => 'grip-lines-vertical',
            'video_id' => 'bnsX7_u82WA',
        ],
        [
            'name' => 'Resonansi Gelombang Bunyi',
            'acronym' => 'RGB',
            'lang' => 'id',
            'icon' => 'fas fa-satellite-dish',
            'reactjs_icon' => 'satellite-dish',
            'video_id' => 'l7Z_9Rp30m4',
        ],
        [
            'name' => 'Resonance of Sound Waves',
            'acronym' => 'RGB',
            'lang' => 'en',
            'icon' => 'fas fa-satellite-dish',
            'reactjs_icon' => 'satellite-dish',
            'video_id' => 'i01m1jeWbW0',
        ],
        [
            'name' => 'Induksi Magnetik',
            'acronym' => 'IM',
            'lang' => 'id',
            'icon' => 'fas fa-magnet',
            'reactjs_icon' => 'magnet',
            'video_id' => 'ffVD-vI2hzc',
        ],
        [
            'name' => 'Magnetic Induction',
            'acronym' => 'IM',
            'lang' => 'en',
            'icon' => 'fas fa-magnet',
            'reactjs_icon' => 'magnet',
            'video_id' => 'IhblFR5Z00k',
        ],
        [
            'name' => 'Pengisian dan Pengosongan Kapasitor',
            'acronym' => 'KAP',
            'lang' => 'id',
            'icon' => 'fas fa-plug',
            'reactjs_icon' => 'plug',

        ],
        [
            'name' => 'Charging and Discharging Capacitors',
            'acronym' => 'KAP',
            'lang' => 'en',
            'icon' => 'fas fa-plug',
            'reactjs_icon' => 'plug',

        ],
        [
            'name' => 'Jembatan Wheatstone',
            'acronym' => 'JW',
            'lang' => 'id',
            'icon' => 'fas fa-draw-polygon',
            'reactjs_icon' => 'draw-polygon',

        ],
        [
            'name' => 'Wheatstone Bridge',
            'acronym' => 'JW',
            'lang' => 'en',
            'icon' => 'fas fa-draw-polygon',
            'reactjs_icon' => 'draw-polygon',

        ],
    ];
}
