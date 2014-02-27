/**
 * Created by hoangnn on 2/27/14.
 */
var mongoose = require("mongoose");
var db = mongoose.createConnection('mongodb://localhost/log');

var UniqueUserSchema = mongoose.Schema({
	uuid: {type: String, index: true},
	last_login_date: Date,
	register_date: Date
});

var UniqueUserModel = db.model("UniqueUserLog", UniqueUserSchema);

module.exports = UniqueUserModel;