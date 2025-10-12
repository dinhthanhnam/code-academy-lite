import {
    fetchPersonalConversation,
    fetchMessagesByConversation,
    sendMessage,
} from "@/utils/service/StudentService";
import { getCurrentUserId } from "@/utils/service/AuthService";

interface Conversation {
    id: string;
    name: string;
    lastMessage?: string;
    time?: string;
    messages: Message[];
}

interface Message {
    id: string;
    user_id: string;
    user_name?: string;
    content: string;
    conversation_id: string;
    created_at: string;
    updated_at: string;
}

// Lấy ký tự đầu tiên của tên
export const getInitial = (name: string): string => {
    return name.charAt(0).toUpperCase();
};

// Định dạng thời gian
export const formatTime = (dateString?: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Time";
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
};

// Khởi tạo chat
export const initializeChat = async (
    setConversations:any,
    setSelectedConversation:any,
    setCurrentUserId:any,
    setError:any,
    setLoading:any
): Promise<void> => {
    try {
        setLoading(true);

        // Lấy ID người dùng
        const userId = await getCurrentUserId();
        setCurrentUserId(userId);

        // Lấy danh sách cuộc hội thoại
        const courseClasses = await fetchPersonalConversation();
        const convs: Conversation[] = courseClasses.map((course) => ({
            id: course.id,
            name: course.name,
            messages: [],
        }));

        // Lấy tin nhắn cho từng cuộc hội thoại
        const updatedConvs = await Promise.all(
            convs.map(async (conv) => {
                try {
                    const messages = await fetchMessagesByConversation(conv.id);
                    return {
                        ...conv,
                        messages,
                        lastMessage: messages[messages.length - 1]?.content || "Chưa có tin nhắn",
                        time: messages[messages.length - 1]?.created_at || "",
                    };
                } catch (error) {
                    console.error(`Error loading messages for conversation ${conv.id}:`, error);
                    return {
                        ...conv,
                        messages: [],
                        lastMessage: "Chưa có tin nhắn",
                        time: "",
                    };
                }
            })
        );

        setConversations(updatedConvs);
        if (updatedConvs.length > 0) {
            setSelectedConversation(updatedConvs[0]);
        }
    } catch (error) {
        console.error("Error loading conversations:", error);
        setError("Không thể tải cuộc hội thoại. Vui lòng thử lại.");
    } finally {
        setLoading(false);
    }
};

// Gửi tin nhắn
export const sendChatMessage = async (
    conversationId: string,
    content: string
): Promise<Message> => {
    try {
        const message = await sendMessage(conversationId, content);
        return message;
    } catch (error) {
        console.error("Error sending message:", error);
        throw new Error("Không thể gửi tin nhắn.");
    }
};
