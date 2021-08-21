const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .browserSync('fisdascms.test')
    .js('resources/js/global.js', 'public/js/global.js')
    .js('resources/js/assistant.js', 'public/js/assistant.js')
    .js('resources/js/avatar.js', 'public/js/avatar.js')
    .js('resources/js/sidebar.js', 'public/js/sidebar.js')
    .js('resources/js/visibility-toggler.js', 'public/js/visibility-toggler.js')
    .js('resources/js/success-banner.js', 'public/js/success-banner.js')
    .js('resources/js/admin-profile.js', 'public/js/admin-profile.js')
    .js('resources/js/social-media.js', 'public/js/social-media.js')
    .postCss('resources/css/app.css', 'public/css', [
        require('tailwindcss'),
    ]);