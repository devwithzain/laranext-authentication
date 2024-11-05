<?php

namespace App\Http\Controllers\Api;
use App\Models\Image;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ImageUploadController extends Controller
{
    public function uploadImages(Request $request)
    {
        // Validate the images
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePaths = [];

        // Loop through each image and store it
        foreach ($request->file('images') as $image) {
            // Store the image in the 'public' disk (you can customize this)
            $path = $image->store('images', 'public');
            $imagePaths[] = $path;

            // Optionally, you can save the image information in the database
            Image::create([
                'path' => $path,
                'name' => $image->getClientOriginalName(),
            ]);
        }

        return response()->json(['message' => 'Images uploaded successfully', 'paths' => $imagePaths]);
    }
}