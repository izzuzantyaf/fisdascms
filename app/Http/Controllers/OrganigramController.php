<?php

namespace App\Http\Controllers;

use App\Models\Organigram;
use Illuminate\Http\Request;

class OrganigramController extends Controller
{
    public static function update(Request $request, $id)
    {
        $organigram = Organigram::find($id);
        if ($organigram->original_url == $request->input('organigram_url'))
            return false;
        $organigram->original_url = $request->input('organigram_url');
        $organigram->prepared_url = str_replace('view', 'preview', $request->input('organigram_url'));
        return $organigram->save();
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

    public static function get_all()
    {
        return Organigram::all();
    }
}
