<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * 
 *
 * @property-read \App\Models\Course|null $course
 * @property-read \App\Models\CourseClass|null $course_class
 * @property-read \App\Models\Exercise|null $exercise
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseExercise newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseExercise newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseExercise query()
 * @property int $id
 * @property int $course_id
 * @property int|null $course_class_id
 * @property int $exercise_id
 * @property int $week_number
 * @property int $is_hard_deadline
 * @property int $is_active
 * @property string|null $deadline
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseExercise whereCourseClassId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseExercise whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseExercise whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseExercise whereDeadline($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseExercise whereExerciseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseExercise whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseExercise whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseExercise whereIsHardDeadline($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseExercise whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CourseExercise whereWeekNumber($value)
 * @mixin \Eloquent
 */
class CourseExercise extends Pivot
{
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function course_class(): BelongsTo
    {
        return $this->belongsTo(CourseClass::class, 'course_class_id');
    }

    public function exercise(): BelongsTo
    {
        return $this->belongsTo(Exercise::class);
    }
}
