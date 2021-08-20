<?php

namespace App\Http\Controllers;

use App\Models\Assistant;
use App\Models\PracticumModule;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public static function get_total_faculty()
    {
        return 2;
    }

    public static function get_total_modules()
    {
        return PracticumModule::count() / 2;
    }

    public static function get_total_assistants()
    {
        return Assistant::count();
    }
}
