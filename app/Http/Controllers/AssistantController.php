<?php

namespace App\Http\Controllers;

use App\Models\Assistant;

class AssistantController extends Controller
{
    public static function get_all_assistants()
    {
        return Assistant::select('*')->orderBy('name', 'ASC')->get();
    }

    public static function add_assistant($request)
    {
        $assistant = new Assistant;
        $assistant->name = $request->input('assistant_name');
        $assistant->code = $request->input('assistant_code');
        $assistant->phone_number = $request->input('assistant_phone');
        $assistant->line_id = $request->input('assistant_line_id');
        $assistant->feedback_link = $request->input('assistant_feedback_link');
        return $assistant->save();
    }

    public static function update_assistant($request, $id)
    {
        $assistant = Assistant::find($id);
        $assistant->name = $request->input('assistant_name');
        $assistant->code = $request->input('assistant_code');
        $assistant->phone_number = $request->input('assistant_phone');
        $assistant->line_id = $request->input('assistant_line_id');
        $assistant->feedback_link = $request->input('assistant_feedback_link');
        return $assistant->save();
    }

    public static function delete_assistant($id)
    {
        $assistant = Assistant::find($id);
        return $assistant->delete();
    }

    public static function delete_multiple_assistants($request)
    {
        return Assistant::destroy($request->input('assistant_selected'));
    }
}
