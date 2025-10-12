<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 *
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise query()
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string|null $level
 * @property int $is_free
 * @property int $time_limit
 * @property int $memory_limit
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Language> $languages
 * @property-read int|null $languages_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Topic> $topics
 * @property-read int|null $topics_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise whereIsFree($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise whereLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise whereMemoryLimit($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise whereTimeLimit($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Exercise extends Model
{
    protected $fillable = ['title', 'description', 'is_free', 'level', 'time_limit', 'memory_limit', 'example_input', 'example_output', 'test_cases'];
    protected $casts = [
        'test_cases' => 'array',
    ];
    public function topics(): BelongsToMany
    {
        return $this->belongsToMany(Topic::class);
    }

    public function language(): BelongsToMany
    {
        return $this->belongsToMany(Language::class);
    }
}
