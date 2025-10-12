<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExerciseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'level' => $this->level,
            'example_input' => $this->example_input,
            'example_output' => $this->example_output,
            'test_cases' => is_string($this->test_cases) ? json_decode($this->test_cases, true) : $this->test_cases,
            'is_free' => $this->is_free,
            'time_limit' => $this->time_limit,
            'memory_limit' => $this->memory_limit,
            'topics' => $this->topics->pluck('name')->all(), // Chỉ lấy danh sách tên của topics
            'language' => $this->language->isNotEmpty() ? $this->language->first()->name : null,
            'pivot' => $this->whenPivotLoaded('course_exercise', function () {
                return [
                    'course_id' => $this->pivot->course_id,
                    'week_number' => $this->pivot->week_number,
                    'deadline' => $this->pivot->deadline,
                    'is_hard_deadline' => $this->pivot->is_hard_deadline,
                    'is_active' => $this->pivot->is_active,
                    'is_test' => $this->pivot->is_test,
                ];
            }),
        ];
    }
}
