<?php

namespace App\Http\Controllers;

use App\Models\Assistant;
use Illuminate\Http\Request;

class AssistantController extends Controller
{
    public static function get_all()
    {
        return Assistant::select('*')->orderBy('name', 'ASC')->get();
    }

    public static function index()
    {
        return view('assistants', ['assistants' => self::get_all()]);
    }

    public static function insert(Request $request)
    {
        $assistant = new Assistant;
        $assistant->name = $request->input('assistant_name');
        $assistant->code = $request->input('assistant_code');
        $assistant->phone_number = $request->input('assistant_phone');
        $assistant->line_id = $request->input('assistant_line_id');
        $assistant->feedback_link = $request->input('assistant_feedback_link');
        $is_insert_successfully = $assistant->save();
        return back()->with('result_message', $is_insert_successfully ? 'Asisten berhasil ditambahkan' : null);
    }

    public static function update(Request $request, $id)
    {
        $assistant = Assistant::find($id);
        $assistant->name = $request->input('assistant_name');
        $assistant->code = $request->input('assistant_code');
        $assistant->phone_number = $request->input('assistant_phone');
        $assistant->line_id = $request->input('assistant_line_id');
        $assistant->feedback_link = $request->input('assistant_feedback_link');
        $is_insert_successfully = $assistant->save();
        return back()->with('result_message', $is_insert_successfully ? 'Asisten berhasil diubah' : null);
    }

    public static function delete($id)
    {
        $assistant = Assistant::find($id);
        $is_delete_successfully =  $assistant->delete();
        return back()->with('result_message', $is_delete_successfully ? 'Asisten berhasil dihapus' : null);
    }

    public static function delete_multiple(Request $request)
    {
        $how_many = Assistant::destroy($request->input('assistant_selected'));
        return back()->with('result_message', $how_many ? "Berhasil menghapus $how_many asisten" : null);
    }
}
