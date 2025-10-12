import { IconType } from "react-icons";
import { useRouter } from "next/navigation";
import { setActiveDropdown } from "@/app/redux/slices/dropdownSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";

type ButtonProps = {
    id: string;
    icon: IconType;
    iconSize?: number;
    iconStrokeWidth?: number;
    title: string;
    activePath?: string;
};

export default function Button({
    id,
    icon: Icon,
    iconSize = 20,
    iconStrokeWidth = 1,
    title,
    activePath,
}: ButtonProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const activeDropdown = useAppSelector((state) => state.dropdown.activeDropdown);

    const isActive = activeDropdown === id;

    const handleButtonClick = () => {
        dispatch(setActiveDropdown(isActive ? null : id));
        if (activePath) {
            router.push(activePath);
        }
    };

    return (
        <div
            className={`p-2 w-11/12 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out mx-auto cursor-pointer
            ${isActive ? "bg-gray-50 border-t-2 border-l-2 border-primary shadow-secondary shadow-md" : ""}`}
        >
            <div className="w-full flex items-center justify-between text-foreground" onClick={handleButtonClick}>
                <div className="flex items-center gap-3">
                    <Icon size={iconSize} strokeWidth={iconStrokeWidth}/>
                    <span className="select-none">{title}</span>
                </div>
                   
            </div>
        </div>
    );
}