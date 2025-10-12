<?php

namespace App\Http\Controllers\CRUDController;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

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
                'name' => 'required|string|max:255',
            ]);

            $user = User::create($validated);
            return response()->json([
                'message' => 'Thêm người dùng thành công!',
                'success' => true,
                'data' => new UserResource($user)
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Thêm người dùng thất bại!',
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
            $user = User::findOrFail($id);
//            if($user->role !== 'lecturer') {
//                return response()->json([
//                    'message' => 'Không tìm thấy người dùng',
//                    'success' => false,
//                ], Response::HTTP_NOT_FOUND);
//            }
            return new UserResource($user);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng',
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
            $user = User::findOrFail($id);
            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'role' => 'sometimes|string|in:lecturer,student,admin'
            ]);

            $user->update($validated);
            return response()->json([
                'message' => 'Cập nhật người dùng thành công',
                'success' => true,
                'data' => $user->fresh()
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng',
                'success' => false,
            ], Response::HTTP_NOT_FOUND);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validate thất bại',
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
            $user = User::findOrFail($id);
            $user->delete();
            return response()->json(['message' => 'Xoá người dùng thành công', 'success' => true]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Không tìm thấy người dùng', 'success' => false], Response::HTTP_NOT_FOUND);
        } catch (QueryException $e) {
            if ($e->getCode() === '23000') {
                return response()->json([
                    'message' => 'Không thể xóa người dùng vì còn liên kết với dữ liệu khác',
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
