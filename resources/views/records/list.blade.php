<table id="table-records" class="table table-pointer">
	<tbody>
		@for ($i = 0; $i <= 23; $i++)
			<tr class="{{ isset($records[$i]) ? 'bg-danger' : '' }}">
				<td>{{ $i }}:00</td>
				<td>{{ isset($records[$i]) ? 'Время занято' : 'Время для записи свободно' }}</td>
			</tr>
		@endfor
	</tbody>
</table>