<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
        'name',
        'description',
        'image_url',
        'metadata',
        'min_players',
        'max_players',
        'play_time',
        'year_published'
    ];

    protected $casts = [
        'metadata' => 'array'
    ];
}
