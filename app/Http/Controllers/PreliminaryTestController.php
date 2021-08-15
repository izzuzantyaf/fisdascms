<?php

namespace App\Http\Controllers;

use App\Models\PracticumModule;
use Illuminate\Http\Request;

class PreliminaryTestController extends Controller
{
    public static function get_all()
    {
        return PracticumModule::select('id', 'name', 'acronym', 'icon', 'preliminary_test_link', 'preliminary_test_visibility')
            ->where('lang', 'id')
            ->orderBy('id', 'asc')
            ->get();
    }

    public static function get_visible()
    {
        return PracticumModule::select('id', 'name', 'acronym', 'reactjs_icon', 'preliminary_test_link', 'preliminary_test_visibility')
            ->where('lang', 'id')
            ->where('preliminary_test_visibility', 1)
            ->orderBy('id', 'asc')
            ->get();
    }

    public static function index()
    {
        return view('preliminary-test', [
            'preliminary_tests' => self::get_all(),
        ]);
    }

    public static function update(Request $request)
    {
        $preliminary_tests = $request->input('preliminary_tests');
        $updated_preliminary_tests = [];
        foreach ($preliminary_tests as $key => $preliminary_test) {
            $existing_preliminary_test = PracticumModule::find($key);
            if ($existing_preliminary_test->preliminary_test_link != $preliminary_test['link'])
                $existing_preliminary_test->preliminary_test_link = $preliminary_test['link'];
            else if ($existing_preliminary_test->preliminary_test_visibility != $preliminary_test['visibility'])
                $existing_preliminary_test->preliminary_test_visibility = $preliminary_test['visibility'];
            else
                continue;
            $is_update_success = $existing_preliminary_test->save();
            if ($is_update_success) {
                array_push($updated_preliminary_tests, $existing_preliminary_test->acronym);
            }
        }
        return back()->with([
            'preliminary_test_update_message' => $updated_preliminary_tests
                ? 'TP ' . implode(', ', $updated_preliminary_tests) . ' berhasil diupdate'
                : null
        ]);
    }
}
