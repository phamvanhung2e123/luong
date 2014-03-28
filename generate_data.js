var mongoose = require('mongoose');

var UniqueUserModel = require("./models/UniqueUserModel");
var LogModel = require("./models/LogModel");
var util = require("util");
var async = require("async");
require("date-utils");
var DailyModel = require("./models/DailyModel");
var constant = require("./config/constant");
var mongoOptions = {
    db: { safe: true },
    server: { auto_reconnect: true}
};

var uri = 'mongodb://localhost/log';
var db = mongoose.connect(uri, mongoOptions, function (err, res){
    if (err) {
        console.log ('ERROR connecting to: ' + uri + '. ' + err);
        process.exit(1);
    } else {
        console.log ('Succeeded connected to: ' + uri);


        var genStatus = function(){
            x = Date.now() / 1000 / 100;
            r = Math.random();
            threshold = 0.9 + Math.sin(x) / 10.0;
            if(r < threshold){
                return 200;
            } else if(r < threshold + 0.1){
                return 301;
            } else if(r < threshold + 0.05){
                return 404;
            } else {
                return 503;
            }
        };

        var fs = require('fs');
        var csv = require('csv');


        csv()
            .from.path(__dirname+'/test.csv', { delimiter: ',', escape: '"' })
            .to.stream(fs.createWriteStream(__dirname+'/sample.out'))
            .transform( function(row){
                row.unshift(row.pop());
                return row;
            })
            .on('record', function(row,index){
                console.log('#'+index+' '+JSON.stringify(row));

                setTimeout(function(){
                    function return_date(date_i){
                        if(date_i==null){
                            return date.now()
                        }
                    }
                    var log = new LogModel({
                        hatena: row[0],
                        sp_id: row[1],
                        log_id: row[2],
                        uuid: row[3],
                        last_login_date: return_date(row[4]),
                        register_date: return_date(row[5]),
                        first_paid_date: return_date(row[6]),
                        tutorial_flag: row[7],
                        now_game_area: row[8],
                        now_game_stage: row[9],
                        energy_having: row[10],
                        gem_having: row[11],
                        energy_using: row[12],
                        gem_using: row[13],
                        payment: row[14],
                        get_warriors_id: row[15],
                        battle_result: row[16],
                        warriors_number: row[18],
                        device_time: row[19],
                        create_date: return_date(row[20]),
                        device_os: row[21],
                        device_name: row[22],
                        miss: row[0]
                    });
                    log.save(function(err){
                        if(err){
                            console.log("Error:"+err);
                        }else{
                            console.log("Thank you");
                        }
                    });
                }, 900);
            })
            .on('close', function(count){
                // when writing to a file, use the 'close' event
                // the 'end' event may fire before the file has been written
                console.log('Number of lines: '+count);
            })
            .on('error', function(error){
                console.log(error.message);
            });


    /*
    setInterval(function(){
      var log = new LogModel({
        uuid: genStatus(),
        log_id: Date.now(),
        last_login_date: Date()
      });
      log.save(function(err){
        if(err){
          console.log("Error:"+err);
        }else{
            console.log("Thank you");
        }
      });
    }, 200);
    */
  }
});


