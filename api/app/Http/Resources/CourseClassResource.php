<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseClassResource extends JsonResource
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
            'course_id' => $this->course_id,
            'course_class_code' => $this->course_class_code,
            'course_class_join_code' => $this->course_class_join_code,
            'assigned_regular_class_id' => $this->assigned_regular_class_id,
            'lecturer_id' => $this->lecturer->first()?->id,
            'name' => $this->name,
            'description' => $this->description,
            'active' => (boolean) $this->active,
            'start_date' => $this->start_date->toIso8601String(),
            'slug' => $this->slug,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
