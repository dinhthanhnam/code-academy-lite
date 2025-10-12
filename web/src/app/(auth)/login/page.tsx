import AuthenticationForm from "@/components/Authentication/AuthenticationForm";

export default function LoginPage() {
    return (
        <div className="flex h-screen">
            {/* Cột giới thiệu */}
            <div className="w-1/2 flex items-center justify-center">
                <p className="text-center text-white text-lg"></p>
            </div>

            {/* Cột chứa form */}
            <div className="w-1/2 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <AuthenticationForm type={`login`} />
                </div>
            </div>
        </div>
    );
}
