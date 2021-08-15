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

    Route::prefix('/code-of-conduct')->group(function () {
        Route::get('', [CodeOfConductController::class, 'index']);
        Route::put('/{id}', [CodeOfConductController::class, 'update']);
    });

    Route::prefix('/practicum-handouts')->group(function () {
        Route::get('', [PracticumHandoutController::class, 'index']);
        Route::put('', [PracticumHandoutController::class, 'update']);
    });

    Route::prefix('/assistants')->group(function () {
        Route::get('', [AssistantController::class, 'index']);
        Route::post('', [AssistantController::class, 'insert']);
        Route::put('/{id}', [AssistantController::class, 'update']);
        Route::delete('/{id}', [AssistantController::class, 'delete']);
        Route::post('/delete-multiple', [AssistantController::class, 'delete_multiple']);
    });

    Route::prefix('/preliminary-test')->group(function () {
        Route::get('', [PreliminaryTestController::class, 'index']);
        Route::put('', [PreliminaryTestController::class, 'update']);
    });

    Route::prefix('/practicum-video')->group(function () {
        Route::get('', [PracticumVideoController::class, 'index']);
        Route::put('', [PracticumVideoController::class, 'update']);
    });

    Route::prefix('/practicum-simulator')->group(function () {
        Route::get('', [PracticumSimulatorController::class, 'index']);
        Route::put('', [PracticumSimulatorController::class, 'update']);
    });

    Route::prefix('/journal-cover')->group(function () {
        Route::get('', [JournalCoverController::class, 'index']);
        Route::put('', [JournalCoverController::class, 'update']);
    });

    Route::prefix('/organigram')->group(function () {
        Route::get('', [OrganigramController::class, 'index']);
        Route::put('/{id}', [OrganigramController::class, 'update']);
    });

    Route::prefix('/schedule')->group(function () {
        Route::get('', [ScheduleController::class, 'index']);
        Route::put('', [ScheduleController::class, 'update']);
    });

    Route::prefix('/social-media')->group(function () {
        Route::get('', [SocialMediaController::class, 'index']);
        Route::put('/{id}/visibility', [SocialMediaController::class, 'update_visibility']);
        Route::put('/{id}/link', [SocialMediaController::class, 'update_link']);
    });

    Route::get('/admin-profile', [AdminController::class, 'index']);
});

Route::get('/login', [LoginController::class, 'index'])->name('login');

Route::post('/login', [LoginController::class, 'authenticate']);

Route::get('/logout', [LogoutController::class, 'logout']);

Route::view('/register', 'register');

Route::post('/register', [RegisterController::class, 'register']);
