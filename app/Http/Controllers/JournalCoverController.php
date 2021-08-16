<?php

namespace App\Http\Controllers;

use App\Models\PracticumModule;
use Illuminate\Http\Request;

class JournalCoverController extends Controller
{
    public static function get_all()
    {
        return PracticumModule::select('id', 'name', 'acronym', 'icon', 'journal_cover_link', 'journal_cover_visibility')
            ->where('lang', 'id')
            ->orderBy('id', 'asc')
            ->get();
    }

    public static function get_visible()
    {
        return PracticumModule::select('id', 'name', 'acronym', 'reactjs_icon', 'journal_cover_link')
            ->where('lang', 'id')
            ->where('journal_cover_visibility', 1)
            ->orderBy('id', 'asc')
            ->get();
    }

    public static function index()
    {
        return view('journal-cover', ['journal_covers' => self::get_all()]);
    }

    public static function update(Request $request)
    {
        $journal_covers = $request->input('journal_covers');
        $updated_journal_covers = [];
        foreach ($journal_covers as $key => $journal_cover) {
            $existing_journal_cover = PracticumModule::find($key);
            if ($existing_journal_cover->journal_cover_link != $journal_cover['link'])
                $existing_journal_cover->journal_cover_link = $journal_cover['link'];
            else if ($existing_journal_cover->journal_cover_visibility != $journal_cover['visibility'])
                $existing_journal_cover->journal_cover_visibility = $journal_cover['visibility'];
            else
                continue;
            $is_update_success = $existing_journal_cover->save();
            if ($is_update_success) {
                $updated_journal_cover = PracticumModule::find($key);
                array_push($updated_journal_covers, $updated_journal_cover->acronym);
            }
        }
        return back()->with([
            'journal_cover_update_message' => !empty($updated_journal_covers)
                ? 'Cover jurnal ' . implode(', ', $updated_journal_covers) . ' berhasil diupdate'
                : null
        ]);
    }
}
