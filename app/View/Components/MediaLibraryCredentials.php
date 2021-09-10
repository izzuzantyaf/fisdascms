<?php

namespace App\View\Components;

use Illuminate\View\Component;

class MediaLibraryCredentials extends Component
{
    public $classes;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($classes = '')
    {
        $this->classes = $classes;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.media-library-credentials');
    }
}
