<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyOnThreeTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::drop('practicum_videos');
        Schema::drop('practicum_simulators');
        Schema::drop('journal_covers');

        Schema::create('practicum_videos', function (Blueprint $table) {
            $table->foreignId('practicum_module_id')->constrained();
            $table->string('video_id');
            $table->timestamps();
        });

        Schema::create('practicum_simulators', function (Blueprint $table) {
            $table->foreignId('practicum_module_id')->constrained();
            $table->text('link')->nullable();
            $table->timestamps();
        });

        Schema::create('journal_covers', function (Blueprint $table) {
            $table->foreignId('practicum_module_id')->constrained();
            $table->text('link')->nullable();
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
        //
    }
}
