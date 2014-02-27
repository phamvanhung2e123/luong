/**
 * Created by hoangnn on 2/27/14.
 */

/**
 * Created by hoangnn on 2/17/14.
 */
window.onload = function () {
	var messages = [];
	var socket = io.connect("http://localhost:3309");
	var el = document.querySelector('.odometer');
	var current = parseInt($("#hidden_new").attr("value")) + 100;
	var od = new Odometer({
		el: el,
		value: 333555,
		duration: 100,
		format: '',
		theme: 'digital'
	});
	od.update(current);

	socket.on('new_user', function (data) {
		//$("#report").append(data.message+"<br/>");
		if (data.isNew)
		{
			$("#report").append("add new user<br>");
		} else
		{
			$("#report").append("add old user<br>");
		}
		current = current + 1;
		od.update(current);

	});
	var today = Date.today();
	var year = today.getFullYear();
	var month = today.getMonth();
	var next = month + 2;
	var nextMonth = year + "/" + next + "/01";

	console.log(today);
	$('#next-month').countdown(nextMonth, function (event) {
		$(this).html(event.strftime('<span class="btn-lg btn-info">%w</span> weeks <span class="btn-lg btn-info">%d</span> days ' +
		                  '<span class="btn-lg btn-danger">%H</span> hours <span class="btn-lg btn-warning">%M</span> minutes <span class="btn-lg btn-success">%S</span> seconds'));

	});

}