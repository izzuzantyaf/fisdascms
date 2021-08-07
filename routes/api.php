<?php

use App\Http\Controllers\AssistantController;
use App\Http\Controllers\CodeOfConductController;
use App\Http\Controllers\JournalCoverController;
use App\Http\Controllers\OrganigramController;
use App\Http\Controllers\PracticumHandoutController;
use App\Http\Controllers\PracticumSimulatorController;
use App\Http\Controllers\PracticumVideoController;
use App\Http\Controllers\PreliminaryTestController;
use App\Http\Controllers\ScheduleController;
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

Route::get('/code-of-conduct', function () {
    return CodeOfConductController::get_code_of_conduct()[0];
});

Route::get('/practicum-handout', function () {
    return PracticumHandoutController::get_visible_handouts();
});

Route::get('/preliminary-test', function () {
    return PreliminaryTestController::get_visible_preliminary_tests();
});

Route::get('/practicum-video', function () {
    return PracticumVideoController::get_visible_practicum_videos();
});

Route::get('/assistant', function () {
    return AssistantController::get_all_assistants();
});

Route::delete('/assistant/{id}', function (Request $request) {
});

Route::get('/practicum-simulator', function () {
    return PracticumSimulatorController::get_visible_practicum_simulators();
});

Route::get('/journal-cover', function () {
    return JournalCoverController::get_visible_journal_covers();
});

Route::get('/schedule', function () {
    return ScheduleController::get_all_schedule();
});

Route::get('/organigram', function () {
    return OrganigramController::get_all_organigram()[0];
});

Route::get('/social-media', function () {
    return SocialMedia::all();
});
