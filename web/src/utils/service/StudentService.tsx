// @/utils/service/StudentService.ts
import api from "@/utils/AxiosInstance";

interface CourseClass {
    id: string;
    name: string;
    path: string;
    type?: string;
}

interface PersonalCourseClassesResponse {
    success: boolean;
    message: string;
    personal_course_classes: CourseClass[];
}

interface LecturerCourseClassesResponse {
    success: boolean;
    message: string;
    lecturer_course_classes: CourseClass[];
}

interface JoinClassResponse {
    message: string;
}

interface Message {
    id: string;
    user_id: string;
    conversation_id: string;
    content: string;
    created_at: string;
    updated_at: string;
    user_name?: string; // Thêm nếu backend trả về tên người dùng
}

interface MessagesResponse {
    success: boolean;
    message: string;
    messages: Message[];
}

interface SendMessageResponse {
    success: boolean;
    message: string;
    data: Message;
}

export const fetchPersonalCourseClasses = async (): Promise<CourseClass[]> => {
    const res = await api.get<PersonalCourseClassesResponse>("/api/personal_course_classes");
    if (res.data.success) {
        return res.data.personal_course_classes;
    }
    throw new Error(res.data.message || "Failed to fetch personal course classes");
};

export const fetchLecturerCourseClasses = async (): Promise<CourseClass[]> => {
    const res = await api.get<LecturerCourseClassesResponse>("/api/lecturer_course_classes");
    if (res.data.success) {
        return res.data.lecturer_course_classes;
    }
    throw new Error(res.data.message || "Failed to fetch lecturer course classes");
};

export const joinClassByCode = async (classCode: string): Promise<string> => {
    try {
        const res = await api.post<JoinClassResponse>("/join-class", {
            class_code: classCode,
        });
        return res.data.message;
    } catch (error: any) {
        if (error.response?.status === 404) {
            throw new Error("Mã lớp không tồn tại.");
        } else if (error.response?.status === 409) {
            throw new Error("Bạn đã tham gia lớp này rồi.");
        } else {
            throw new Error("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    }
};

export const fetchPersonalConversation = async (): Promise<CourseClass[]> => {
    const res = await api.get<PersonalCourseClassesResponse>("/api/personal_conversations");
    if (res.data.success) {
        return res.data.personal_course_classes;
    }
    throw new Error(res.data.message || "Failed to fetch personal course classes");
};
export const fetchMessagesByConversation = async (conversationId: string): Promise<Message[]> => {
    const res = await api.get<MessagesResponse>(`/api/conversations/${conversationId}/messages`);
    if (res.data.success) {
        return res.data.messages;
    }
    throw new Error(res.data.message || "Failed to fetch messages");
};

// Gửi tin nhắn mới
export const sendMessage = async (conversationId: string, content: string): Promise<Message> => {
    const res = await api.post<SendMessageResponse>(`/api/conversations/${conversationId}/messages`, {
        content,
    });
    return res.data.data;
};