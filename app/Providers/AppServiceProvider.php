<?php

namespace App\Providers;

use App\View\Components\Navbar;
use App\View\Components\Sidebar;
use App\View\Components\Banner;
use App\View\Components\PracticumHandoutInputField;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Blade::component('sidebar', Sidebar::class);
        Blade::component('navbar', Navbar::class);
        Blade::component('banner', Banner::class);
        Blade::component('practicum-handout-input-field', PracticumHandoutInputField::class);
    }
}
