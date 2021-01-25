<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Sidebar extends Component
{
    public $menu_list = [
        [
            'name' => 'Dashboard',
            'icon' => 'fas fa-pager',
            'route' => '/',
        ],
        [
            'name' => 'Tata tertib',
            'icon' => 'fas fa-balance-scale',
            'route' => '/code-of-conduct',
        ],
        [
            'name' => 'Modul',
            'icon' => 'fas fa-book',
            'route' => '/handouts',
        ],
        [
            'name' => 'Tugas pendahuluan',
            'icon' => 'fas fa-tasks',
            'route' => '/preliminary-test',
        ],
        [
            'name' => 'Video praktikum',
            'icon' => 'fas fa-play',
            'route' => '/practicum-video',
        ],
        [
            'name' => 'Simulator praktikum',
            'icon' => 'fas fa-cogs',
            'route' => '/practicum-simulator',
        ],
        [
            'name' => 'Cover jurnal',
            'icon' => 'fas fa-file',
            'route' => '/journal-cover',
        ],
        [
            'name' => 'Asisten',
            'icon' => 'fas fa-users',
            'route' => '/assistants',
        ],
        [
            'name' => 'Jadwal',
            'icon' => 'fas fa-calendar-minus',
            'route' => '/schedule',
        ],
        [
            'name' => 'Organigram',
            'icon' => 'fas fa-sitemap',
            'route' => '/organigram',
        ],
    ];
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.sidebar');
    }
}
