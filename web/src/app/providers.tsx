"use client"; // Quan trọng khi dùng Next.js App Router
import { Provider } from "react-redux";
import { store } from "@/app/redux/store";

export function Providers({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
