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