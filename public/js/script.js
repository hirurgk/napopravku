$(function(){
	Doctor.init();
	Calendar.init();
});


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
	selectDay: function(){
		var $this = this;
		
		$("body").on("click", "#calendar td:not(.old-day)", function(){
			$("#calendar td").removeClass('bg-success');
			$(this).addClass('bg-success');
			
			$this.selectedDate = $(this).data('date');
			
			Record.getTime(Doctor.selectedId, $this.selectedDate);
		});
	},
}


Doctor = {
	selectedId: 0,
	
	init: function(){
		this.selectDoctor();
	},
	
	//Выбор врача
	selectDoctor: function(){
		var $this = this;
		
		$(".table-doctors tr").click(function(){
			$(".table-doctors tr").removeClass('bg-success');
			$(this).addClass('bg-success');
			
			$this.selectedId = $(this).data('id');
			
			Record.getTime($this.selectedId, Calendar.selectedDate);
		});
	},
}


Record = {
	//Получение времени на запись
	getTime: function(id, date){
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
}
//# sourceMappingURL=script.js.map
