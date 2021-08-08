<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AssistantController;
use App\Http\Controllers\CodeOfConductController;
use App\Http\Controllers\JournalCoverController;
use App\Http\Controllers\OrganigramController;
use App\Http\Controllers\PracticumHandoutController;
use App\Http\Controllers\PracticumSimulatorController;
use App\Http\Controllers\PracticumVideoController;
use App\Http\Controllers\PreliminaryTestController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\SocialMediaController;
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
        return redirect('/dashboard');
    });

    Route::get('/dashboard', function () {
        return view('dashboard');
    });

    Route::get('/code-of-conduct', function () {
        $code_of_conduct = CodeOfConductController::get_code_of_conduct();
        return view('code-of-conduct', [
            'code_of_conduct' => $code_of_conduct[0],
        ]);
    });

    Route::post('/code-of-conduct', function (Request $request) {
        CodeOfConductController::update_code_of_conduct($request);
        return redirect('/code-of-conduct');
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

    Route::post('/assistants', function (Request $request) {
        $result = AssistantController::add_assistant($request);
        return back()->with('result_message', $result ? 'Asisten berhasil ditambahkan' : null);
    });

    Route::put('/assistants/{id}', function (Request $request, $id) {
        $result = AssistantController::update_assistant($request, $id);
        return back()->with('result_message', $result ? 'Asisten berhasil diubah' : null);
    });

    Route::delete('/assistants/{id}', function ($id) {
        $result = AssistantController::delete_assistant($id);
        return back()->with('result_message', $result ? 'Asisten berhasil dihapus' : null);
    });

    Route::post('/assistants/delete-multiple', function (Request $request) {
        $result = AssistantController::delete_multiple_assistants($request);
        return back()->with('result_message', "Berhasil menghapus $result asisten");
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
        $signature = hash('sha256', 'cloud_name='
            . env('CLOUDINARY_USERNAME')
            . '&timestamp=' . time() + 300 . '&username='
            . env('CLOUDINARY_USERNAME')
            . env('CLOUDINARY_SECRET_API'));
        return view('organigram', [
            'organigram_url' => $organigram_url,
            'signature' => $signature,
        ]);
    });

    Route::post('/organigram', function (Request $request) {
        $organigram_url = $request->input('organigram_url');
        if ($organigram_url) {
            OrganigramController::update_organigram($organigram_url);
            return redirect('/organigram')
                ->with('upload_status', 'Organigram berhasil diupdate')
                ->with('theme', 'bg-green-400 text-white');
        }
        return redirect('/organigram')
            ->with('upload_status', 'Organigram gagal diupdate')
            ->with('theme', 'bg-red-400 text-white');
    });

    Route::get('/schedule', function () {
        $class_schedule = ScheduleController::get_class_schedule();
        $module_schedules = ScheduleController::get_module_schedule();
        $signature = hash('sha256', 'cloud_name='
            . env('CLOUDINARY_USERNAME')
            . '&timestamp=' . time() + 300 . '&username='
            . env('CLOUDINARY_USERNAME')
            . env('CLOUDINARY_SECRET_API'));
        return view('schedule', [
            'class_schedule' => $class_schedule,
            'module_schedules' => $module_schedules,
            'signature' => $signature,
            'time' => time() + 300,
        ]);
    });

    Route::post('/schedule', function (Request $request) {
        ScheduleController::update_schedule($request);
        return redirect('/schedule');
    });

    Route::get('/social-media', function () {
        $social_medias = SocialMediaController::get_all();
        return view('social-media', ['social_medias' => $social_medias]);
    });

    Route::get('/admin-profile', function () {
        return view('profile', [
            'logged_admin' => session('admin_logged_in'),
        ]);
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
