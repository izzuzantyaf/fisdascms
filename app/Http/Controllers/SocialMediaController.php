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

    public static function update_link(Request $request, $id)
    {
        $social_media = SocialMedia::find($id);
        $social_media->link = $request->input('social_media_link');
        return $social_media->save() ? SocialMedia::find($id) : false;
    }

    public static function update_visibility(Request $request, $id)
    {
        $social_media = SocialMedia::find($id);
        $social_media->visibility = !intval($request->input('social_media_visibility'));
        return $social_media->save() ? SocialMedia::find($id) : false;
    }
}
