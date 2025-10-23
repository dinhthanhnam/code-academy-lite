import "@/app/globals.css";
import Image from "next/image";

export default function AuthLayout({ children }) {
    return (
        <div className="relative min-h-screen bg-cover bg-center">
            <div className={`absolute inset-0`}>
                <Image
                    src={`/img/cloud_code.jpg`}
                    alt={`auth-bg`}
                    fill
                    priority
                    className={`object-cover object-center`}
                />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div> {/* Lớp phủ tối */}
            <div className="relative z-20">{children}</div>
        </div>
    );
}
