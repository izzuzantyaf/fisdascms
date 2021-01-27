<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;

class AdminController extends Controller
{

    public function register(Request $request)
    {
        $admin = new Admin;

        // collect new admin datas from the form
        $admin->username = $request->input('username');
        $admin->email = $request->input('email');
        $admin->name = $request->input('name');
        $admin->password = $request->input('password');
        $password_confirm = $request->input('password_confirm');
        $admin->remember_token = uniqid();

        $is_username_is_used = Admin::firstWhere('username', $admin->username) ? true : false;
        $is_email_is_used = Admin::firstWhere('email', $admin->email) ? true : false;

        if (!$is_username_is_used && !$is_email_is_used && ($admin->password === $password_confirm)) {
            // encrypt the password
            $admin->password = md5($admin->password);
            // add new admin into database
            return $admin->save();
        } else return [
            'register_username_error' => $is_username_is_used,
            'register_email_error' => $is_email_is_used,
            'register_password_error' => !($admin->password === $password_confirm),
        ];
    }

    public function login(Request $request)
    {
        $admin = new Admin;

        // collect admin's username and password
        $admin_username = $request->input('username');
        $admin_password = $request->input('password');

        // search admin in database
        $admin_from_db = $admin->firstWhere('username', $admin_username);

        if ($admin_from_db) {
            // check admin's password
            if (md5($admin_password) === $admin_from_db['password'])
                session(['admin_logged_in' => $admin_from_db['remember_token']]);
            return true;
        } else return false;
    }

    public static function logout(Request $request)
    {
        $request->session()->forget('admin_logged_in');
        return true;
    }
}
