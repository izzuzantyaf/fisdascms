<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AssistantController;
use App\Http\Controllers\JournalCoverController;
use App\Http\Controllers\OrganigramController;
use App\Http\Controllers\PracticumHandoutController;
use App\Http\Controllers\PracticumSimulatorController;
use App\Http\Controllers\PracticumVideoController;
use App\Http\Controllers\PreliminaryTestController;
use App\Http\Controllers\ScheduleController;
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

    Route::get('/practicum-video', function () {

        $practicum_videos = PracticumVideoController::get_practicum_videos();
        return view('practicum-video', [
            'practicum_videos' => $practicum_videos,
        ]);
    });

    Route::post('/practicum-video', function (Request $request) {
        PracticumVideoController::update_practicum_video($request);
        return redirect('/practicum-video');
    });

    Route::get('/practicum-simulator', function () {

        $practicum_simulators = PracticumSimulatorController::get_practicum_simulators();
        return view('practicum-simulator', [
            'practicum_simulators' => $practicum_simulators,
        ]);
    });

    Route::post('/practicum-simulator', function (Request $request) {
        PracticumSimulatorController::update_practicum_simulator($request);
        return redirect('/practicum-simulator');
    });

    Route::get('/journal-cover', function () {

        $journal_covers = JournalCoverController::get_journal_covers();
        return view('journal-cover', [
            'journal_covers' => $journal_covers,
        ]);
    });

    Route::post('/journal-cover', function (Request $request) {
        JournalCoverController::update_journal_cover($request);
        return redirect('/journal-cover');
    });

    Route::get('/organigram', function () {
        $organigram_url = OrganigramController::get_all_organigram()[0]->image_url;
        return view('organigram', ['organigram_url' => $organigram_url]);
    });

    Route::post('/organigram', function (Request $request) {
        $organigram_url = $request->input('organigram_url');
        if ($organigram_url) {
            OrganigramController::update_organigram($organigram_url);
            return redirect('/organigram')
                ->with('upload_status', 'Gambar berhasil diupload')
                ->with('theme', 'bg-green-200 text-green-600
            border border-green-300');
        }
        return redirect('/organigram')
            ->with('upload_status', 'Gambar gagal diupload')
            ->with('theme', 'bg-red-200 text-red-600
            border border-red-300');
    });

    Route::get('/schedule', function () {

        $class_schedule = ScheduleController::get_class_schedule();
        $module_schedules = ScheduleController::get_module_schedule();

        return view('schedule', [
            'class_schedule' => $class_schedule,
            'module_schedules' => $module_schedules,
        ]);
    });

    Route::post('/schedule', function (Request $request) {
        ScheduleController::update_schedule($request);
        return redirect('/schedule');
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
