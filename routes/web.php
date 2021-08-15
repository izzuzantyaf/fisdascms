<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AssistantController;
use App\Http\Controllers\CodeOfConductController;
use App\Http\Controllers\JournalCoverController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\OrganigramController;
use App\Http\Controllers\PracticumHandoutController;
use App\Http\Controllers\PracticumSimulatorController;
use App\Http\Controllers\PracticumVideoController;
use App\Http\Controllers\PreliminaryTestController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\SocialMediaController;
use App\Http\Middleware\EnsureAdminIsLoggedIn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        return redirect('/dashboard');
    });

    Route::get('/dashboard', function () {
        return view('dashboard');
    });

    Route::get('/code-of-conduct', function () {
        $code_of_conduct = CodeOfConductController::get_all()[0];
        return view('code-of-conduct', [
            'code_of_conduct' => $code_of_conduct,
        ]);
    });

    Route::put('/code-of-conduct/{id}', function (Request $request, $id) {
        $result = CodeOfConductController::update($request, $id);
        return redirect('/code-of-conduct')->with([
            'code_of_conduct_update_message' => $result ? 'Tata tertib berhasil diupdate' : null
        ]);
    });

    Route::get('/practicum-handouts', function () {
        $practicum_handouts = PracticumHandoutController::get_all();
        return view('practicum-handouts', [
            'practicum_handouts' => $practicum_handouts,
        ]);
    });

    Route::put('/practicum-handouts', function (Request $request) {
        $updated_handouts = PracticumHandoutController::update($request);
        return redirect('practicum-handouts')->with([
            'handout_update_message' => empty($updated_handouts) ? null : 'Modul ' . implode(', ', $updated_handouts) . ' berhasil diupdate'
        ]);
    });

    Route::get('/assistants', function () {
        $assistants = AssistantController::get_all();
        return view('assistants', ['assistants' => $assistants]);
    });

    Route::post('/assistants', function (Request $request) {
        $result = AssistantController::insert($request);
        return back()->with('result_message', $result ? 'Asisten berhasil ditambahkan' : null);
    });

    Route::put('/assistants/{id}', function (Request $request, $id) {
        $result = AssistantController::update($request, $id);
        return back()->with('result_message', $result ? 'Asisten berhasil diubah' : null);
    });

    Route::delete('/assistants/{id}', function ($id) {
        $result = AssistantController::delete($id);
        return back()->with('result_message', $result ? 'Asisten berhasil dihapus' : null);
    });

    Route::post('/assistants/delete-multiple', function (Request $request) {
        $result = AssistantController::delete_multiple($request);
        return back()->with('result_message', $result ? "Berhasil menghapus $result asisten" : null);
    });

    Route::get('/preliminary-test', function () {
        $preliminary_tests = PreliminaryTestController::get_all();
        return view('preliminary-test', [
            'preliminary_tests' => $preliminary_tests,
        ]);
    });

    Route::put('/preliminary-test', function (Request $request) {
        $result = PreliminaryTestController::update($request);
        return redirect('preliminary-test')->with([
            'preliminary_test_update_message' => $result ? 'TP ' . implode(', ', $result) . ' berhasil diupdate' : null
        ]);
    });

    Route::get('/practicum-video', function () {
        $practicum_videos = PracticumVideoController::get_all();
        return view('practicum-video', [
            'practicum_videos' => $practicum_videos,
        ]);
    });

    Route::put('/practicum-video', function (Request $request) {
        $result = PracticumVideoController::update($request);
        return redirect('/practicum-video')->with([
            'practicum_video_update_message' => !empty($result) ? 'Video ' . implode(', ', $result) . ' berhasil diupdate' : null
        ]);
    });

    Route::get('/practicum-simulator', function () {
        $practicum_simulators = PracticumSimulatorController::get_all();
        return view('practicum-simulator', [
            'practicum_simulators' => $practicum_simulators,
        ]);
    });

    Route::put('/practicum-simulator', function (Request $request) {
        $result = PracticumSimulatorController::update($request);
        return redirect('/practicum-simulator')->with([
            'practicum_simulator_update_message' => !empty($result) ? 'Simulator ' . implode(', ', $result) . ' berhasil diupdate' : null
        ]);
    });

    Route::get('/journal-cover', function () {
        $journal_covers = JournalCoverController::get_all();
        return view('journal-cover', [
            'journal_covers' => $journal_covers,
        ]);
    });

    Route::put('/journal-cover', function (Request $request) {
        $result = JournalCoverController::update($request);
        return redirect('/journal-cover')->with([
            'journal_cover_update_message' => !empty($result) ? 'Cover jurnal ' . implode(', ', $result) . ' berhasil diupdate' : null
        ]);
    });

    Route::get('/organigram', function () {
        $organigram = OrganigramController::get_all()[0];
        return view('organigram', [
            'organigram' => $organigram,
        ]);
    });

    Route::put('/organigram/{id}', function (Request $request, $id) {
        $is_update_success = OrganigramController::update($request, $id);
        return redirect('/organigram')->with([
            'organigram_update_message' => $is_update_success ? 'Organigram berhasil diupdate' : null
        ]);
    });

    Route::get('/schedule', function () {
        $class_schedule = ScheduleController::get_class_schedule();
        $module_schedules = ScheduleController::get_module_schedule();
        return view('schedule', [
            'class_schedule' => $class_schedule,
            'module_schedules' => $module_schedules,
        ]);
    });

    Route::put('/schedule', function (Request $request) {
        $result = ScheduleController::update($request);
        return redirect('/schedule')->with([
            'schedule_update_message' => $result ? ucfirst(implode(', ', $result) . ' berhasil diupdate') : null
        ]);
    });

    Route::get('/social-media', function () {
        $social_medias = SocialMediaController::get_all();
        return view('social-media', ['social_medias' => $social_medias]);
    });

    Route::put('/social-media/{id}/visibility', function (Request $request, $id) {
        $result = SocialMediaController::update_visibility($request, $id);
        return back()->with('result_message', $result ? $result->name . ($result->visibility ? ' dimunculkan' : ' disembunyikan') . ' pada website utama' : null);
    });

    Route::put('social-media/{id}/link', function (Request $request, $id) {
        $result = SocialMediaController::update_link($request, $id);
        return back()->with('result_message', $result ? "Link $result->name berhasil diubah" : null);
    });

    Route::get('/admin-profile', function (Request $request) {
        return view('profile', [
            'logged_admin' => $request->session()->get('logged_admin'),
        ]);
    });
});

Route::get('/login', function (Request $request) {
    if ($request->session()->has('logged_admin'))
        return redirect('/');
    return view('login');
})->name('login');

Route::post('/login', function (Request $request) {
    $is_authenticated = LoginController::authenticate($request);
    if ($is_authenticated)
        return redirect('/');
    else
        return back()->withErrors([
            'login_error' => 'Username atau password kamu mungkin salah'
        ]);
});

Route::get('/logout', function (Request $request) {
    LogoutController::logout($request);
    return redirect('/login');
});

Route::get('/register', function () {
    return view('register');
});

Route::post('/register', function (Request $request) {
    $is_register_successfull = RegisterController::register($request);
    if ($is_register_successfull)
        return redirect('/login')->with('registration_message', 'Registrasi berhasil, kamu sekarang admin.');
});
