"use client";

import { useState, useEffect, useRef } from "react";
import { getInitial, formatTime, initializeChat, sendChatMessage } from "./ChatService";
import echo from "@/utils/Echo";
import getEcho from "@/utils/Echo";

interface Message {
    id: string;
    user_id: string;
    user_name: string;
    content: string;
    conversation_id: string;
    created_at: string;
    updated_at: string;
}

interface Conversation {
    id: string;
    name: string;
    lastMessage?: string;
    time?: string;
    messages: Message[];
}

export default function Chatbox() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Khởi tạo chat
    useEffect(() => {
        initializeChat(setConversations, setSelectedConversation, setCurrentUserId, setError, setLoading);
    }, []);

    // Tự động scroll đến tin nhắn mới
    useEffect(() => {
        if (selectedConversation?.messages) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedConversation?.messages]);

    // WebSocket: Nhận tin nhắn real-time
    useEffect(() => {
        console.log("WebSocket useEffect running");
        console.log("Selected conversation:", selectedConversation);

        if (!selectedConversation?.id) {
            console.log("Skipping WebSocket setup: echo or selectedConversation.id missing");
            return;
        }

        const echo = getEcho();
        const channelName = `conversation.${selectedConversation.id}`;
        console.log(`Subscribing to private-${channelName}`);

        const channel = echo.private(channelName);

        channel.listen(".MessageSent", (data: any) => {
            console.log("Received WebSocket data:", data);

            // Handle nested or flat data structure
            const raw = data.data || data;

            const newMessage: Message = {
                ...raw,
                conversation_id: raw.conversation_id,
            };

            if (!newMessage || !newMessage.id) {
                console.error("Invalid message structure:", newMessage);
                return;
            }

            console.log("Processing message:", newMessage);

            // Update selectedConversation only
            setSelectedConversation((prev) => {
                if (!prev || prev.id !== newMessage.conversation_id) {
                    console.log("Ignoring message: conversation ID mismatch or no selected conversation");
                    return prev;
                }

                // Avoid duplicating messages
                if (prev.messages.some((m) => m.id === newMessage.id)) {
                    console.log("Message already exists, skipping:", newMessage.id);
                    return prev;
                }

                const updatedMessages = [...prev.messages, newMessage];
                const updated = {
                    ...prev,
                    messages: updatedMessages,
                    lastMessage: newMessage.content,
                    time: newMessage.created_at,
                };
                console.log("Updated selectedConversation:", updated);
                return updated;
            });
        });

        channel.error((error: any) => {
            console.error(`WebSocket connection error for channel ${channelName}:`, error);
            setError(`Lỗi kết nối: ${error.message || "Không thể kết nối đến server"}`);
        });

        return () => {
            console.log(`Unsubscribing from private-${channelName}`);
            channel.stopListening(".MessageSent");
            echo.leave(`private-${channelName}`);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedConversation?.id]);

    // Gửi tin nhắn
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation || !currentUserId) {
            setError("Vui lòng nhập tin nhắn và chọn hội thoại.");
            return;
        }

        try {
            const messageContent = newMessage.trim();
            setNewMessage(""); // Clear input immediately for better UX

            // Send message to server, rely on WebSocket for UI update
            await sendChatMessage(selectedConversation.id, messageContent);
        } catch (err: any) {
            console.error("Error sending message:", err);
            setError(err.message || "Không thể gửi tin nhắn. Vui lòng thử lại.");
            setNewMessage(newMessage); // Restore input on failure
        }
    };

    // Render
    if (error) {
        return <div className="text-center text-red-600">{error}</div>;
    }

    if (loading) {
        return <div className="text-center text-gray-600">Loading...</div>;
    }

    return (
        <div className="flex w-full max-h-screen gap-6 p-4">
            {/* Danh sách nhóm chat */}
            <div className="w-96 flex flex-col bg-gradient-to-b from-orange-200 to-orange-300 rounded-xl shadow-xl overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800">Tin nhắn</h2>
                    <p className="text-sm text-gray-600 font-medium">Stay connected</p>
                </div>
                <div className="flex-1 overflow-y-auto px-4 pb-4">
                    {conversations.length === 0 ? (
                        <p className="text-center text-gray-600">No conversations available</p>
                    ) : (
                        conversations.map((conversation) => (
                            <div
                                key={conversation.id}
                                onClick={() => setSelectedConversation({ ...conversation })}
                                className={`flex items-center p-4 mb-3 rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                                    selectedConversation?.id === conversation.id
                                        ? "bg-orange-400 shadow-lg"
                                        : "bg-white bg-opacity-70 hover:bg-opacity-100"
                                }`}
                            >
                                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mr-4">
                                    <span className="text-xl font-semibold text-white">
                                        {getInitial(conversation.name)}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-gray-800 text-base truncate">
                                            {conversation.name}
                                        </p>
                                        <span className="text-xs text-gray-600 flex-shrink-0">
                                          { formatTime(conversation.time)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 line-clamp-1">
                                        {conversation.lastMessage || "Chưa có tin nhắn"}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Khu vực chat */}
            {selectedConversation && currentUserId ? (
                <div className="flex-1 flex flex-col bg-gradient-to-b from-orange-100 to-orange-200 rounded-xl shadow-xl">
                    {/* Header */}
                    <div className="p-6 border-b border-orange-300 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mr-4">
                <span className="text-lg font-semibold text-white">
                  {getInitial(selectedConversation.name)}
                </span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 text-xl">{selectedConversation.name}</h3>
                                <p className="text-sm text-orange-600 font-medium">Đang hoạt động</p>
                            </div>
                        </div>
                    </div>

                    {/* Tin nhắn */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        {selectedConversation.messages.length === 0 ? (
                            <p className="text-center text-gray-600">No messages yet</p>
                        ) : (
                            selectedConversation.messages.map((message, index) => (
                                <div
                                    key={message.id || `msg-${index}`}
                                    className={`flex mb-4 ${
                                        message.user_id === currentUserId ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`max-w-[70%] p-4 rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 ${
                                            message.user_id === currentUserId
                                                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                                                : "bg-white bg-opacity-80 text-gray-800"
                                        }`}
                                    >
                                        <p className="text-sm font-semibold">{message.user_name || "Unknown"}</p>
                                        <p className="text-sm">{message.content}</p>
                                        <span className="text-xs opacity-75 block mt-1">
                                            {formatTime(message.created_at)}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-6 border-t border-orange-300">
                        <div className="flex gap-4">
                            <input
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Nhập tin nhắn..."
                                className="flex-1 p-3 bg-white bg-opacity-70 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 transition-all duration-200"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
                            >
                                Gửi
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-orange-100 to-orange-200 rounded-xl shadow-xl">
                    <p className="text-gray-600">Select a conversation to start chatting</p>
                </div>
            )}
        </div>
    );
}