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

    public static function index()
    {
        return view('social-media', ['social_medias' => self::get_all()]);
    }

    public static function update_link(Request $request, $id)
    {
        $social_media = SocialMedia::find($id);
        if ($social_media->link == $request->input('social_media_link'))
            return back();
        $social_media->link = $request->input('social_media_link');
        $social_media->save();
        return back()->with('result_message', $social_media ? "Link $social_media->name berhasil diubah" : null);
    }

    public static function update_visibility(Request $request, $id)
    {
        $social_media = SocialMedia::find($id);
        $social_media->visibility = !intval($request->input('social_media_visibility'));
        $social_media->save();
        return back()->with('result_message', $social_media
            ? $social_media->name . ($social_media->visibility ? ' dimunculkan' : ' disembunyikan') . ' pada website utama'
            : null);
    }
}
