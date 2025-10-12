"use client";
import { useState, FormEvent } from "react";
import AuthFormInput from "@/components/Form/AuthFormInput";
import FormContainer from "@/components/Form/FormContainer";
import AuthenticationFormButton from "@/components/Common/AuthenticationFormButton";
import { AuthenticateUser, RegisterUser } from "@/utils/service/AuthService";
import { useRouter } from "next/navigation";
import { startLoading, stopLoading } from "@/app/redux/slices/loadingSlice";
import Link from "next/link";
import {useAppDispatch} from "@/app/redux/hooks";

// Define the props type for the component
interface AuthenticationFormProps {
    type: "login" | "register";
}

// Define the payload type
interface AuthPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

// Define the message state type
interface MessageState {
    message: string;
    status: boolean;
}

export default function AuthenticationForm({ type }: AuthenticationFormProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [payload, setPayload] = useState<AuthPayload>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [message, setMessage] = useState<MessageState>({
        message: "",
        status: false,
    });

    // Hàm xử lý đăng nhập
    const handleLogin = async (): Promise<void> => {
        if (!payload.email || !payload.password) {
            setMessage({ message: "Vui lòng nhập email và mật khẩu!", status: false });
            return;
        }

        try {
            dispatch(startLoading());
            const res = await AuthenticateUser({ email: payload.email, password: payload.password });

            setMessage({ message: res.message, status: res.success });
            setTimeout(() => {
                dispatch(stopLoading());
                router.push("/");
            }, 1500);
        } catch (error: any) {
            console.log(error.message);
            setMessage({ message: "Đăng nhập thất bại!", status: false });
            dispatch(stopLoading());
        }
    };

    // Hàm xử lý đăng ký
    const handleRegister = async (): Promise<void> => {
        if (!payload.name || !payload.email || !payload.password || !payload.password_confirmation) {
            setMessage({ message: "Vui lòng nhập đầy đủ thông tin!", status: false });
            return;
        }

        if (payload.password !== payload.password_confirmation) {
            setMessage({ message: "Mật khẩu không khớp!", status: false });
            return;
        }

        try {
            dispatch(startLoading());
            const res = await RegisterUser({
                name: payload.name,
                email: payload.email,
                password: payload.password,
                password_confirmation: payload.password_confirmation,
            });
            setMessage({ message: res.message, status: res.success });
            setTimeout(() => {
                dispatch(stopLoading());
                router.push("/"); // Redirect về /login thay vì / để người dùng đăng nhập sau khi đăng ký
            }, 1500);
        } catch (error: any) {
            setMessage({ message: "Đăng ký thất bại!", status: false });
            dispatch(stopLoading());
        }
    };

    // Hàm submit tổng quát
    const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (type === "login") {
            handleLogin();
        } else {
            handleRegister();
        }
    };

    return (
        <div>
            <FormContainer>
                <span className="mx-auto font-black text-2xl p-2">
                  {type === "login" ? "Đăng nhập" : "Đăng ký"}
                </span>

                {/* Hiển thị thông báo */}
                {message.message && (
                    <div
                        className={`p-3 mx-auto rounded-full transition-all duration-300 ease-in-out transform ${
                            message.status
                                ? "bg-green-200 text-green-800 opacity-100 translate-y-0"
                                : "bg-red-200 text-red-800 opacity-100 translate-y-0"
                        }`}
                    >
                        {message.message}
                    </div>
                )}

                {/* Trường nhập tên (Chỉ hiển thị khi đăng ký) */}
                {type === "register" && (
                    <AuthFormInput
                        type="text"
                        label="Tên của bạn"
                        name="name"
                        onChange={(e) => setPayload({ ...payload, name: e.target.value })}
                    />
                )}

                <AuthFormInput
                    type="email"
                    label="Email"
                    name="email"
                    onChange={(e) => setPayload({ ...payload, email: e.target.value })}
                />
                <AuthFormInput
                    type="password"
                    label="Mật khẩu"
                    name="password"
                    onChange={(e) => setPayload({ ...payload, password: e.target.value })}
                />

                {/* Trường nhập lại mật khẩu (Chỉ hiển thị khi đăng ký) */}
                {type === "register" && (
                    <AuthFormInput
                        type="password"
                        label="Xác nhận mật khẩu"
                        name="password_confirmation"
                        onChange={(e) => setPayload({ ...payload, password_confirmation: e.target.value })}
                    />
                )}

                <div className="flex justify-between p-2 items-center">
                    <Link href={type === "login" ? "/register" : "/login"}>
            <span className="font-normal text-secondary2 hover:text-secondary underline duration-100 select-none cursor-pointer">
              {type === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
            </span>
                    </Link>
                    <AuthenticationFormButton label="Xác nhận" onClickAction={handleSubmit} />
                </div>
            </FormContainer>
        </div>
    );
}