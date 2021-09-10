<?php

namespace App\View\Components;

use Illuminate\View\Component;

class PracticumVideoInputField extends Component
{
    public $id;
    public $name;
    public $acronym;
    public $icon;
    public $url;
    public $embed_url;
    public $visibility;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($id, $name, $acronym, $icon, $url, $embedUrl, $visibility)
    {
        $this->id = $id;
        $this->name = $name;
        $this->acronym = $acronym;
        $this->icon = $icon;
        $this->url = $url;
        $this->embed_url = $embedUrl;
        $this->visibility = $visibility;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.practicum-video-input-field');
    }
}
