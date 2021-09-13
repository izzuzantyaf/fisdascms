<?php

use App\Models\SocialMedia;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIconColorColumnIntoSocialMediaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('social_medias', function (Blueprint $table) {
            $table->string('icon_color')->after('color')->nullable();
        });

        foreach (SocialMedia::$seeds as [
            'icon_color' => $icon_color,
            'name' => $name,
        ]) {
            SocialMedia::where('name', $name)->update([
                'icon_color' => $icon_color,
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('social_medias', function (Blueprint $table) {
            $table->dropColumn('icon_color');
        });
    }
}
