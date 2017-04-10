@extends('layouts.app')

@section('content')

	<div class="container">
		<div class="col-sm-6">
			<h3>Выберите врача</h3>
			
			<table class="table table-hover table-pointer">
				<tbody>
					@foreach ($professions as $profession)
						@foreach ($profession->doctors as $doctor)
							<tr>
								<td>{{ $profession->name }}</td>
								<td>{{ $doctor->name }}</td>
							</tr>
						@endforeach
					@endforeach
				</tbody>
				
			</table>
		</div>
		
		<div class="col-sm-6">
			<div id="calendar"></div>
			
			<div class="col-sm-6 text-left">
				<a href="javascript: void(0)" id="linkPrevMonth">← Предыдущий месяц</a>
			</div>
			<div class="col-sm-6 text-right">
				<a href="javascript: void(0)" id="linkNextMonth">Следующий месяц →</a>
			</div>
		</div>
	</div>

@endsection