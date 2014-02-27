var LogModel = require("../models/LogModel");
function insert()
{
	var Log = new LogModel();
	Log.uuid = "hoangnn";
	Log.save(function(err, res){
		if(err)
		{
			console.log("Error: " + err);
		}else{
			console.log("Save success");
			console.log(res);
		}
	});
}

insert();