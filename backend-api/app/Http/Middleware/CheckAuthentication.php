<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckAuthentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Define the routes and prefixes
        $publicRoutes = ['/', '/about', '/contact']; // Add your public routes here
        $authRoutes = ['/dashboard', '/profile']; // Add your authenticated routes here
        $apiAuthPrefix = '/api'; // Define your API auth prefix here

        $path = $request->path();
        $isApiAuthRoute = str_starts_with($path, trim($apiAuthPrefix, '/'));
        $isAuthRoute = in_array("/$path", $authRoutes);
        $isPublicRoute = in_array("/$path", $publicRoutes);

        // Skip checks for API authentication routes
        if ($isApiAuthRoute) {
            return $next($request);
        }

        // Redirect authenticated users trying to access an auth route
        if ($isAuthRoute && Auth::check()) {
            return redirect()->route('/profile'); // Adjust your redirect route here
        }

        // Redirect unauthenticated users trying to access protected routes
        if (!$isPublicRoute && !Auth::check()) {
            return redirect()->route('/login'); // Adjust your sign-in route here
        }

        return $next($request);
    }
}