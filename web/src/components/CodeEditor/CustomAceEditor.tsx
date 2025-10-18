"use client";
import AceEditor from "react-ace";
import {useState, useEffect} from "react";
import Exercise from "@/types/Exercise";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import api from "@/utils/AxiosInstance";
import {X} from "lucide-react";

interface SubmissionResult {
    status: string;
    error: string | null;
    time: string | number;
    memory: number;
}

interface SubmissionResponse {
    success: boolean;
    message: string;
    submission_id: number | null;
    results: SubmissionResult[];
}

interface AceEditorProps {
    selectedExercise?: Exercise | null;
    courseClassId?: number | null;
}

export default function CustomAceEditor({
                                            selectedExercise,
                                            courseClassId,
                                        }: AceEditorProps) {
    const [code, setCode] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("c_cpp");
    const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showResults, setShowResults] = useState<boolean>(true);

    // Cập nhật code và ngôn ngữ khi bài tập thay đổi
    useEffect(() => {
        if (selectedExercise) {
            if (selectedExercise.language) {
                setSelectedLanguage(selectedExercise.language);
            }
            // Nếu có template code từ bài tập, sử dụng nó thay vì comment mặc định
            const templateCode = `// Viết code cho "${selectedExercise.title}"\n`;
            setCode(templateCode);
        } else {
            setCode("");
        }
        // Reset kết quả khi đổi bài tập
        setSubmissionResult(null);
        setError(null);
    }, [selectedExercise]);

    const handleSubmitCode = async (mode: "compile" | "submit") => {
        if (!code?.trim() || !selectedExercise) {
            setError("Vui lòng chọn bài tập và nhập code trước khi thực hiện.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setShowResults(true);

        try {
            const response = await api.post<SubmissionResponse>("/api/submit", {
                code,
                language: selectedLanguage,
                exercise_id: selectedExercise.id,
                course_class_id: courseClassId,
                mode
            });

            setSubmissionResult(response.data);
        } catch (err: any) {
            console.error("Error submitting code:", err);
            setError(
                err.response?.data?.message ||
                "Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau."
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Hiển thị chi tiết kết quả từ test case
    const renderTestResults = () => {
        if (!submissionResult?.results?.length || !showResults) return null;

        return (
            <div className="mt-4 bg-gray-800 rounded-md p-4 relative">
                <button
                    onClick={() => setShowResults(false)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
                    title="Đóng kết quả"
                >
                    <X/>
                </button>

                <div className={`overflow-auto`}>
                    <h3 className="text-lg font-semibold text-white mb-2">Kết quả test cases:</h3>
                    <div className="space-y-3 max-h-80 overflow-auto">
                        {submissionResult.results.map((result, index) => {
                            const isAccepted = result.status === "Accepted";
                            const statusColor = isAccepted ? "text-green-400" : "text-red-400";

                            return (
                                <div key={index} className="p-3 bg-gray-700 rounded-md">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                        <span className={`font-medium ${statusColor}`}>
                                            Test {index + 1}: {result.status}
                                        </span>
                                        </div>
                                        <div className="text-sm text-gray-300">
                                        <span className="mr-3">
                                            Thời gian: {result.time}s
                                        </span>
                                            <span>
                                            Bộ nhớ: {result.memory} KB
                                        </span>
                                        </div>
                                    </div>

                                    {result.error && (
                                        <div
                                            className="mt-2 text-red-300 text-sm bg-red-900/30 p-2 rounded overflow-auto max-h-40">
                                            <pre>{result.error}</pre>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto bg-[#272822] rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-[#272822] text-white p-4 border-b border-gray-600 flex items-center justify-between">
                <h2 className="text-xl font-bold">
                    {selectedExercise ? selectedExercise.title : "Trình soạn thảo Code"}
                </h2>
                <select
                    className="bg-gray-700 text-white px-3 py-1.5 rounded-md text-sm outline-none"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    disabled={isLoading}
                >
                    <option value="java">Java</option>
                    <option value="c_cpp">C++</option>
                    <option value="python">Python</option>
                </select>
            </div>

            {/* Editor */}
            <div className="flex-1 min-h-[400px]">
                {selectedExercise ? (
                    <AceEditor
                        mode={selectedLanguage}
                        theme="monokai"
                        value={code}
                        onChange={setCode}
                        name="custom-ace-editor"
                        width="100%"
                        height="400px"
                        fontSize={14}
                        showPrintMargin={false}
                        editorProps={{$blockScrolling: true}}
                        setOptions={{
                            showLineNumbers: true,
                            tabSize: 2,
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                        }}
                    />
                ) : (
                    <div className="flex items-center justify-center h-64 text-gray-400">
                        Vui lòng chọn một bài tập để bắt đầu viết code.
                    </div>
                )}
            </div>

            {/* Thanh công cụ */}
            {submissionResult && !showResults && (
                <button
                    onClick={() => setShowResults(true)}
                    className="mt-4 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-md flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="mr-2">
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                    Hiển thị kết quả
                </button>
            )}
            {selectedExercise && (
                <div className="flex p-4 gap-4 border-t border-gray-600">
                    <button
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleSubmitCode("compile")}
                        disabled={isLoading}
                    >
                        {isLoading && submissionResult === null ? "Đang xử lý..." : "Compile Code"}
                    </button>
                    <button
                        className="flex-1 bg-[#75715E] hover:bg-[#A6E22E] text-white font-medium py-2.5 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleSubmitCode("submit")}
                        disabled={isLoading}
                    >
                        {isLoading && submissionResult === null ? "Đang xử lý..." : "Submit Code"}
                    </button>
                </div>
            )}

            {/* Khu vực kết quả */}
            <div className="mx-4 overflow-auto">
                {/* Thông báo lỗi */}
                {error && (
                    <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-100 relative">
                        <button
                            onClick={() => setError(null)}
                            className="absolute top-2 right-2 text-red-300 hover:text-red-100"
                            title="Đóng thông báo"
                        >
                            <X/>
                        </button>
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                {/* Kết quả thành công */}
                {submissionResult && submissionResult.success && showResults && (
                    <div
                        className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-md text-green-100 relative">
                        <button
                            onClick={() => setShowResults(false)}
                            className="absolute top-2 right-2 text-green-300 hover:text-green-100"
                            title="Đóng thông báo"
                        >
                            <X/>
                        </button>
                        <p className="text-sm font-medium">{submissionResult.message}</p>
                        {submissionResult.submission_id && (
                            <p className="text-xs mt-1 text-green-200">
                                ID bài nộp: {submissionResult.submission_id}
                            </p>
                        )}
                    </div>
                )}

                {renderTestResults()}
            </div>
        </div>
    );
}