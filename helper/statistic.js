var LogModel = require("../models/LogModel");

function user_count() {
	console.time("User Count");
	LogModel.distinct("uuid", function (err, res) {
		if (err)
		{
			console.log(err);
		} else
		{
			console.log("This system have: " + res.length + " distinct users");
		}
		console.timeEnd("User Count");
		process.exit(0);
	});
}

function record_count() {
	console.time("Record Count");
	LogModel.distinct("_id", function (err, res) {
		if (err)
		{
			console.log(err);
		} else
		{
			console.log("This system have: " + res.length + " distinct records");
		}
		console.timeEnd("Record Count");
		process.exit(0);
	});
}

function login_date_count() {
	console.time("Login Count");
	LogModel.distinct("last_login_date", function (err, res) {
		if (err)
		{
			console.log(err);
		} else
		{
			console.log("This system have: " + res.length + " distinct login date");
			console.log(res);
		}
		console.timeEnd("Login Count");
		process.exit(0);
	});
}

function active_user()
{

}

function indexUUID()
{
	console.time("Index time");
	LogModel.ensureIndexes(function(err){
		console.log(err);
		console.timeEnd("Index time");
	});
}

//login_date_count();
//record_count();
user_count();
//indexUUID();

