@extends('layouts.app')

@section('content')

	<div class="container">
		<div class="col-sm-6">
			<table class="table table-hover table-pointer">
				<thead>
					<tr>
						<th colspan="2">
							Выберите врача
						</th>
					</tr>
				</thead>
				
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
	</div>

@endsection