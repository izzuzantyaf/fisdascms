<?php

namespace App\Http\Controllers;

use App\Models\PracticumModule;
use Illuminate\Http\Request;

class PracticumVideoController extends Controller
{
    public static function get_all()
    {
        return PracticumModule::select('id', 'name', 'lang', 'acronym', 'icon', 'video_url', 'video_embed_url', 'video_visibility')
            ->orderBy('id', 'asc')
            ->get();
    }

    public static function get_visible()
    {
        return PracticumModule::select('id', 'name', 'lang', 'acronym', 'reactjs_icon', 'video_embed_url')
            ->where('video_visibility', 1)
            ->orderBy('id', 'asc')
            ->get();
    }

    public static function index()
    {
        return view('practicum-video', [
            'practicum_videos' => self::get_all(),
        ]);
    }

    public static function update(Request $request)
    {
        $practicum_videos = $request->input('practicum_videos');
        $updated_videos = [];
        foreach ($practicum_videos as $key => $video) {
            $practicum_module = PracticumModule::find($key);
            if ($practicum_module->video_url != $video['url'])
                $practicum_module->video_url = $video['url'];
            else if ($practicum_module->video_visibility != $video['visibility'])
                $practicum_module->video_visibility = $video['visibility'];
            else
                continue;
            $practicum_module->video_embed_url = str_replace('youtu.be', 'www.youtube.com/embed', $video['url']);
            $is_update_success = $practicum_module->save();
            if ($is_update_success) {
                $is_acronym_exists = array_search($practicum_module->acronym, $updated_videos);
                if ($is_acronym_exists === false)
                    array_push($updated_videos, $practicum_module->acronym);
            }
        }
        return back()->with([
            'practicum_video_update_message' => !empty($updated_videos)
                ? 'Video ' . implode(', ', $updated_videos) . ' berhasil diupdate'
                : null
        ]);
    }
}
