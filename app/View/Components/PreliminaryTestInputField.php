<?php

namespace App\View\Components;

use Illuminate\View\Component;

class PreliminaryTestInputField extends Component
{
    public $id;
    public $name;
    public $acronym;
    public $icon;
    public $link;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($id, $name, $acronym, $icon, $link)
    {
        $this->id = $id;
        $this->name = $name;
        $this->acronym = $acronym;
        $this->icon = $icon;
        $this->link = $link;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.preliminary-test-input-field');
    }
}
