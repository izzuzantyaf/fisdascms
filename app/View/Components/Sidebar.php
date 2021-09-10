<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Sidebar extends Component
{
    public $menu_list;
    public $current_route;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($currentRoute = 'dashboard')
    {
        $this->menu_list = [
            [
                'name' => 'Dashboard',
                'icon' => 'fas fa-pager',
                'route' => route('dashboard'),
            ],
            [
                'name' => 'Tata tertib',
                'icon' => 'fas fa-balance-scale',
                'route' => route('code-of-conduct'),
            ],
            [
                'name' => 'Modul',
                'icon' => 'fas fa-book',
                'route' => route('handout'),
            ],
            [
                'name' => 'Tugas pendahuluan',
                'icon' => 'fas fa-tasks',
                'route' => route('preliminary-test'),
            ],
            [
                'name' => 'Video praktikum',
                'icon' => 'fas fa-play',
                'route' => route('practicum-video'),
            ],
            [
                'name' => 'Simulator praktikum',
                'icon' => 'fas fa-gamepad',
                'route' => route('simulator'),
            ],
            [
                'name' => 'Cover jurnal',
                'icon' => 'fas fa-file',
                'route' => route('journal-cover'),
            ],
            [
                'name' => 'Asisten',
                'icon' => 'fas fa-users',
                'route' => route('assistant'),
            ],
            [
                'name' => 'Jadwal',
                'icon' => 'fas fa-calendar-minus',
                'route' => route('schedule'),
            ],
            [
                'name' => 'Organigram',
                'icon' => 'fas fa-sitemap',
                'route' => route('organigram'),
            ],
            [
                'name' => 'Social media',
                'icon' => 'fas fa-thumbs-up',
                'route' => route('social-media'),
            ],
        ];

        $this->current_route = $currentRoute;
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
