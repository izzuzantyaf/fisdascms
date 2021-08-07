<?php

namespace App\Http\Controllers;

use App\Models\Organigram;
use Illuminate\Http\Request;

class OrganigramController extends Controller
{
    public static function update_organigram($image_url)
    {
        return Organigram::where('id', 1)->update(['image_url' => $image_url]);
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

    public static function get_all_organigram()
    {
        return Organigram::firstWhere('id', 1)->get();
    }
}
