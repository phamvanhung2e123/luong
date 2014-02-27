/**
 * Created by hoangnn on 2/27/14.
 */

/**
 * Created by hoangnn on 2/27/14.
 */

/**
 * Created by hoangnn on 2/17/14.
 */
window.onload = function () {
	var today = Date.today();
	var year = today.getFullYear();
	var month = today.getMonth();
	var next = month + 2;
	var nextMonth = year + "/" + next + "/25";

	$('#next-month').countdown(nextMonth, function (event) {
		$(this).html(event.strftime('<span class="btn-lg btn-info">%w</span> weeks <span class="btn-lg btn-info">%d</span> days ' +
		                            '<span class="btn-lg btn-danger">%H</span> hours <span class="btn-lg btn-warning">%M</span> minutes <span class="btn-lg btn-success">%S</span> seconds'));

	});

}