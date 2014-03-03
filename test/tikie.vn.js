/**
 * Created by hoangnn on 3/1/14.
 */

var request = require("request");

request.post("https://tiki.vn/customer/account/forgotpassword/",{form: {email: "abc@gmail.com"}}, function(err, res){
	console.log(res);
});