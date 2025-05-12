<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get("/profile", [AuthController::class, "profile"]);
});
Route::post("/register", [AuthController::class, "register"]);
Route::post("/login", [AuthController::class, "login"]);
Route::post("/logout", [AuthController::class, "logout"]);
Route::delete('/profile/delete', [AuthController::class, 'deleteAccount']);
Route::post('/profile/update/{id}', [AuthController::class, 'updateProfile']);
Route::post('/email/verify-code', [AuthController::class, 'emailVerifyCode']);
Route::post('/email/send-code', [AuthController::class, 'sendEmailVerificationCode']);

// forgot password
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/verify-reset-code', [AuthController::class, 'verifyResetCode']);