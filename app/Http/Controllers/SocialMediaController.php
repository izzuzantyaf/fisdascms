<?php

namespace App\Http\Controllers;

use App\Models\SocialMedia;
use Illuminate\Http\Request;

class SocialMediaController extends Controller
{
    public static function get_all()
    {
        return SocialMedia::select('*')->orderBy('visibility', 'DESC')->orderBy('name')->get();
    }
}
