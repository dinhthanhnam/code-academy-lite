import Link from "next/link";

export default function SideBarHeader() {
    return (
        <Link href={`/`}>
            <div className="rounded border-foreground border-b-4 min-h-20 flex flex-col justify-between bg-primary p-2">
                <span className="text-white font-black text-lg select-none">HỌC VIỆN NGÂN HÀNG</span>
                <span className="self-end text-sm text-secondary select-none">Học viện lập trình</span>
            </div>
        </Link>

    );
}