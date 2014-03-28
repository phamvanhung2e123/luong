/**
 * Created by hoangnn on 3/28/14.
 */

/**
 * Created by hoangnn on 2/27/14.
 */
var mongoose = require("mongoose");
var db = mongoose.createConnection('mongodb://localhost/log');

var RegisterSchema = mongoose.Schema({
	uuid: {type: String, index: true},
	last_login: Date,
	register: Date
});
var RegisterModel = db.model("RegisterUser", RegisterSchema);

module.exports = RegisterModel;