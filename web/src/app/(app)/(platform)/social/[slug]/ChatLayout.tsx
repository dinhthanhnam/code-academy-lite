'use client';

import Chatbox from './Chatbox';
import { useChatContext } from './ChatContext';
import { useEffect } from 'react';
import {useParams} from "next/navigation";

export default function ChatLayout() {
    const { setSelectedConversation, conversations } = useChatContext();

    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    useEffect(() => {
        const conv = conversations.find(c => c.id === slug);
        if (conv) setSelectedConversation(conv);
    }, [slug, conversations, setSelectedConversation]);

    return (
        <div>
            <Chatbox />
        </div>
    );
}