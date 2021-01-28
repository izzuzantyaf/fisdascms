<?php

namespace App\View\Components;

use Illuminate\View\Component;

class PracticumHandoutInputField extends Component
{
    public $faculty;
    public $lang;
    public $semester;
    public $file_url;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($faculty, $lang, $semester, $fileUrl)
    {
        $this->faculty = $faculty;
        $this->lang = $lang;
        $this->semester = $semester;
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
