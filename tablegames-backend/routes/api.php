<?php

use Illuminate\Support\Facades\Route;
use App\Models\Game;

Route::get('/games', function () {
    return Game::all();
});
