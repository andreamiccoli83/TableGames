<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Game;

class GameSeeder extends Seeder
{
    public function run()
    {
        Game::create([
            'name' => 'Azul',
            'description' => 'Beautiful tile placement game where players compete as artisans decorating the walls of the Royal Palace.',
            'min_players' => 2,
            'max_players' => 4,
            'play_time' => 45,
            'year_published' => 2017,
            'avg_rating' => 4.2,
            'image_url' => 'https://cf.geekdo-images.com/aPSHJO0d0XOpQR5X-wJonw__imagepage/img/q4uWd2nWLG9Oo3wbXlgMURyXWu4=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6973671.png',
            'metadata' => json_encode([
                'complexity' => 2.3,
                'bgg_rank' => 45,
                'mechanisms' => ['Tile Placement', 'Set Collection', 'Pattern Building'],
                'categories' => ['Abstract Strategy', 'Puzzle']
            ])
        ]);

        Game::create([
            'name' => 'Ticket to Ride',
            'description' => 'Cross-country train adventure where players collect cards to claim railway routes connecting cities.',
            'min_players' => 2,
            'max_players' => 5,
            'play_time' => 60,
            'year_published' => 2004,
            'avg_rating' => 4.0,
            'image_url' => 'https://cf.geekdo-images.com/ZWJg0dCdrWHxVnc0eFXK8w__imagepage/img/pH5QnhFcFDMKPwjDOw-wv-5nuAI=/fit-in/900x600/filters:no_upscale():strip_icc()/pic38668.jpg',
            'metadata' => json_encode([
                'complexity' => 1.8,
                'bgg_rank' => 98,
                'mechanisms' => ['Set Collection', 'Route Building'],
                'categories' => ['Trains', 'Family']
            ])
        ]);

        Game::create([
            'name' => 'Wingspan',
            'description' => 'Engine-building game about birds where each bird has unique powers that help you build your wildlife preserve.',
            'min_players' => 1,
            'max_players' => 5,
            'play_time' => 90,
            'year_published' => 2019,
            'avg_rating' => 4.3,
            'image_url' => 'https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__imagepage/img/Tgxqx7-dxJwmzdrx0hlNhqSP0jg=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4458123.jpg',
            'metadata' => json_encode([
                'complexity' => 2.4,
                'bgg_rank' => 12,
                'mechanisms' => ['Engine Building', 'Tableau Building'],
                'categories' => ['Animals', 'Card Game']
            ])
        ]);

        Game::create([
            'name' => 'Catan',
            'description' => 'Build settlements and cities on the island of Catan by trading resources with other players.',
            'min_players' => 3,
            'max_players' => 4,
            'play_time' => 75,
            'year_published' => 1995,
            'avg_rating' => 3.9,
            'image_url' => 'https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__imagepage/img/M_3Vb0aN0fnEPCdJeT3Tpbqbkj8=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2419375.jpg',
            'metadata' => json_encode([
                'complexity' => 2.3,
                'bgg_rank' => 156,
                'mechanisms' => ['Dice Rolling', 'Trading', 'Modular Board'],
                'categories' => ['Economic', 'Strategy']
            ])
        ]);

        Game::create([
            'name' => 'Splendor',
            'description' => 'Fast-paced card game where you collect gems to buy developments and attract nobles.',
            'min_players' => 2,
            'max_players' => 4,
            'play_time' => 30,
            'year_published' => 2014,
            'avg_rating' => 3.8,
            'image_url' => 'https://cf.geekdo-images.com/rwOMxx3fQBdSU9E2-2zAzQ__imagepage/img/ERYvZUTOsJhZ64vhm6mUmVPEW1E=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1904079.jpg',
            'metadata' => json_encode([
                'complexity' => 1.8,
                'bgg_rank' => 87,
                'mechanisms' => ['Set Collection', 'Engine Building'],
                'categories' => ['Card Game', 'Renaissance']
            ])
        ]);
    }
}
