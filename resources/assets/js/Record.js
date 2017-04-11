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