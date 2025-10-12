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
        Schema::create('course_exercise', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->nullable()->constrained('courses')->onDelete('cascade');
            $table->foreignId('course_class_id')->nullable()->constrained('course_classes')->onDelete('cascade');
            $table->foreignId('exercise_id')->constrained('exercises')->onDelete('cascade');
            $table->integer('week_number');
            $table->boolean('is_hard_deadline')->default(false);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_test')->default(false);
            $table->unique(['course_id', 'course_class_id', 'exercise_id'], 'constraint_course_exercise_unique');
            $table->dateTime('deadline')->nullable(); // Hạn nộp bài cho bài tập regular
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_problem');
    }
};
