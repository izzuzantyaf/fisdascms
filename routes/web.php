<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AssistantController;
use App\Http\Controllers\PracticumHandoutController;
use App\Http\Controllers\PreliminaryTestController;
use App\Http\Middleware\EnsureAdminIsLoggedIn;
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

Route::middleware(EnsureAdminIsLoggedIn::class)->group(function () {

    Route::get('/', function () {
        return view('welcome');
    });

    Route::get('/practicum-handouts', function () {

        $practicum_handouts = PracticumHandoutController::get_handouts();

        return view('practicum-handouts', [
            'practicum_handouts' => $practicum_handouts,
        ]);
    });

    Route::post('/practicum-handouts', function (Request $request) {

        PracticumHandoutController::update_handouts($request);
        return redirect('practicum-handouts');
    });

    Route::get('/assistants', function () {

        $assistants = AssistantController::get_all_assistants();
        return view('assistants', ['assistants' => $assistants]);
    });

    Route::get('/preliminary-test', function () {

        $preliminary_tests = PreliminaryTestController::get_preliminary_tests();

        return view('preliminary-test', [
            'preliminary_tests' => $preliminary_tests,
        ]);
    });

    Route::post('/preliminary-test', function (Request $request) {
        PreliminaryTestController::update_preliminary_test($request);
        return redirect('preliminary-test');
    });
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
