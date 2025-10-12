<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    protected $fillable = ['user_id' , 'exercise_id' , 'course_class_id', 'source_code', 'language', 'status', 'execution_time', 'memory_used', 'output'];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
