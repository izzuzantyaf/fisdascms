<?php

namespace App\Http\Controllers;

use App\Models\PracticumHandout;
use Illuminate\Http\Request;

class PracticumHandoutController extends Controller
{
    public static function get_all()
    {
        return PracticumHandout::orderBy('faculty', 'DESC')
            ->orderBy('lang', 'DESC')
            ->get();
    }

    public static function get_visible_handouts()
    {
        return PracticumHandout::where('visibility', 1)
            ->orderBy('faculty', 'DESC')
            ->orderBy('lang', 'DESC')
            ->get();
    }

    public static function index()
    {
        return view('handout', ['handouts' => self::get_all()]);
    }

    public static function update(Request $request)
    {
        $handouts = $request->input('handouts');
        $updated_handouts = [];
        foreach ($handouts as $key => $handout) {
            $existing_handout = PracticumHandout::find($key);
            if ($existing_handout->file_url != $handout['file_url'])
                $existing_handout->file_url = $handout['file_url'];
            else if ($existing_handout->visibility != $handout['visibility'])
                $existing_handout->visibility = $handout['visibility'];
            else
                continue;
            $is_update_success = $existing_handout->save();
            if ($is_update_success)
                array_push($updated_handouts, "$existing_handout->faculty ($existing_handout->lang)");
        }
        return back()->with([
            'handout_update_message' => !empty($updated_handouts)
                ? 'Modul ' . implode(', ', $updated_handouts) . ' berhasil diupdate'
                : null
        ]);
    }
}
