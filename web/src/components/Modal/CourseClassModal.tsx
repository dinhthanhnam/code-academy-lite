import React, { useState } from 'react';
import FormInput from "@/components/Form/FormInput";
import { X } from "lucide-react";
import CommonButton from "@/components/Common/CommonButton";
import { CourseClass } from "@/types/CourseClass";
import { createCourseClass, updateCourseClass } from "@/utils/service/crud/CourseClassService";
import { customAlphabet } from "nanoid";
import FormSelect from "@/components/Form/FormSelect";
import { Course } from "@/types/Course";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import {useFetchCourseOptions, useFetchLecturerOptions, useFetchRegularClassOptions} from "@/hooks/useFetchOptions";
import CustomDatePicker from "@/components/Form/CustomDatePicker";
import RefreshJoinCodeForm from "@/components/Admin/Course/RefreshJoinCodeForm";
import {CustomOption} from "@/utils/service/OptionService";

interface CourseClassModalProps {
    onClose: () => void;
    parentCourse?: Course;
    newCourseClass?: (courseClass: CourseClass) => void;
    updatedCourseClass?: (courseClass: CourseClass) => void;
    selectedCourseClass?: CourseClass;
    type: "create" | "update";
}

interface Message {
    message: string | null;
    success: boolean | null;
}

export function CourseClassModal({
                                     type,
                                     onClose,
                                     newCourseClass,
                                     updatedCourseClass,
                                     selectedCourseClass,
                                     parentCourse
                                 }: CourseClassModalProps) {
    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 8);
    const { regularClassOptions } = useFetchRegularClassOptions();
    const { courseOptions } = useFetchCourseOptions();
    const { lecturerOptions } = useFetchLecturerOptions();

    const [payload, setPayload] = useState<CourseClass>({
        active: true,
        course_id: parentCourse?.id || null,
        course_class_code: selectedCourseClass?.course_class_code || "",
        course_class_join_code: selectedCourseClass?.course_class_join_code || generateJoinCode(),
        lecturer_id: selectedCourseClass?.lecturer_id || null,
        description: selectedCourseClass?.description || "",
        assigned_regular_class_id: selectedCourseClass?.assigned_regular_class_id || null,
        name: selectedCourseClass?.name || "",
        start_date: selectedCourseClass?.start_date || null, // e.g., "2025-03-31T14:55:28+07:00" or null
    });

    const [message, setMessage] = useState<Message>({ message: null, success: null });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    function generateJoinCode() {
        return nanoid();
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleChange = (id: keyof CourseClass, value: any) => {
        setPayload(prev => ({
            ...prev,
            [id]: id === "assigned_regular_class_id" ? Number(value) : value
        }));
    };

    const handleDateChange = (date: Date | null) => {
        setPayload(prev => ({
            ...prev,
            start_date: date ? format(date, "yyyy-MM-dd'T'HH:mm:ssxxx") : null,
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            let data: any;
            if (type === "create") {
                data = await createCourseClass(payload);
                if (data.success && newCourseClass && data.data) {
                    newCourseClass(data.data);
                }
            } else {
                data = await updateCourseClass(selectedCourseClass!.id, payload);
                if (data.success && updatedCourseClass && data.data) {
                    updatedCourseClass(data.data);
                }
            }

            setMessage({ message: data.message, success: data.success });
        } catch (error) {
            console.log(error);
            setMessage({ message: "Đã xảy ra lỗi, vui lòng thử lại", success: false });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderOptions = (Options: any) => {
        const options = Options?.map(option => ({
            value: option.value,
            label: option.label
        })) || [];
        return [{ value: 0, label: "-- Chọn --" }, ...options];
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center max-h-screen"
            onClick={handleOverlayClick}
        >
            <div
                className="bg-white rounded-lg p-6 w-full max-w-7xl relative shadow-lg border border-secondary max-h-full flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <X size={24} strokeWidth={2} />
                </button>

                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-800">
                        {parentCourse
                            ? selectedCourseClass
                                ? `Chỉnh sửa lớp học phần ${selectedCourseClass.name}`
                                : `Tạo lớp học phần mới cho học phần ${parentCourse.name}`
                            : `Chỉnh sửa lớp học phần`
                        }
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Điền thông tin để {selectedCourseClass ? 'chỉnh sửa' : 'tạo'} lớp học phần
                    </p>
                </div>

                {message.message && (
                    <div className="p-2">
                        <div
                            className={`p-2 rounded border text-sm ${
                                message.success ? "bg-green-100 text-green-700 border-green-500" : "bg-red-100 text-red-700 border-red-500"
                            }`}
                        >
                            {message.message}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-3 gap-2">
                    {type !== "update" && (
                        <>
                            <FormSelect
                                name="course_code"
                                label="Mã học phần"
                                options={renderOptions(courseOptions)}
                                value={payload.course_id?.toString() || ""}
                                onChange={(e) => handleChange("course_id", e.target.value)}
                                disable={!!parentCourse}
                            />
                            <FormInput
                                type="text"
                                name="course_code"
                                label="Mã lớp học phần có dạng"
                                value={parentCourse ? parentCourse.course_code + '01' : "IS57A01"}
                                onChange={(e) => handleChange("course_class_code", e.target.value)}
                                disable={true}
                            />
                        </>
                    )}

                    {type === 'update' && (
                        <FormInput
                            type="text"
                            name="course_code"
                            label="Mã lớp học phần"
                            value={payload.course_class_code}
                            onChange={(e) => handleChange("course_class_code", e.target.value)}
                            disable={!!parentCourse}
                        />
                    )}

                    <FormSelect
                        name="regular_class"
                        label="Lớp niên chế"
                        options={renderOptions(regularClassOptions)}
                        value={payload.assigned_regular_class_id?.toString() || ""}
                        onChange={(e) => handleChange("assigned_regular_class_id", e.target.value)}
                    />
                    <CustomDatePicker
                        label="Ngày bắt đầu"
                        selected={payload.start_date ? parseISO(payload.start_date) : null} // Parse ISO 8601 with offset
                        onChange={handleDateChange} // Convert to ISO 8601 with offset
                        name="date-picker"
                    />
                    {type === 'update' && (
                        <>
                            <FormSelect
                                name="lecturer"
                                label="Giảng viên"
                                value={payload.lecturer_id?.toString() || ""}
                                options={renderOptions(lecturerOptions)}
                                onChange={(e) => handleChange("lecturer_id", e.target.value)}
                            />
                            <FormInput
                                type="text"
                                name="name"
                                label="Tên học phần"
                                value={payload.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                            />
                            <div className={`grid grid-cols-5`}>
                                <FormInput
                                    type="text"
                                    name="slug"
                                    label="Slug"
                                    value={selectedCourseClass?.slug}
                                    readOnly={true}
                                    className={`col-span-2`}
                                />
                                <div className={`col-span-3`}>
                                    <RefreshJoinCodeForm
                                        value={payload.course_class_join_code}
                                        onChange={(e) => handleChange("course_class_join_code", e.target.value)}
                                    />
                                </div>

                            </div>
                        </>

                    )}

                    <FormInput
                        className={`col-span-3`}
                        type="text"
                        name="description"
                        label="Mô tả lớp học phần"
                        value={payload.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                    />
                </div>

                <div className="flex justify-end mt-4 p-2">
                    <CommonButton
                        label={isSubmitting ? "Đang xử lý..." : "Xác nhận"}
                        onClick={handleSubmit}
                        disable={isSubmitting}
                    />
                </div>
            </div>
        </div>
    );
}