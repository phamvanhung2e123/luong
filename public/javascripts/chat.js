/**
 * Created by hoangnn on 2/17/14.
 */
window.onload = function () {
	var messages = [];
	var socket = io.connect("http://localhost:3309");
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");

	socket.on('sendchat', function (data) {
		console.log(data);
		if (data.message)
		{
			messages.push(data.message);
			var html = '';
			for (var i = 0; i < messages.length; i++)
			{
				html += messages[i] + '<br />';
			}
			content.innerHTML = html;
		} else
		{
			console.log("There is a problem:", data);
		}
	});

	sendButton.onclick = function () {
		var text = field.value;
		socket.emit('send', { message: text });
	};
}