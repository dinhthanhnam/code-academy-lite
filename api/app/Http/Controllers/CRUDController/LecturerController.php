<?php

namespace App\Http\Controllers\CRUDController;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Nette\Schema\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class LecturerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::query();
        $query->where('role', 'lecturer');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('email', 'like', "%$search%")
                    ->orWhere('name', 'like', "%$search%");
            });
        }
        return UserResource::collection($query->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => 'required|string|max:255|unique:users',
                'role' => 'required|string',
                'name' => 'required|string|max:255',
                'password' => 'required|string|min:8'
            ]);

            $validated['password'] = Hash::make($validated['password']);

            $lecturer = User::create($validated);
            return response()->json([
                'message' => 'Thêm giảng viên thành công!',
                'success' => true,
                'data' => new UserResource($lecturer)
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Thêm giảng viên thất bại!',
                'success' => false,
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $lecturer = User::findOrFail($id);
            if($lecturer->role !== 'lecturer') {
                return response()->json([
                    'message' => 'Không tìm thấy giảng viên',
                    'success' => false,
                ], Response::HTTP_NOT_FOUND);
            }
            return new UserResource($lecturer);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Không tìm thấy giảng viên',
                'success' => false,
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $lecturer = User::findOrFail($id);
            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
            ]);

            $lecturer->update($validated);
            return response()->json([
                'message' => 'Cập nhật giảng viên thành công',
                'success' => true,
                'data' => new UserResource($lecturer)
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Không tìm thấy giảng viên',
                'success' => false,
            ], Response::HTTP_NOT_FOUND);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Không tìm thấy giảng viên',
                'success' => false,
            ], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $lecturer = User::findOrFail($id);
            $lecturer->delete();
            return response()->json(['message' => 'Xoá giảng viên thành công', 'success' => true]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Không tìm thấy giảng viên', 'success' => false], Response::HTTP_NOT_FOUND);
        } catch (QueryException $e) {
            if ($e->getCode() === '23000') {
                return response()->json([
                    'message' => 'Không thể xóa giảng viên vì còn liên kết với dữ liệu khác',
                    'success' => false
                ], Response::HTTP_CONFLICT);
            }

            return response()->json([
                'message' => 'Lỗi cơ sở dữ liệu: ' . $e->getMessage(),
                'success' => false
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
