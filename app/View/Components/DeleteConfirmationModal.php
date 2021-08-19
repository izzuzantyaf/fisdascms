<?php

namespace App\View\Components;

use Illuminate\View\Component;

class DeleteConfirmationModal extends Component
{
    public $action, $message;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($action, $message)
    {
        $this->action = $action;
        $this->message = $message;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.delete-confirmation-modal');
    }
}
