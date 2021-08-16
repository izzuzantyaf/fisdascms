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

    public static function create(Request $request)
    {
        $new_assistant = $request->except(['_method', '_token']);
        $is_insert_successfully = Assistant::create($new_assistant);
        return back()->with('result_message', $is_insert_successfully
            ? 'Asisten berhasil ditambahkan'
            : null);
    }

    public static function update(Request $request, $id)
    {
        $assistant = $request->except(['_method', '_token']);
        $is_insert_successfully = Assistant::where('id', $id)->update($assistant);
        return back()->with('result_message', $is_insert_successfully
            ? 'Asisten berhasil diubah'
            : null);
    }

    public static function delete($id)
    {
        $is_delete_successfully =  Assistant::find($id)->delete();
        return back()->with('result_message', $is_delete_successfully
            ? 'Asisten berhasil dihapus'
            : null);
    }

    public static function delete_multiple(Request $request)
    {
        $how_many = Assistant::destroy($request->input('assistant_selected'));
        return back()->with('result_message', $how_many
            ? "Berhasil menghapus $how_many asisten"
            : null);
    }
}
