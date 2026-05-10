<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\ServicesController;
use App\Http\Controllers\Api\ProjectsController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\MessagesController;
use App\Http\Controllers\Api\ThemeController;
use App\Http\Controllers\Api\TrackingController;
use App\Http\Controllers\Api\SettingsController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::get('/theme', [ThemeController::class, 'index']);
    Route::get('/content/{lang}', [ContentController::class, 'index']);
    Route::get('/hero/{lang}', [ContentController::class, 'hero']);
    Route::get('/services/{lang}', [ServicesController::class, 'index']);
    Route::get('/services/{slug}/{lang}', [ServicesController::class, 'show']);
    Route::get('/projects/{lang}', [ProjectsController::class, 'index']);
    Route::get('/projects/{slug}/{lang}', [ProjectsController::class, 'show']);
    Route::get('/team/{lang}', [TeamController::class, 'index']);
    Route::get('/blog/{lang}', [BlogController::class, 'index']);
    Route::get('/blog/{slug}/{lang}', [BlogController::class, 'show']);
    Route::get('/clients', [ContentController::class, 'clients']);
    Route::get('/certifications/{lang}', [ContentController::class, 'certifications']);
    Route::get('/jobs/{lang}', [ContentController::class, 'jobs']);
    Route::get('/why-us/{lang}', [ContentController::class, 'whyUs']);
    Route::get('/settings', [SettingsController::class, 'index']);
    Route::get('/sections/{lang}', [SettingsController::class, 'sections']);

    Route::post('/contact', [MessagesController::class, 'store'])->middleware('throttle:5,1');
    Route::post('/job-apply', [MessagesController::class, 'apply'])->middleware('throttle:5,1');
    Route::post('/track', [TrackingController::class, 'store'])->middleware('throttle:60,1');
});
