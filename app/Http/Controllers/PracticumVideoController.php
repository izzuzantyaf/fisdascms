<?php

namespace App\Http\Controllers;

use App\Models\PracticumModule;
use Illuminate\Http\Request;

class PracticumVideoController extends Controller
{
    public static function get_practicum_videos()
    {
        return PracticumModule::select('id', 'name', 'lang', 'acronym', 'icon', 'video_link', 'video_visibility')
            ->orderBy('id', 'asc')
            ->get();
    }

    public static function get_visible_practicum_videos()
    {
        return PracticumModule::select('id', 'name', 'lang', 'acronym', 'reactjs_icon', 'video_link')
            ->where('video_visibility', 1)
            ->orderBy('id', 'asc')
            ->get();
    }

    public static function update_practicum_video(Request $request)
    {
        $request_input = $request->input();
        array_pop($request_input);
        array_shift($request_input);
        foreach ($request_input as $key => $value) {
            [$column, $id] = explode('-', $key);
            PracticumModule::where('id', $id)
                ->update([$column => $value]);
        }
    }
}
