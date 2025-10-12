import "@/app/globals.css";
import { Providers } from "@/app/providers";
import DeviceDetector from "@/components/DeviceDetector";
import LoadingBar from "@/components/Loading/LoadingBar";
import GlobalMessage from "@/components/Global/GlobalMessage";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <Providers>
            <DeviceDetector />
            <LoadingBar /> {/* Hiển thị loading bar khi cần */}
            <GlobalMessage />
            {children}
        </Providers>
        </body>
        </html>
    );
}
