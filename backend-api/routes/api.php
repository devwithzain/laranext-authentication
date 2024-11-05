<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ImageUploadController;

Route::post("/login", [AuthController::class, "login"]);
Route::post("/register", [AuthController::class, "register"]);
Route::middleware('auth:sanctum')->group(function () {
    Route::post("/logout", [AuthController::class, "logout"]);
    Route::get("/profile", [AuthController::class, "profile"]);
    Route::patch('/profile/update', [AuthController::class, 'updateProfile']);
    Route::delete('/profile/delete', [AuthController::class, 'deleteAccount']);
});
Route::post('/upload-images', [ImageUploadController::class, 'uploadImages']);