<?php

namespace App\View\Components;

use Illuminate\View\Component;

class PracticumSimulatorInputField extends Component
{
    public $id;
    public $name;
    public $acronym;
    public $icon;
    public $link;
    public $visibility;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($id, $name, $acronym, $icon, $link, $visibility)
    {
        $this->id = $id;
        $this->name = $name;
        $this->acronym = $acronym;
        $this->icon = $icon;
        $this->link = $link;
        $this->visibility = $visibility;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.practicum-simulator-input-field');
    }
}
