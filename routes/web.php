<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AssistantController;
use App\Http\Controllers\CodeOfConductController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\JournalCoverController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\OrganigramController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\PracticumHandoutController;
use App\Http\Controllers\PracticumSimulatorController;
use App\Http\Controllers\PracticumVideoController;
use App\Http\Controllers\PreliminaryTestController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\SocialMediaController;
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

Route::group(['middleware' => 'auth'], function () {

    Route::get('/', function () {
        return redirect()->route('dashboard');
    })->name('home');

    Route::get('/dashboard', function () {
        return view('dashboard', [
            'total_faculty' => DashboardController::get_total_faculty(),
            'total_modules' => DashboardController::get_total_modules(),
            'total_assistants' => DashboardController::get_total_assistants(),
            'modules' => DashboardController::get_modules(),
            'admins' => DashboardController::get_admin(),
            'social_media_overview' => DashboardController::get_social_media_overview(),
            'others_overview' => DashboardController::get_others_overview(),
        ]);
    })->name('dashboard');

    Route::prefix('/code-of-conduct')->group(function () {
        Route::get('', [CodeOfConductController::class, 'index'])->name('code-of-conduct');
        Route::put('/{id}', [CodeOfConductController::class, 'update'])->name('code-of-conduct.update');
    });

    Route::prefix('/handout')->group(function () {
        Route::get('', [PracticumHandoutController::class, 'index'])->name('handout');
        Route::put('', [PracticumHandoutController::class, 'update'])->name('handout.update');
    });

    Route::prefix('/assistant')->group(function () {
        Route::get('', [AssistantController::class, 'index'])->name('assistant');
        Route::post('', [AssistantController::class, 'create'])->name('assistant.create');
        Route::put('/{id}', [AssistantController::class, 'update'])->name('assistant.update');
        Route::delete('/delete-multiple', [AssistantController::class, 'delete_multiple'])->name('assistant.delete-multiple');
        Route::delete('/{id}', [AssistantController::class, 'delete'])->name('assistant.delete');
    });

    Route::prefix('/preliminary-test')->group(function () {
        Route::get('', [PreliminaryTestController::class, 'index'])->name('preliminary-test');
        Route::put('', [PreliminaryTestController::class, 'update'])->name('preliminary-test.update');
    });

    Route::prefix('/practicum-video')->group(function () {
        Route::get('', [PracticumVideoController::class, 'index'])->name('practicum-video');
        Route::put('', [PracticumVideoController::class, 'update'])->name('practicum-video.update');
    });

    Route::prefix('/simulator')->group(function () {
        Route::get('', [PracticumSimulatorController::class, 'index'])->name('simulator');
        Route::put('', [PracticumSimulatorController::class, 'update'])->name('simulator.update');
    });

    Route::prefix('/journal-cover')->group(function () {
        Route::get('', [JournalCoverController::class, 'index'])->name('journal-cover');
        Route::put('', [JournalCoverController::class, 'update'])->name('journal-cover.update');
    });

    Route::prefix('/organigram')->group(function () {
        Route::get('', [OrganigramController::class, 'index'])->name('organigram');
        Route::put('/{id}', [OrganigramController::class, 'update'])->name('organigram.update');
    });

    Route::prefix('/schedule')->group(function () {
        Route::get('', [ScheduleController::class, 'index'])->name('schedule');
        Route::put('', [ScheduleController::class, 'update'])->name('schedule.update');
    });

    Route::prefix('/social-media')->group(function () {
        Route::get('', [SocialMediaController::class, 'index'])->name('social-media');
        Route::put('/{id}/visibility', [SocialMediaController::class, 'update_visibility'])->name('social-media.update-visibility');
        Route::put('/{id}/link', [SocialMediaController::class, 'update_link'])->name('social-media.update-link');
    });

    Route::prefix('/admin')->group(function () {
        Route::view('', 'admin.profile')->name('admin');
        Route::put('/{id}/update', [AdminController::class, 'update'])->name('admin.update');
        Route::delete('/{id}/delete', [AdminController::class, 'delete'])->name('admin.delete');
        Route::view('/change-password', 'admin.change-password')->name('admin.change-password');
        Route::put('/{id}/change-password/update', [AdminController::class, 'change_password'])->name('admin.change-password.update');
    });

    Route::get('/logout', [LogoutController::class, 'logout'])->name('logout');
});

Route::group(['middleware' => 'guest'], function () {
    Route::prefix('/register')->group(function () {
        Route::view('', 'auth.register')->name('register');
        Route::post('', [RegisterController::class, 'create'])->name('register.create');
    });

    Route::prefix('/login')->group(function () {
        Route::view('', 'auth.login')->name('login');
        Route::post('', [LoginController::class, 'authenticate'])->name('login.auth');
    });

    Route::prefix('/password-reset')->group(function () {
        Route::view('', 'auth.password-reset.email')->name('password-reset');
        Route::post('/request', [PasswordResetController::class, 'request'])->name('password-reset.request');
        Route::view('/new', 'auth.password-reset.new-password')->name('password-reset.new');
        Route::put('/reset/{id}', [PasswordResetController::class, 'reset'])->name('password-reset.reset');
    });
});

Route::get('/email/verify', [EmailVerificationController::class, 'notice'])
    ->middleware('auth')->name('verification.notice');
Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])
    ->middleware(['auth', 'signed'])->name('verification.verify');
Route::post('/email/verification-notification', [EmailVerificationController::class, 'send'])
    ->middleware(['auth', 'throttle:6,1'])->name('verification.send');
