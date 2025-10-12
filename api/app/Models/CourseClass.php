<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 *
 *
 * @property int $id
 * @property string $assigned_regular_class_id
 * @property string $course_class_code
 * @property string $name
 * @property string|null $description
 * @property \Illuminate\Support\Carbon $start_date
 * @property int $course_id
 * @property string $slug
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CourseAttendant|\App\Models\CourseExercise|null $pivot
 * @property-read Collection<int, \App\Models\Exercise> $all_problems
 * @property-read int|null $all_problems_count
 * @property-read Collection<int, \App\Models\User> $attendants
 * @property-read int|null $attendants_count
 * @property-read Collection<int, \App\Models\Exercise> $problems
 * @property-read int|null $problems_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseClass newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseClass newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseClass query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseClass whereAssignedRegularClassId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseClass whereCourseClassCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseClass whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseClass whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseClass whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseClass whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseClass whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseClass whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseClass whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseClass whereUpdatedAt($value)
 * @property-read Collection<int, \App\Models\Exercise> $all_exercises
 * @property-read int|null $all_exercises_count
 * @property-read Collection<int, \App\Models\Exercise> $exercises
 * @property-read int|null $exercises_count
 * @property int $active
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseClass whereActive($value)
 * @mixin \Eloquent
 */
class CourseClass extends Model
{
    protected $fillable = [
        'assigned_regular_class_id',
        'course_class_code',
        'course_class_join_code',
        'name',
        'description',
        'start_date',
        'course_id',
        'slug',
        'active',
    ];

    protected $casts = [
        'start_date' => 'datetime',
    ];

    public function attendants()
    {
        return $this->belongsToMany(User::class, 'course_attendant', 'course_class_id', 'user_id')
            ->using(CourseAttendant::class)
            ->withPivot('role');
    }

    public function students()
    {
        return $this->attendants()->wherePivot('role', 'student');
    }

    public function lecturer()
    {
        return $this->attendants()->wherePivot('role', 'lecturer');
    }

    public function exercises(): BelongsToMany
    {
        return $this->belongsToMany(Exercise::class, 'course_exercise', 'course_class_id', 'exercise_id')
            ->using(CourseExercise::class)
            ->withPivot(['week_number', 'deadline', 'is_hard_deadline', 'is_active']);
    }

}
