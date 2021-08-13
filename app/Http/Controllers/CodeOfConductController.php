<?php

namespace App\Http\Controllers;

use App\Models\CodeOfConduct;
use Illuminate\Http\Request;

class CodeOfConductController extends Controller
{
    public static function get_all()
    {
        return CodeOfConduct::all();
    }

    public static function update(Request $request, $id)
    {
        $code_of_conduct = CodeOfConduct::find($id);
        if ($code_of_conduct->original_url == $request->input('file_url'))
            return false;
        $code_of_conduct->original_url = $request->input('file_url');
        $code_of_conduct->prepared_url = str_replace('view', 'preview', $request->input('file_url'));
        return $code_of_conduct->save();
    }
}
