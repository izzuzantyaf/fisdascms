<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
  public static function update(Request $request, $id)
  {
    // validate the data
    $validatedCredentials = $request->validate([
      'name' => 'required|max:255',
      'email' => [
        'required',
        'email:rfc,dns',
        Rule::unique('admins')->ignore($id),
        'max:255'
      ],
    ]);
    // do the update
    $is_update_successful = Admin::where('id', $id)->update($validatedCredentials);
    if ($is_update_successful) {
      // update the admin data in the session
      $admin = Admin::find($id);
      auth()->setUser($admin);
      return back()->with(['admin_update_message' => 'Data kamu berhasil diupdate']);
    }
    return back();
  }

  public static function delete($id)
  {
    $is_delete_successful = Admin::where('id', $id)->delete();
    return $is_delete_successful
      ? redirect()->route('logout')
      : back();
  }

  public static function change_password(Request $request, $id)
  {
    // validate
    $validatedCredentials = $request->validate([
      'old_password' => 'required|password',
      'new_password' => 'required|min:8|max:255|confirmed'
    ]);
    // hash the password
    Admin::where('id', $id)->update(['password' => bcrypt($validatedCredentials['new_password'])]);
    // log out the user
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect()->route('login')->with('password_reset_message', 'Password kamu berhasil diubah, silakan login kembali');
  }
}
