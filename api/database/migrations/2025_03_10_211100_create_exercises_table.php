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
        Schema::create('exercises', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('level', ['basic', 'intermediate', 'advanced', 'exam'])->nullable();
            $table->string('example_input')->nullable();
            $table->string('example_output');
            $table->json('test_cases');
            $table->boolean('is_free')->default(false);
            $table->integer('time_limit');
            $table->integer('memory_limit');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('problems');
    }
};
