<?php

use App\Http\Controllers\AssistantController;
use App\Http\Controllers\PracticumHandoutController;
use App\Models\PracticumModule;
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

Route::get('/practicum-module', function () {
    return PracticumModule::all();
});

Route::get('/social-media', function () {
    return SocialMedia::all();
});
