<?php

use Illuminate\Support\Facades\Route;
use App\Models\Game;

// Lista tutti i giochi
Route::get('/games', function () {
    return Game::all();
});

// Dettaglio singolo gioco
Route::get('/games/{id}', function ($id) {
    $game = Game::find($id);

    if (!$game) {
        return response()->json(['error' => 'Game not found'], 404);
    }

    return $game;
});

// Search giochi per nome
Route::get('/search', function () {
    $query = request('q');

    if (!$query) {
        return Game::limit(10)->get();
    }

    return Game::where('name', 'LIKE', "%{$query}%")
        ->orWhere('description', 'LIKE', "%{$query}%")
        ->get();
});
