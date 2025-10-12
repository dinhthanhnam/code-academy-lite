<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * 
 *
 * @property int $id
 * @property string $class_code
 * @property string $name
 * @property string $slug
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $regular_lecturer
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $regular_students
 * @property-read int|null $regular_students_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static Builder<static>|RegularClass newModelQuery()
 * @method static Builder<static>|RegularClass newQuery()
 * @method static Builder<static>|RegularClass query()
 * @method static Builder<static>|RegularClass whereClassCode($value)
 * @method static Builder<static>|RegularClass whereCreatedAt($value)
 * @method static Builder<static>|RegularClass whereId($value)
 * @method static Builder<static>|RegularClass whereName($value)
 * @method static Builder<static>|RegularClass whereSlug($value)
 * @method static Builder<static>|RegularClass whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class RegularClass extends Model
{
    protected $fillable = ['class_code', 'name', 'slug'];

    public function users()
    {
        return $this->hasMany(User::class, 'regular_class_id');
    }
    public function regular_students()
    {
        return $this->hasMany(User::class, 'regular_class_id')->where('role', 'student');
    }
    public function regular_lecturer()
    {
        return $this->hasOne(User::class, 'regular_class_id')->where('role', 'lecturer');
    }
}
