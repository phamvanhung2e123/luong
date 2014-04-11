/**
 * Created by hoangnn on 2/27/14.
 */
var mongoose = require("mongoose");
var db = mongoose.createConnection('mongodb://localhost/log');

var UniqueUserSchema = mongoose.Schema({
	uuid: {type: String, index: true},
	last_login: Date,
	register: Date
});
var UniqueUserModel = db.model("UniqueUser", UniqueUserSchema);

module.exports = UniqueUserModel;