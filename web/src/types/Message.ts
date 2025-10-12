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
    created_at: string;
}