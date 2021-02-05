<?php

use App\Http\Controllers\AssistantController;
use App\Http\Controllers\JournalCoverController;
use App\Http\Controllers\PracticumHandoutController;
use App\Http\Controllers\PracticumSimulatorController;
use App\Http\Controllers\PracticumVideoController;
use App\Models\SocialMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/assistant', function () {
    return AssistantController::get_all_assistants();
});

Route::get('/practicum-handout', function () {
    return PracticumHandoutController::get_visible_handouts();
});

Route::get('/practicum-video', function () {
    return PracticumVideoController::get_visible_practicum_videos();
});

Route::get('/practicum-simulator', function () {
    return PracticumSimulatorController::get_visible_practicum_simulators();
});

Route::get('/journal-cover', function () {
    return JournalCoverController::get_visible_journal_covers();
});

Route::get('/social-media', function () {
    return SocialMedia::all();
});
