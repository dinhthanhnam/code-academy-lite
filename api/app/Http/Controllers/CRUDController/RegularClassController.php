<?php

namespace App\Http\Controllers\CRUDController;

use App\Http\Controllers\Controller;
use App\Http\Resources\RegularClassResource;
use App\Models\RegularClass;
use Illuminate\Http\Request;
use Exception;

class RegularClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return RegularClassResource::collection(RegularClass::paginate(8));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            return new RegularClassResource(RegularClass::findOrFail($id));
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi: ' . $e->getMessage(),
                'success' => false
            ], 500); // Trả về lỗi chung với mã 500
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
