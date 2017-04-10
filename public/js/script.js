$(function(){
	Calendar.init();
});


Calendar = {
	now: new Date(),
	
	init: function() {
		var $this = this;
		
		$("#calendar").calendarWidget();
		
		$("#linkPrevMonth").click(function(){
			$this.prevMonth();
		});
		
		$("#linkNextMonth").click(function(){
			$this.nextMonth();
		});
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
	}
}
//# sourceMappingURL=script.js.map
