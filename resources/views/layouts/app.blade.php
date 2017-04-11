<!DOCTYPE html>
<html lang="ru">
	<head>
		<title>Запись на приём к врачу</title>
		
		<meta name="csrf-token" content="{{ csrf_token() }}">

		<link href="{{ asset('/css/app.css') }}" rel="stylesheet">
		<link href="{{ asset('/css/style.css') }}" rel="stylesheet">
		
		<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
		<script src="{{ asset('/js/jquery-plugins.js') }}"></script>
		<script src="{{ asset('/js/bootstrap.js') }}"></script>
		<script src="{{ asset('/js/script.js') }}"></script>
	</head>

	<body>
		<section class="container">
			<h1>Запись к врачу</h1>
			@yield('content')
		</section>
	</body>
</html>