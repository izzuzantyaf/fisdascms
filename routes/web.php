<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\PracticumHandoutController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function (Request $request) {
    if (!$request->session()->has('admin_logged_in')) return redirect('login');
    return view('welcome');
});

Route::get('/login', function (Request $request) {

    if ($request->session()->has('admin_logged_in')) return redirect('/');
    return view('login');
})->name('login');

Route::post('/login', function (Request $request) {

    $admin_controller = new AdminController;
    $login_status = $admin_controller->login($request);
    if ($login_status) return redirect('/');
    return back()->withInput()->with('login_error', true);
});

Route::get('/logout', function (Request $request) {

    AdminController::logout($request);
    return redirect('login');
});

Route::get('/register', function () {
    return view('register');
});

Route::post('/register', function (Request $request) {
    $admin_controller = new AdminController;
    $register_status = $admin_controller->register($request);

    if ($register_status === true)
        return redirect('login')->with('registration_message', 'Registrasi berhasil, kamu sekarang admin.');
    else
        return back()->withInput()
            ->with('register_username_error', $register_status['register_username_error'])
            ->with('register_email_error', $register_status['register_email_error'])
            ->with('register_password_error', $register_status['register_password_error']);
});

Route::get('/practicum-handouts', function () {
    $semester1_handouts = PracticumHandoutController::get_semester1_handouts();
    $semester2_handouts = PracticumHandoutController::get_semester2_handouts();

    return view('practicum-handouts', [
        'semester1_handouts' => $semester1_handouts,
        'semester2_handouts' => $semester2_handouts,
    ]);
});

Route::post('/practicum-handouts', function (Request $request) {
});
