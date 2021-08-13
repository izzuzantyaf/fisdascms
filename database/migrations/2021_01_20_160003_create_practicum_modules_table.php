<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePracticumModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('practicum_modules', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('acronym');
            $table->string('lang');
            $table->string('icon')->nullable();
            $table->string('reactjs_icon')->nullable();
            $table->string('journal_cover_link')->nullable();
            $table->integer('journal_cover_visibility')->default(0);
            $table->string('preliminary_test_link')->nullable();
            $table->integer('preliminary_test_visibility')->default(0);
            $table->string('video_url')->nullable();
            $table->string('video_embed_url')->nullable();
            $table->integer('video_visibility')->default(0);
            $table->string('simulator_link')->nullable();
            $table->integer('simulator_visibility')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('practicum_modules');
    }
}
