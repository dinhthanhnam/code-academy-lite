import {useAppSelector} from "@/app/redux/hooks";

export const useDevice = () => {
    return {
        isMobile: useAppSelector((state) => state.device.isMobile),
    };
};