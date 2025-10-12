<?php
namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConversationController extends Controller
{
    public function personalCourseClasses()
    {
        $user = Auth::user();
        $conversations = Conversation::whereHas('courseClass', function ($query) use ($user) {
            $query->whereHas('students', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            });
        })->get();

        return response()->json([
            'success' => true,
            'message' => 'Personal course classes fetched successfully',
            'personal_course_classes' => $conversations->map(function ($conversation) {
                return [
                    'id' => $conversation->id,
                    'name' => $conversation->name,
                    'path' => $conversation->slug,
                ];
            }),
        ]);
    }
}