import api from "@/utils/AxiosInstance";

// Định nghĩa kiểu cho payload của AuthenticateUser (đăng nhập)
interface LoginPayload {
    email: string;
    password: string;
}

// Định nghĩa kiểu cho payload của RegisterUser (đăng ký)
interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

// Định nghĩa kiểu cho dữ liệu trả về từ API (giả định)
interface AuthResponse {
    message: string; // Thông điệp từ server
    success: boolean;
}

interface UserResponse {
    success: boolean;
    message: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
}

// Hàm khởi tạo CSRF token
export const initializeCsrfToken = async (): Promise<void> => {
    await api.get("/sanctum/csrf-cookie");
};

// Hàm xác thực người dùng (đăng nhập)
export const AuthenticateUser = async (payload: LoginPayload): Promise<AuthResponse> => {
    await initializeCsrfToken();
    const res = await api.post<AuthResponse>("/login", payload);
    return res.data;
};

// Hàm đăng ký người dùng
export const RegisterUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
    await initializeCsrfToken();
    const res = await api.post<AuthResponse>("/register", payload);
    return res.data;
};

// Hàm đăng xuất người dùng
export const LogoutUser = async (): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/logout");
    return res.data;
};

export const getCurrentUserId = async (): Promise<string> => {
    try {
        // Lấy CSRF token
        await api.get("/sanctum/csrf-cookie");
        // Gọi API personal_role
        const res = await api.get<UserResponse>("/api/personal_info");
        if (res.data.success) {
            return res.data.user.id;
        }
        throw new Error(res.data.message || "Failed to fetch user ID");
    } catch (error) {
        console.error("Error fetching user ID:", error);
        throw error;
    }
};