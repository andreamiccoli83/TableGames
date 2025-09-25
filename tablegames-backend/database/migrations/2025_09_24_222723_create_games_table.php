<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->json('metadata')->nullable(); // BGG data, complexity, etc.
            $table->integer('min_players')->default(1);
            $table->integer('max_players')->default(8);
            $table->integer('play_time')->nullable(); // in minutes
            $table->decimal('avg_rating', 3, 2)->default(0);
            $table->integer('year_published')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
