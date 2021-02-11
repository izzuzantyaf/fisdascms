<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Navbar extends Component
{
    public $logged_admin;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($loggedAdmin)
    {
        $this->logged_admin = $loggedAdmin;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.navbar');
    }
}
