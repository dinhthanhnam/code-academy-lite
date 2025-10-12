<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|email|unique:users,email',
            'password' => 'required|string|max:255|min:8|confirmed',
        ], [
            'name.required' => 'Vui lòng nhập tên',
            'email.required' => 'Vui lòng nhập email',
            'email.email' => 'Email không đúng định dạng',
            'email.unique' => 'Email đã tồn tại',
            'password.required' => 'Vui lòng nhập mật khẩu',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự',
            'password.confirmed' => 'Mật khẩu không trùng khớp',
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'message' => 'Đăng ký thành công!',
            'user' => $user
        ]);
    }


    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => 'required|string|max:255|email',
            'password' => 'required|string|max:255|min:8',
        ], [
            'email.required' => 'Vui lòng nhập email',
            'email.email' => 'Email không đúng định dạng',
            'password.required' => 'Vui lòng nhập mật khẩu',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::user();
            return response()->json([
                'success' => true,
                'message' => 'Đăng nhập thành công!',
                'user' => $user
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Thông tin đăng nhập sai!'
        ], 401);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        // Xóa cookie
//        $deleteAccessCookie = cookie()->forget('accessToken');
//        $deleteRefreshCookie = cookie()->forget('refreshToken');

        return response()->json([
            'sucess' => true,
            'message' => 'Đăng xuất thành công'
        ]);
    }

    public function personal_role(Request $request): JsonResponse
    {
        if(!Auth::check())
            return response()->json('Lấy vai trò thất bại', 401);
        return response()->json([
            'role' => Auth::user()->role
        ]);
    }

    public function personal_info(Request $request): JsonResponse
    {
        if (!Auth::check()) {
            return response()->json([
                'success' => false,
                'message' => 'Lấy vai trò thất bại'
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
            'success' => true,
            'message' => 'Lấy thông tin người dùng thành công',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role
            ]
        ]);
    }


}
