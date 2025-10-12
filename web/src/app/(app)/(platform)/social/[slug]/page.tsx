import Chatbox from "./Chatbox";
import IcedTeaUponTheAcademy from "@/components/Iced-tea-upon-the-academy/Iced-tea-upon-the-academy";
import Chatbox2 from "@/app/(app)/(platform)/social/[slug]/Chatbox2";

export default async function SocialPage({ params }) {
    const { slug } = await params; // ⬅️ Phải await params

    if (slug === "chatbox") {
        return <Chatbox />;
    }

    if (slug === "iced-tea-upon-the-academy") {
        return <IcedTeaUponTheAcademy />;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Social: {slug}</h1>
            <p>Đây là trang mạng xã hội của {slug}</p>
        </div>
    );
}
