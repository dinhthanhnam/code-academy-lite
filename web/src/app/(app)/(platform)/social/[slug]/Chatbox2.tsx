"use client";

import {useState, useEffect, useRef} from "react";
import {getInitial, formatTime, initializeChat, sendChatMessage} from "./ChatService";
import echo from "@/utils/Echo";

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

// WebSocket Manager
class WebSocketManager {
    private echo: any;
    private listeners: Map<string, (data: any) => void> = new Map();
    private subscribedChannels: Set<string> = new Set();

    constructor(echoInstance: any) {
        this.echo = echoInstance;
        console.log("WebSocketManager initialized with echo:", echoInstance);
    }

    subscribe(conversationId: string, onMessage: (data: any) => void) {
        if (!this.echo) {
            console.error("Echo instance not available");
            return;
        }

        const channelName = `conversation.${conversationId}`;
        if (this.subscribedChannels.has(channelName)) {
            console.log(`Already subscribed to private-${channelName}`);
            return;
        }

        console.log(`Subscribing to private-${channelName}`);
        const channel = this.echo.private(channelName);

        // Debug subscription success
        channel.subscribed(() => {
            console.log(`Successfully subscribed to private-${channelName}`);
        });

        // Listen for MessageSent event with multiple name formats
        const eventNames = ["MessageSent", ".MessageSent", "App\\Events\\MessageSent"];
        eventNames.forEach((eventName) => {
            channel.listen(eventName, (data: any) => {
                console.log(`Received ${eventName} event:`, data);
                onMessage(data);
            });
        });

        // Debug all channel errors
        channel.error((error: any) => {
            console.error(`Channel error for ${channelName}:`, error);
        });

        this.subscribedChannels.add(channelName);
        this.listeners.set(channelName, onMessage);
    }

    unsubscribe(conversationId: string) {
        const channelName = `conversation.${conversationId}`;
        if (!this.subscribedChannels.has(channelName)) return;

        console.log(`Unsubscribing from private-${channelName}`);
        const eventNames = ["MessageSent", ".MessageSent", "App\\Events\\MessageSent"];
        eventNames.forEach((eventName) => {
            this.echo.private(channelName).stopListening(eventName);
        });
        this.echo.leave(`private-${channelName}`);
        this.subscribedChannels.delete(channelName);
        this.listeners.delete(channelName);
    }

    cleanup() {
        this.subscribedChannels.forEach((channelName) => {
            this.unsubscribe(channelName.split(".")[1]);
        });
    }
}

export default function Chatbox() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const wsManagerRef = useRef<WebSocketManager | null>(null);

    // Initialize WebSocket manager
    useEffect(() => {
        wsManagerRef.current = new WebSocketManager(echo);
        return () => {
            wsManagerRef.current?.cleanup();
        };
    }, []);

    // Log state changes for debugging
    useEffect(() => {
        console.log("State - conversations:", conversations);
        console.log("State - selectedConversation:", selectedConversation);
        console.log("State - currentUserId:", currentUserId);
        console.log("State - loading:", loading);
        console.log("State - error:", error);
    }, [conversations, selectedConversation, currentUserId, loading, error]);

    // Initialize chat
    useEffect(() => {
        console.log("Starting chat initialization");
        initializeChat(setConversations, setSelectedConversation, setCurrentUserId, setError, setLoading);
    }, []);

    // Auto-scroll to latest message
    useEffect(() => {
        if (selectedConversation?.messages) {
            messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [selectedConversation?.messages]);

    // Handle WebSocket messages
    const handleWebSocketMessage = (data: any) => {
        console.log("Processing WebSocket data:", data);

        // Handle potential nested data structure
        const newMessage: Message = data.message || data;

        if (!newMessage || !newMessage.id) {
            console.error("Invalid message structure:", newMessage);
            return;
        }

        const conversationId = String(newMessage.conversation_id);

        // Update state with new message
        setConversations((prev) => {
            const updated = prev.map((conv) =>
                conv.id === conversationId
                    ? {
                        ...conv,
                        messages: [...conv.messages, newMessage],
                        lastMessage: newMessage.content,
                        time: newMessage.created_at,
                    }
                    : conv
            );
            console.log("Updated conversations:", updated);
            return updated;
        });

        setSelectedConversation((prev) => {
            if (!prev || prev.id !== conversationId) return prev;
            const updated = {
                ...prev,
                messages: [...prev.messages, newMessage],
                lastMessage: newMessage.content,
                time: newMessage.created_at,
            };
            console.log("Updated selectedConversation:", updated);
            return updated;
        });
    };

    // Subscribe to WebSocket when selectedConversation changes
    useEffect(() => {
        if (!selectedConversation) return;

        wsManagerRef.current?.subscribe(selectedConversation.id, handleWebSocketMessage);

        return () => {
            wsManagerRef.current?.unsubscribe(selectedConversation.id);
        };
    }, [selectedConversation?.id]);

    // Send message
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation || !currentUserId) {
            setError("Please enter a message and select a conversation.");
            return;
        }

        try {
            const messageContent = newMessage.trim();
            setNewMessage("");

            const optimisticMessage: Message = {
                id: `temp-${Date.now()}`,
                user_id: currentUserId,
                user_name: "You",
                content: messageContent,
                conversation_id: selectedConversation.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };

            // Update UI optimistically
            setConversations((prev) =>
                prev.map((conv) =>
                    conv.id === selectedConversation.id
                        ? {
                            ...conv,
                            messages: [...conv.messages, optimisticMessage],
                            lastMessage: optimisticMessage.content,
                            time: optimisticMessage.created_at,
                        }
                        : conv
                )
            );

            setSelectedConversation((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    messages: [...prev.messages, optimisticMessage],
                    lastMessage: optimisticMessage.content,
                    time: optimisticMessage.created_at,
                };
            });

            await sendChatMessage(selectedConversation.id, messageContent);
        } catch (err: any) {
            console.error("Error sending message:", err);
            setError(err.message || "Failed to send message.");
            setNewMessage(newMessage);
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
            {/* Conversation List */}
            <div
                className="w-96 flex flex-col bg-gradient-to-b from-orange-200 to-orange-300 rounded-xl shadow-xl overflow-hidden">
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
                                onClick={() => setSelectedConversation({...conversation})}
                                className={`flex items-center p-4 mb-3 rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                                    selectedConversation?.id === conversation.id
                                        ? "bg-orange-400 shadow-lg"
                                        : "bg-white bg-opacity-70 hover:bg-opacity-100"
                                }`}
                            >
                                <div
                                    className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mr-4">
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
                      {formatTime(conversation.time)}
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

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-gradient-to-b from-orange-100 to-orange-200 rounded-xl shadow-xl">
                {selectedConversation && currentUserId ? (
                    <>
                        <div className="p-6 border-b border-orange-300 flex items-center justify-between">
                            <div className="flex items-center">
                                <div
                                    className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mr-4"
                                >
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
                            <div ref={messagesEndRef}/>
                        </div>

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
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-gray-600">Select a conversation to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
}