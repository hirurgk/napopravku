var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.less('app.less');
	mix.sass('style.scss');
	
	mix.scripts(['init.js', 'Doctor.js', 'Calendar.js', 'Record.js'], 'public/js/script.js')
	mix.scripts(['jquery-plugins/jquery.calendar-widget.js', 'jquery-plugins/jquery.inputmask.js'], 'public/js/jquery-plugins.js')
	mix.scripts(['bootstrap.js'], 'public/js/bootstrap.js')
});