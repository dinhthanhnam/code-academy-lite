<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * 
 *
 * @property int $id
 * @property int $course_class_id
 * @property int $user_id
 * @property string $role
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CourseClass $course_class
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseAttendant newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseAttendant newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseAttendant query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseAttendant whereCourseClassId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseAttendant whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseAttendant whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseAttendant whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseAttendant whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseAttendant whereUserId($value)
 * @mixin \Eloquent
 */
class CourseAttendant extends Pivot
{
    protected $table = 'course_attendant';

    protected $fillable = ['course_class_id', 'user_id', 'role'];

    public function course_class(): BelongsTo
    {
        return $this->belongsTo(CourseClass::class, 'course_class_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
