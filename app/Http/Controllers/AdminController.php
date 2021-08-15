<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;

class AdminController extends Controller
{
  public static function index(Request $request)
  {
    return view('profile', [
      'logged_admin' => $request->session()->get('logged_admin'),
    ]);
  }
}
