/**
 * Created by hoangnn on 4/8/14.
 */

module.exports = function(app){
	var collect = {}
	collect.collect = function(req, res)
	{
		console.log(req.body.json);
		return res.send("Ok");
	}

	return collect;
}