import Link from "next/link";

export default function SideBarHeader() {
    return (
        <Link href={`/`}>
            <div className="rounded border-foreground border-b-4 min-h-20 flex flex-col justify-between bg-primary p-2">
                <span className="text-white font-black text-lg select-none">CLOUD CODE</span>
                <span className="self-end text-sm text-secondary select-none"></span>
            </div>
        </Link>

    );
}