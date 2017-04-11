<table id="table-records" class="table table-pointer">
	<tbody>
		@for ($i = 0; $i <= 23; $i++)
			<tr class="{{ isset($records[$i]) ? 'bg-danger' : '' }}" {{ isset($records[$i]) ? '' : 'data-toggle=modal data-target=.record-modal' }}>
				<td>{{ $i }}:00</td>
				<td>{{ isset($records[$i]) ? 'Время занято' : 'Время для записи свободно' }}</td>
			</tr>
		@endfor
	</tbody>
</table>


<div class="modal fade record-modal">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="record-form">
				<h3>Запись к врачу</h3>
				
				<ul class="record-errors alert alert-danger"></ul>
				
				<form action="{{ url('/store') }}" method="POST" class="form-horizontal">
					<div class="form-group">
						<label for="user-name" class="col-sm-3 control-label">Ваше имя</label>

						<div class="col-sm-6">
							<input type="text" name="name" id="user-name" class="form-control">
						</div>
					</div>
					
					
					<div class="form-group">
						<label for="user-phone" class="col-sm-3 control-label">Ваш телефон</label>

						<div class="col-sm-6">
							<input type="text" name="phone" id="user-phone" class="form-control">
						</div>
					</div>
					
					
					<div class="form-group">
						<label class="col-sm-3 control-label">Время</label>

						<div class="col-sm-6">
							<input type="text" id="user-time" class="form-control" readonly>
						</div>
					</div>

					<!-- Кнопка добавления задачи -->
					<div class="form-group">
						<div class="col-sm-offset-3 col-sm-6">
							<button type="submit" class="btn btn-default">
								Записаться
							</button>
						</div>
					</div>
				</form>
			</div>
			
			<div class="record-success">
				<div class="alert alert-success">Вы успешно записались!</div>
				<button type="button" class="btn btn-default" data-dismiss="modal">
					Ок
				</button>
			</div>
		</div>
	</div>
</div>