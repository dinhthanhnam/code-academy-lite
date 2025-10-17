import {BiChevronRight} from "react-icons/bi";
import {useRouter} from "next/navigation";
import {setActiveDropdown} from "@/app/redux/slices/dropdownSlice";
import {setActiveNavigationOption} from "@/app/redux/slices/navigationOptionSlice";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {IconType} from "react-icons";
import {useState} from "react";

type DropdownOption = {
    id: string;
    name: string;
    path?: string;
};

type DropDownButtonProps = {
    id: string;
    icon: IconType;
    iconSize?: number;
    iconStrokeWidth?: number;
    defaultOptions?: DropdownOption[];
    options?: DropdownOption[];
    chevron?: boolean;
    title: string;
    activePath?: string;
    referencePath?: string;
};

export default function DropDownButton({
        id,
        icon: Icon,
        iconSize = 20,
        iconStrokeWidth = 1,
        defaultOptions = [],
        options = [],
        chevron = true,
        title,
        activePath,
        referencePath,
}: DropDownButtonProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const activeDropdown = useAppSelector((state) => state.dropdown.activeDropdown);
    const activeNavigationOption = useAppSelector((state) => state.navigationOption.activeNavigationOption);

    const isActive = activeDropdown === id;
    const [showAll, setShowAll] = useState<boolean>(false);

    const handleButtonClick = () => {
        if (!isActive) {
            // Khi nhấp vào một nút mới, reset activeNavigationOption
            dispatch(setActiveNavigationOption(null));
            dispatch(setActiveDropdown(id));
            if (activePath) {
                router.push(activePath);
            }
        }
    };

    const handleOptionClick = (optionId: string, optionPath?: string) => {
        if (activeNavigationOption !== optionId) { // Chỉ thực hiện nếu option chưa active
            dispatch(setActiveNavigationOption(optionId));
            if (optionPath) {
                router.push(activePath ? activePath + optionPath : referencePath + optionPath);
            }
        }
        // Không đóng dropdown, giữ nó mở
    };

    const combinedOptions = [...defaultOptions, ...options];

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

                {chevron && (
                    <div
                        className={`p-2 duration-200 hover:bg-gray-400 rounded-full transition-all ${
                            isActive ? "rotate-90" : ""
                        }`}
                    >
                        <BiChevronRight size={18} strokeWidth={0.8}/>
                    </div>
                )}
            </div>

            {/* Danh sách các options bên trong dropdown */}
            <div
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isActive ? "max-h-50" : "max-h-0"}`}>
                {combinedOptions.map((option) => (
                    <div
                        key={option.id}
                        className={`select-none px-6 py-1 rounded-md duration-200 text-sm text-gray-800 transition-all
                        ${activeNavigationOption === option.id ? "bg-primary2" : "hover:bg-gray-200"}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleOptionClick(option.id, option.path);
                        }}
                    >
                        {option.name}
                    </div>
                ))}

                {/* Nút "Xem thêm" */}
                {/*{combinedOptions.length > maxVisibleOptions && (*/}
                {/*    <div*/}
                {/*        className="select-none px-6 py-1 rounded-md duration-200 text-sm text-blue-700 cursor-pointer hover:bg-gray-200"*/}
                {/*        onClick={(e) => {*/}
                {/*            e.stopPropagation();*/}
                {/*            setShowAll(!showAll);*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        {showAll ? "Thu gọn" : "Xem thêm..."}*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </div>
    );
}