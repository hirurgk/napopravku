@extends('layouts.app')

@section('content')

		<div class="col-sm-6">
			<h3>Выберите врача</h3>
			
			<table class="table table-doctors table-hover table-pointer">
				<tbody>
					@foreach ($professions as $profession)
						@foreach ($profession->doctors as $doctor)
							<tr data-id="{{ $doctor->id }}">
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
				<a href="javascript: void(0)" onClick="Calendar.prevMonth()">← Предыдущий месяц</a>
			</div>
			<div class="col-sm-6 text-right">
				<a href="javascript: void(0)" onClick="Calendar.nextMonth()">Следующий месяц →</a>
			</div>
		</div>
		
		<div id="records" class="col-sm-12"></div>

@endsection