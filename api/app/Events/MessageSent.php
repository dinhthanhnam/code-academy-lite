<?php
namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Message $message;

    public function __construct(Message $message)
    {
        $this->message = $message;
        \Log::info('MessageSent event constructed', ['message_id' => $message->id]);
    }

    public function broadcastOn(): PrivateChannel
    {
        \Log::info('Broadcasting on channel', ['channel' => 'conversation.' . $this->message->conversation_id]);
        return new PrivateChannel('conversation.' . $this->message->conversation_id);
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->message->id,
            'user_id' => $this->message->user_id,
            'user_name' => $this->message->user ? $this->message->user->name : 'Unknown',
            'conversation_id' => (int) $this->message->conversation_id,
            'content' => $this->message->content,
            'created_at' => $this->message->created_at->toISOString(),
            'updated_at' => $this->message->updated_at->toISOString(),
        ];
    }

    public function broadcastAs(): string
    {
        return 'MessageSent';
    }
}
