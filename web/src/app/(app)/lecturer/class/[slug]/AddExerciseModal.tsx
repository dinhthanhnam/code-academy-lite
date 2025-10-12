"use client";

import React, { useState } from "react";
import CommonButton from "@/components/Common/CommonButton";
import CustomDatePicker from "@/components/Form/CustomDatePicker";
import { format, parseISO } from "date-fns";
import {useClassContext} from "@/app/(app)/lecturer/class/[slug]/ClassContext";
import {lecturerCreateCourseClassExercise} from "@/utils/service/crud/LecturerService";

interface AddExerciseModalProps {
    onClose: () => void;
}

interface TestCase {
    stdin: string;
    expected_output: string;
}

interface CreateCourseClassExerciseForm {
    title: string;
    description: string;
    level: "basic" | "intermediate" | "advanced";
    example_input: string;
    example_output: string;
    test_cases: TestCase[];
    time_limit: number;
    memory_limit: number;
    topics: string[];
    language: "c_cpp" | "java" | "python";
    week_number: number;
    deadline: string | null;
    is_active: boolean;
    is_test: boolean;
    course_class_id: number;
}

export default function AddExerciseModal({ onClose }: AddExerciseModalProps) {
    const [message, setMessage] = useState<{message: string | null, success: boolean | null}>({message: null, success: null});
    const {courseClass} = useClassContext();
    const courseClassId = courseClass.id;
    const [formData, setFormData] = useState<CreateCourseClassExerciseForm>({
        title: "",
        description: "",
        level: "basic",
        example_input: "",
        example_output: "",
        test_cases: [{ stdin: "", expected_output: "" }],
        time_limit: 1,
        memory_limit: 256,
        topics: [],
        language: "c_cpp",
        week_number: 1,
        deadline: null,
        is_active: true,
        is_test: false,
        course_class_id: courseClassId,
    });

    const handleDateChange = (date: Date | null) => {
        setFormData((prev) => ({
            ...prev,
            deadline: date ? format(date, "yyyy-MM-dd'T'HH:mm:ssxxx") : null,
        }));
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "time_limit" || name === "memory_limit" || name === "week_number"
                    ? parseInt(value) || 1
                    : value,
        }));
    };

    const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const topics = e.target.value
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t !== "");
        setFormData((prev) => ({ ...prev, topics }));
    };

    const handleTestCaseChange = (
        index: number,
        field: "stdin" | "expected_output",
        value: string
    ) => {
        const newTestCases = [...formData.test_cases];
        newTestCases[index] = { ...newTestCases[index], [field]: value };
        setFormData((prev) => ({ ...prev, test_cases: newTestCases }));
    };

    const addTestCase = () => {
        setFormData((prev) => ({
            ...prev,
            test_cases: [...prev.test_cases, { stdin: "", expected_output: "" }],
        }));
    };

    const handleSubmit = async () => {
        const payload = {
            ...formData,
            test_cases: formData.test_cases,
            is_free: false,
            is_hard_deadline: formData.is_test,
        };
        console.log("Payload:", payload); // Replace with actual API call
        const res:any = await lecturerCreateCourseClassExercise(payload);
        setMessage({message: res.message, success: res.success})
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Thêm bài tập mới</h2>
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
                <div className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            rows={3}
                            required
                        />
                    </div>

                    {/* Level */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dạng bài tập</label>
                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="basic">Dễ</option>
                            <option value="intermediate">Trung bình</option>
                            <option value="advanced">Khó</option>
                            <option value="exam">Bài kiểm tra</option>
                        </select>
                    </div>

                    {/* Example Input & Output */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Input ví dụ</label>
                            <input
                                type="text"
                                name="example_input"
                                value={formData.example_input}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Output ví dụ</label>
                            <input
                                type="text"
                                name="example_output"
                                value={formData.example_output}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    {/* Test Cases */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Test Cases</label>
                        {formData.test_cases.map((test, index) => (
                            <div key={index} className="grid grid-cols-2 gap-4 mt-2">
                                <input
                                    type="text"
                                    placeholder="Input"
                                    value={test.stdin}
                                    onChange={(e) => handleTestCaseChange(index, "stdin", e.target.value)}
                                    className="block w-full border border-gray-300 rounded-md p-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Output"
                                    value={test.expected_output}
                                    onChange={(e) => handleTestCaseChange(index, "expected_output", e.target.value)}
                                    className="block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addTestCase}
                            className="mt-2 text-sm text-primary hover:text-primary2"
                        >
                            + Thêm test case
                        </button>
                    </div>

                    {/* Time & Memory Limit */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Thời gian (giây)</label>
                            <input
                                type="number"
                                name="time_limit"
                                value={formData.time_limit}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                min="1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Bộ nhớ (MB)</label>
                            <input
                                type="number"
                                name="memory_limit"
                                value={formData.memory_limit}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                min="1"
                            />
                        </div>
                    </div>

                    {/* Topics */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Chủ đề (phân cách bằng dấu phẩy)
                        </label>
                        <input
                            type="text"
                            name="topics"
                            value={formData.topics.join(", ")}
                            onChange={handleTopicChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    {/* Language */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ngôn ngữ</label>
                        <select
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="c_cpp">C/C++</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                        </select>
                    </div>

                    {/* Week Number & Deadline */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tuần</label>
                            <input
                                type="number"
                                name="week_number"
                                value={formData.week_number}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                min="1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Hạn nộp</label>
                            <CustomDatePicker
                                selected={formData.deadline ? parseISO(formData.deadline) : null}
                                onChange={handleDateChange}
                                name="date-picker"
                            />
                        </div>
                    </div>

                    {/* Is Active */}
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700">
                            <input
                                type="checkbox"
                                name="is_active"
                                checked={formData.is_active}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, is_active: e.target.checked }))
                                }
                                className="mr-2"
                            />
                            Hoạt động
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-6">
                        <CommonButton label="Hủy" onClick={onClose} />
                        <CommonButton label="Tạo" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
}