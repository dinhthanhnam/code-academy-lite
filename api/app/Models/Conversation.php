<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $fillable = ['name', 'regular_class_id', 'course_class_id', 'slug'];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function courseClass()
    {
        return $this->belongsTo(CourseClass::class);
    }
}
