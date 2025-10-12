<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 *
 *
 * @property int $id
 * @property string $course_code
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Collection<int, \App\Models\CourseClass> $course_classes
 * @property-read int|null $course_classes_count
 * @property-read \App\Models\CourseExercise|null $pivot
 * @property-read Collection<int, \App\Models\Exercise> $predefined_problems
 * @property-read int|null $predefined_problems_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereCourseCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereUpdatedAt($value)
 * @property-read Collection<int, \App\Models\Exercise> $predefined_exercises
 * @property-read int|null $predefined_exercises_count
 * @mixin \Eloquent
 */
class Course extends Model
{
    protected $fillable = ['course_code', 'name'];

    public function course_classes(): HasMany
    {
        return $this->hasMany(CourseClass::class, 'course_id');
    }
    public function exercises(): Collection
    {
        $exercise_ids = \DB::table('course_exercise')
            ->where('course_id', $this->id)
            ->distinct()
            ->pluck('exercise_id');

        return Exercise::findMany($exercise_ids);
    }
}
