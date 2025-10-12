import Link from "next/link";

export default function SideBarSection({children, sectionName}) {
    return (
        <div>
            <span className={`pl-2 text-gray-600 text-sm select-none`}>{sectionName}</span>
            <div className={`gap-2 flex flex-col`}>
                {children}
            </div>
        </div>
    );
}