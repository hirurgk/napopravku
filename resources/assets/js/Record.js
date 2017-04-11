Record = {
	selectedId: 0,
	selectedDate: '0000-00-00',
	
	init: function() {
		this.initModal();
		this.initSend();
	},
	
	//Получение списка записей
	getTime: function(id, date) {
		$this = this;
		
		if (id > 0 && date != '0000-00-00')
		{
			$this.selectedId = id;
			$this.selectedDate = date;
			
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
	
	//Перезагрузка списка записей
	reload: function() {
		this.getTime($this.selectedId, $this.selectedDate);
	},
	
	//Открытие модального окна с формой для записи
	initModal: function() {
		var $this = this;
		
		$("body").on("click", "#table-records tr:not(.bg-danger)", function(){
			$this.hideErrors();
			
			var time = $(this).find('td:first-child').html();
			$(".record-modal #user-time").val(time);
			
			//Маска ввода телефона
			$("#user-phone").inputmask("+7(999)999-99-99");
		});
	},
	
	//Запись
	initSend: function() {
		var $this = this;
		
		$("body").on("submit", ".record-modal form", function(){
			var data = $(this).serialize();
			data += "&doctor_id=" + Doctor.selectedId;
			data += "&time_of_reception=" + Calendar.selectedDate + " " + $("#user-time").val() + ":00";
			
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
						$(".record-modal .record-form").remove();
						$(".record-modal .record-success").fadeIn(200);
						
						//При закрытии окна, перезагрузим список записей
						$('.record-modal').on('hidden.bs.modal', function (){
							$this.reload();
						})
						
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