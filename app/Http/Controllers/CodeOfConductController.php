<?php

namespace App\Http\Controllers;

use App\Models\CodeOfConduct;
use Illuminate\Http\Request;

class CodeOfConductController extends Controller
{
    public static function get_all()
    {
        return CodeOfConduct::all()[0];
    }

    public static function index()
    {
        return view('code-of-conduct', [
            'code_of_conduct' => self::get_all(),
        ]);
    }

    public static function update(Request $request, $id)
    {
        $code_of_conduct = CodeOfConduct::find($id);
        if ($code_of_conduct->original_url == $request->input('file_url'))
            return back();
        $code_of_conduct->original_url = $request->input('file_url');
        $code_of_conduct->prepared_url = str_replace('view', 'preview', $request->input('file_url'));
        $is_update_successfully =  $code_of_conduct->save();
        return back()->with([
            'code_of_conduct_update_message' => $is_update_successfully ? 'Tata tertib berhasil diupdate' : null
        ]);
    }
}
