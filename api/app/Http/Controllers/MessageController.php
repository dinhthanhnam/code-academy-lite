<?php
namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function index($conversationId)
    {
        $messages = Message::where('conversation_id', $conversationId)
            ->with('user')
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Messages fetched successfully',
            'messages' => $messages->map(function ($message) {
                return [
                    'id' => $message->id,
                    'user_id' => $message->user_id,
                    'user_name' => $message->user->name,
                    'conversation_id' => $message->conversation_id,
                    'content' => $message->content,
                    'created_at' => $message->created_at->toISOString(),
                    'updated_at' => $message->updated_at->toISOString(),
                ];
            }),
        ]);
    }

    public function store(Request $request, $conversationId)
    {
        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $message = Message::create([
            'user_id' => Auth::id(),
            'conversation_id' => $conversationId,
            'content' => $validated['content'],
        ]);

        $message->load('user');
        // Phát Event
        event(new MessageSent($message));

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully',
            'data' => [
                'id' => $message->id,
                'user_id' => $message->user_id,
                'user_name' => $message->user->name,
                'conversation_id' => $message->conversation_id,
                'content' => $message->content,
                'created_at' => $message->created_at,
                'updated_at' => $message->updated_at,
            ],
        ]);
    }
}
