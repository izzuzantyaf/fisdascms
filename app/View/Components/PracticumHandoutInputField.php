<?php

namespace App\View\Components;

use Illuminate\View\Component;

class PracticumHandoutInputField extends Component
{
    public $id;
    public $faculty;
    public $lang;
    public $visibility;
    public $file_url;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($id, $faculty, $lang, $visibility, $fileUrl)
    {
        $this->id = $id;
        $this->faculty = $faculty;
        $this->lang = $lang;
        $this->visibility = $visibility;
        $this->file_url = $fileUrl;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.practicum-handout-input-field');
    }
}
