<?php

namespace App\Http\Controllers;

use App\Models\Organigram;
use Illuminate\Http\Request;

class OrganigramController extends Controller
{
    public static function get_all()
    {
        return Organigram::all()[0];
    }

    public static function index()
    {
        return view('organigram', ['organigram' => self::get_all()]);
    }

    public static function update(Request $request, $id)
    {
        $organigram = Organigram::find($id);
        if ($organigram->original_url == $request->input('organigram_url'))
            return back();
        $organigram->original_url = $request->input('organigram_url');
        $organigram->prepared_url = str_replace('view', 'preview', $request->input('organigram_url'));
        $is_update_success = $organigram->save();
        return back()->with([
            'organigram_update_message' => $is_update_success ? 'Organigram berhasil diupdate' : null
        ]);
    }

    public static function store_organigram(Request $request)
    {
        if ($request->hasFile('organigram')) {
            $path = $request->file('organigram')->storePublicly('public');
            if ($request->file('organigram')->isValid())
                return $path;
        }
        return false;
    }
}
