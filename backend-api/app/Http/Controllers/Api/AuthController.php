<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user || $request->email !== $user->email) {
            return response()->json(['error' => 'Email does not exist'], 401);
        }
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Password do not match'], 401);
        }

        $token = $user->createToken($user->name . ' auth_token')->plainTextToken;

        return response()->json([
            'success' => 'Login successful',
            'access_token' => $token,
            'token_type' => 'Bearer'
        ], 200);
    }

    public function register(RegisterRequest $request)
    {

        $userEmail = User::where('email', $request->email)->first();

        if ($userEmail) {
            return response()->json(['error' => 'Email already exists'], 409); // 409 Conflict
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = $user->createToken($user->name . ' auth_token')->plainTextToken;

        return response()->json([
            'success' => 'Registration successful',
            'access_token' => $token,
            'token_type' => 'Bearer'
        ], 201);
    }


    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logout successful'], 200);
    }

    public function profile(Request $request)
    {
        return response()->json([
            'message' => 'Profile fetched successfully',
            'data' => $request->user()
        ], 200);
    }
}