<?php

namespace App\Http\Controllers;

use App\Models\PracticumModule;
use Illuminate\Http\Request;

class JournalCoverController extends Controller
{
    public static function get_journal_covers()
    {
        return PracticumModule::select('id', 'name', 'acronym', 'icon', 'journal_cover_link', 'journal_cover_visibility')
            ->where('lang', 'id')
            ->orderBy('id', 'asc')
            ->get();
    }

    public static function get_visible_journal_covers()
    {
        return PracticumModule::select('id', 'name', 'acronym', 'reactjs_icon', 'journal_cover_link')
            ->where('journal_cover_visibility', 1)
            ->orderBy('id', 'asc')
            ->get();
    }

    public static function update_journal_cover(Request $request)
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
