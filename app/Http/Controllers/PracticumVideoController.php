<?php

namespace App\Http\Controllers;

use App\Models\PracticumModule;
use Illuminate\Http\Request;

class PracticumVideoController extends Controller
{
    public static function get_practicum_videos()
    {
        return PracticumModule::select('id', 'name', 'acronym', 'icon', 'video_id', 'video_visibility')
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
