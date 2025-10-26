'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Echo from 'laravel-echo';

export interface Message {
    id: string;
    content: string;
    created_at: string;
    conversation_id: string;
}

export interface Conversation {
    id: string;
    messages: Message[];
    lastMessage?: string;
    time?: string;
}

interface ChatContextProps {
    conversations: Conversation[];
    selectedConversation: Conversation | null;
    echo: Echo<any> | null;
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
    setSelectedConversation: React.Dispatch<React.SetStateAction<Conversation | null>>;
    setEcho: React.Dispatch<React.SetStateAction<Echo<any> | null>>;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [echo, setEcho] = useState<Echo<any> | null>(null);

    useEffect(() => {
        if (!echo || !selectedConversation) return;

        const channelName = `conversation.${selectedConversation.id}`;
        const channel = echo.private(channelName);

        channel.listen('MessageSent', (data: any) => {
            const msg: Message = data.message || data;
            if (!msg?.id) return;

            // Chỉ thêm tin nhắn vào selectedConversation nếu đúng ID
            if (msg.conversation_id === selectedConversation.id) {
                setSelectedConversation(prev => {
                    if (!prev) return prev;
                    return {
                        ...prev,
                        messages: [...prev.messages, msg],
                        lastMessage: msg.content,
                        time: msg.created_at,
                    };
                });
            }
        });

        return () => {
            channel.stopListening('MessageSent');
            echo.leave(`private-${channelName}`);
        };
    }, [echo, selectedConversation]);

    return (
        <ChatContext.Provider
            value={{
                conversations,
                selectedConversation,
                echo,
                setConversations,
                setSelectedConversation,
                setEcho,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    const ctx = useContext(ChatContext);
    if (!ctx) throw new Error('useChatContext must be used within ChatProvider');
    return ctx;
};
