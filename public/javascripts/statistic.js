/**
 * Created by hoangnn on 2/27/14.
 */

/**
 * Created by hoangnn on 2/17/14.
 */
window.onload = function () {
	var messages = [];
	var socket = io.connect("http://localhost:3309");
	var current_user = parseInt($("#hidden_new").attr("value")) + 000000000;
	var current_all = parseInt($("#hidden_all").attr("value")) + 000000000;
	var current_paid_user = parseInt($("#hidden_paid_user").attr("value")) + 000000000;
	var current_paid_value = parseInt($("#hidden_paid_value").attr("value")) + 000000000;


	var od = new Odometer({
		el: document.querySelector('.odometer'),
		value: 0,
		duration: 100
	});
	od.update(current_user);

	var rg = new Odometer({
		el: document.querySelector(".register_user"),
		value: 0,
		duration: 100
	});
	rg.update(current_all);

	var paid_user = new Odometer({
		el: document.querySelector(".paid_user"),
		value: 0,
		duration: 100
	});
	paid_user.update(current_paid_user);

	var paid_value = new Odometer({
		el: document.querySelector(".paid_value"),
		value: 0,
		duration: 100
	});
	paid_value.update(current_paid_value);

	socket.on('new_user', function (data) {
		//$("#report").append(data.message+"<br/>");
		if (data.isNew)
		{
			$("#report").append("add new user<br>");
		} else
		{
			$("#report").append("add old user<br>");
		}
		current_user = current_user + 1;
		od.update(current_user);
	});


	socket.on('new_paid', function (data) {
		$("#report").append(data.msg);
		current_paid_user += 1;
		paid_user.update(current_paid_user);
		current_paid_value += parseInt(data.paid_value);
		paid_value.update(current_paid_value);
	});

	//var today = Date.today();
	var next_time = Date.today().set({year: Date.today().getFullYear(), month: Date.today().getMonth()+1, day: 01, hour: 0, minute: 0});

	console.log(next_time);
	/*
	 console.log(today);
	 $('#next-month').countdown(nextMonth, function (event) {
	 $(this).html(event.strftime('<span class="btn btn-lg btn-info">%w</span> weeks <span class="btn btn-lg btn-info">%d</span> days ' +
	 '<span class="btn btn-lg btn-danger">%H</span> hours <span class="btn btn-lg btn-warning">%M</span> minutes <span class="btn btn-lg btn-success">%S</span> seconds'));

	 });
	 */

	var clock = $('.next-month').FlipClock({
		clockFace: 'DailyCounter'
	});

	clock.setTime((next_time.getTime()- Date.now())/1000);
	clock.setCountdown(true);


	var data = {
		labels: ["January", "February", "March", "April", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"],
		datasets: [
			{
				fillColor: "rgba(220,220,120,0.8)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(55,55,55,1)",
				pointStrokeColor: "#fff",
				data: [65, 59, 90, 81, 56, 55, 40, 0, 0, 0, 0, 0]
			},
			{
				fillColor: "rgba(251,87,105,0.4)",
				strokeColor: "rgba(251,87,105,1)",
				pointColor: "rgba(251,87,105,1)",
				pointStrokeColor: "#fff",
				data: [35, 78, 56, 19, 86, 47, 90, 0, 0, 0, 0, 0]
			},
			{
				fillColor: "rgba(151,187,205,0.8)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				data: [28, 48, 40, 19, 96, 27, 181, 0, 0, 0, 0, 0]
			}
		]
	};
	var canvas = document.getElementById("myChart");
	var ctx = canvas.getContext("2d");
	fitToContainer(canvas);

	var myNewChart = new Chart(ctx).Line(data);

	function fitToContainer(canvas) {
		canvas.style.width = '100%';
		canvas.style.height = '100%';
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
	}

}