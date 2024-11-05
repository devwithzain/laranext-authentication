<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserControllers;
use App\Http\Controllers\Api\ProductController;


Route::post(
    "/login",
    [AuthController::class, "login"]
);
Route::post(
    "/register",
    [AuthController::class, "register"]
);
Route::middleware('auth:sanctum')->group(function () {
    Route::post("/logout", [AuthController::class, "logout"]);
    Route::get("/profile", [AuthController::class, "profile"]);
});

Route::apiResource('product', ProductController::class);

Route::middleware('auth:sanctum')->get('/user', [UserControllers::class, 'index']);