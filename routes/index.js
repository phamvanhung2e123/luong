/*
 * GET home page.
 */
module.exports = function (io) {

    var routes = {};
    var Log = require('../models/LogModel');


    routes.index = function (req, res) {
        res.render('index', { title: 'Express' });
    };


    routes.update = function (req, res) {
        req.socket.setTimeout(Infinity);

        var stream;
        Log.findOne().sort({_id: -1}).exec(function (err, item) {
            if (err) {
                console.log(err);
            }
            stream = Log.find().gt('_id', item._id).sort({'$natural': 1}).tailable().stream();
            var messageCount = 0;

            stream.on("error", function (err) {
                console.log("Mongo Error: " + err);
            });

            stream.on('data', function (doc) {

                messageCount++;
                console.log(messageCount + '/' + doc._id);

                Log.count({}, function (err, number) {
                    console.log(doc);
                    var msg = JSON.stringify({
                        status: doc.uuid,
                        taken: doc.uuid,
                        req: doc.uuid,
                        log_count: number
                    });
                    console.log(number);
                    console.log("data: " + msg);
                    res.write("data: " + msg + "\n\n");
                })
            });

            stream.on('close', function () {
                console.log("Mongo closed");
            });
        });

        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        res.write('\n');

        req.on("close", function () {
            stream.destroy();
            console.log("Client disconnected.");
        });
    };

    return routes
}