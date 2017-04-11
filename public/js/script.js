$(function(){
	Doctor.init();
	Calendar.init();
	Record.init();
});
Doctor = {
	selectedId: 0,
	
	init: function() {
		this.selectDoctor();
	},
	
	//Выбор врача
	selectDoctor: function() {
		var $this = this;
		
		$(".table-doctors tr").click(function(){
			$(".table-doctors tr").removeClass('bg-success');
			$(this).addClass('bg-success');
			
			$this.selectedId = $(this).data('id');
			
			Record.getTime($this.selectedId, Calendar.selectedDate);
		});
	},
}
Calendar = {
	now: new Date(),
	selectedDate: '0000-00-00',
	
	init: function() {
		var $this = this;
		
		$("#calendar").calendarWidget();
		
		this.selectDay();
	},
	
	//Следующий месяц
	nextMonth: function() {
		var $this = this;
		
		$this.now = new Date($this.now.getYear()+1900, $this.now.getMonth()+1, $this.now.getDate());
		
		$("#calendar").fadeOut(200, function(){
			$("#calendar").html('');
			
			$("#calendar").calendarWidget({
				month: $this.now.getMonth(),
				year: $this.now.getYear()+1900
			});
			
			$("#calendar").fadeIn(200);
		});
	},
	
	//Предыдущий месяц
	prevMonth: function() {
		var $this = this;
		
		//Запрет выбора предыдущего месяца
		var now = new Date();
		if (now.getYear() == $this.now.getYear() && now.getMonth() == $this.now.getMonth())
			return false;
		
		$this.now = new Date($this.now.getYear()+1900, $this.now.getMonth()-1, $this.now.getDate());
		
		$("#calendar").fadeOut(200, function(){
			$("#calendar").html('');
			
			$("#calendar").calendarWidget({
				month: $this.now.getMonth(),
				year: $this.now.getYear()+1900
			});
			
			$("#calendar").fadeIn(200);
		});
	},
	
	//Выбор дня
	selectDay: function() {
		var $this = this;
		
		$("body").on("click", "#calendar td:not(.old-day)", function(){
			$("#calendar td").removeClass('bg-success');
			$(this).addClass('bg-success');
			
			$this.selectedDate = $(this).data('date');
			
			Record.getTime(Doctor.selectedId, $this.selectedDate);
		});
	},
}
Record = {
	init: function() {
		this.initModal();
		this.initSend();
	},
	
	//Получение времени на запись
	getTime: function(id, date) {
		if (id > 0 && date != '0000-00-00')
		{
			$.ajax({
				url: '/list/' + id + '/' + date,
				method: 'GET',
				success: function(response){
					$("#records").fadeOut(200, function(){
						$("#records").html(response).fadeIn(200);
					})
				}
			});
		}
	},
	
	//Открытие модального окна с формой для записи
	initModal: function() {
		var $this = this;
		
		$("body").on("click", "#table-records tr:not(.bg-danger)", function(){
			$this.hideErrors();
			
			var time = $(this).find('td:first-child').html();
			$(".record-modal #user-time").val(time);
		});
	},
	
	//Запись
	initSend: function() {
		var $this = this;
		
		$("body").on("submit", ".record-modal form", function(){
			var data = $(this).serialize();
			
			$this.hideErrors();
			
			$.ajax({
				url: '/store',
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
				},
				data: data,
				method: "POST",
				dataType: 'json',
				complete: function(response) {
					var json = response.responseJSON;
					
					if (response.statusText != "OK") {
						//Выводим сообщения об ошибке
						for (i in json) {
							$(".record-modal .record-errors").append("<li>" + json[i] + "</li>");
						}
						
						$(".record-modal .record-errors").fadeIn(200);
					} else {
						//Успех
					}
				},
			});
			
			return false;
		});
	},
	
	//Прячем сообщения об ошибках
	hideErrors: function() {
		$(".record-modal .record-errors").html("").hide();
	},
}
//# sourceMappingURL=script.js.map
