<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserControllers extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return response()->json($user, 200);
    }
}