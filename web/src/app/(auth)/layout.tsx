import "@/app/globals.css";

export default function AuthLayout({ children }) {
    return (
        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/img/hvnh.jpg')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Lớp phủ tối */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
