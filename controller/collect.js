/**
 * Created by hoangnn on 4/8/14.
 */

module.exports = function(app){
	var collect = {}
	collect.collect = function(req, res)
	{
		for(var i =0; i< req.body.length;i++)
		{
			console.log(req.body[i]);
		}
		return res.send("Ok");
	}

	return collect;
}