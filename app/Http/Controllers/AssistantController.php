<?php

namespace App\Http\Controllers;

use App\Models\Assistant;
use Illuminate\Http\Request;

class AssistantController extends Controller
{
    public static function get_all_assistants()
    {
        return Assistant::all();
    }
}
