$(function() {
    var messages = [];
    var socket = io.connect("http://localhost");
    var current_user = parseInt($("#hidden_new").attr("value"));
    var current_all = parseInt($("#hidden_all").attr("value"));

    var current_paid_user = parseInt($("#hidden_paid_user").attr("value"));
    var current_paid_value = parseInt($("#hidden_paid_value").attr("value"));
    var current_all_global = 0;
    var current_all_value_global = 0;
    var snow_flag = 0;
    //TODO: init view for active user
    var od = new Odometer({
        el: document.querySelector('.odometer'),
        value: 0,
        duration: 100
    });
    od.update(current_user);

    //TODO: init view for all user
    var rg = new Odometer({
        el: document.querySelector(".register_user"),
        value: 0,
        duration: 100
    });
    rg.update(current_all);

    //TODO: init view for paid user
    var paid_user = new Odometer({
        el: document.querySelector(".paid_user"),
        value: 0,
        duration: 100
    });
    paid_user.update(current_paid_user);

    //TODO: init view for paid value
    var paid_value = new Odometer({
        el: document.querySelector(".paid_value"),
        value: 0,
        duration: 100
    });
    paid_value.update(current_paid_value);

    socket.on('active_user', function (data) {
        //$("#report").append(data.message+"<br/>");
        if (data.isNew)
        {
            $("#report").append("add active user<br>");
        } else
        {
            $("#report").append("add old user<br>");
        }
        current_user = current_user + 1;
        od.update(current_user);
    });

    function setValueAll(value)
    {
        window.myValue = value;
    }

    function getValue()
    {
        return window.myValue;
    }

    socket.on('new_user', function (data) {
        if (data.isNew)
        {
            $("#report").append("add new user<br>");
        } else
        {
            $("#report").append("add old user<br>");
        }

        current_all = current_all + 1;

        current_all_global = current_all_global +1;
        rg.update(current_all);
        if(current_all_global>=100&&snow_flag==0)
            try {
                snow.count = 30;   // number of flakes
                snow.delay = 20;   // timer interval
                snow.minSpeed = 2; // minimum movement/time slice
                snow.maxSpeed = 5; // maximum movement/time slice
                snow.start();
                snow_flag=1;
            } catch(e) {
                // no snow :(
            }

    });

    var current_all_paid_global = 0;


    socket.on('new_paid', function (data) {

        $("#report").append(data.msg);
        current_paid_user += 1;

        paid_user.update(current_paid_user);
        current_paid_value += parseInt(data.paid_value);
        current_all_paid_global += 1;
        console.log("paid value :"+ current_all_paid_global);

        paid_value.update(current_paid_value);

    });

    //var today = Date.today();
    var next_time = Date.today().set({year: Date.today().getFullYear(), month: Date.today().getMonth()+1, day: 01, hour: 0, minute: 0});

    /*
     console.log(today);
     $('#next-month').countdown(nextMonth, function (event) {
     $(this).html(event.strftime('<span class="btn btn-lg btn-info">%w</span> weeks <span class="btn btn-lg btn-info">%d</span> days ' +
     '<span class="btn btn-lg btn-danger">%H</span> hours <span class="btn btn-lg btn-warning">%M</span> minutes <span class="btn btn-lg btn-success">%S</span> seconds'));

     });
     */

    var clock = $('.next-month').FlipClock({
        clockFace: 'DailyCounter'
    });

    clock.setTime((next_time.getTime()- Date.now())/1000);
    clock.setCountdown(true);



    function fitToContainer(canvas) {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function buildGraph(){
        $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function(data) {

            // Create the chart
            $('#container_graph').highcharts('StockChart', {


                rangeSelector : {
                    inputEnabled: $('#container').width() > 480,
                    selected : 1
                },

                title : {
                    text : 'AAPL Stock Price'
                },

                series : [{
                    name : 'AAPL Stock Price',
                    data : data,
                    marker : {
                        enabled : true,
                        radius : 3
                    },
                    shadow : true,
                    tooltip : {
                        valueDecimals : 2
                    }
                }]
            });
        });

    }
    function buildStockGraph(){
        Highcharts.setOptions({
            global : {
                useUTC : false
            }
        });

        // Create the chart
        $('#container_graph').highcharts('StockChart', {
            chart : {
                events : {
                    load : function() {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        var series1 = this.series[1];

                        setInterval(function() {
                            var x = (new Date()).getTime(), // current time
                                y = current_all_global;
                            series.addPoint([x, y], true, true);
                            var x = (new Date()).getTime(), // current time
                                y = current_all_paid_global;
                            series1.addPoint([x, y], true, true);
                            console.log("Set inver current: " + current_all_global );
                            console.log("Set inver paid: " + current_all_paid_global );

                            current_all_global = 0;
                            current_all_paid_global =0;
                        }, 1000);
                    }
                }
            },

            rangeSelector: {
                buttons: [{
                    count: 1,
                    type: 'minute',
                    text: '1M'
                }, {
                    count: 5,
                    type: 'minute',
                    text: '5M'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                inputEnabled: false,
                selected: 0
            },

            title : {
                text : 'Live random data'
            },

            exporting: {
                enabled: false
            },

            series : [{
                name : 'Active user',
                data : (function() {
                    // generate an array of random data
                    var data = [], time = (new Date()).getTime(), i;

                    for( i = -999; i <= 0; i++) {
                        data.push([
                            time + i * 1000,
                            Math.round(Math.random() * 100)
                        ]);
                    }
                    return data;
                })()
            },
                {
                    name : 'Paid value',
                    data : (function() {
                            var data = [], time = (new Date()).getTime(), i;
                            for( i = -999; i <= 0; i++) {
                                data.push([
                                    time + i * 1000,
                                    Math.round(Math.random() * 100)
                                ]);
                            }
                            return data;

                    })()
                }
            ]
        });
    }

    function initialize() {
        var mapOptions = {
            zoom: 10,
            center: new google.maps.LatLng(35.664036, 139.698211)
        }
        var map = new google.maps.Map(document.getElementById('map'),
            mapOptions);

        setMarkers(map, beaches);
    }

    /**
     * Data for the markers consisting of a name, a LatLng and a zIndex for
     * the order in which these markers should display on top of each
     * other.
     */
    var beaches = [
        ['Bondi Beach', -33.890542, 151.274856, 4],
        ['Coogee Beach', -33.923036, 151.259052, 5],
        ['Cronulla Beach', -34.028249, 151.157507, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    function setMarkers(map, locations) {
        // Add markers to the map

        // Marker sizes are expressed as a Size of X,Y
        // where the origin of the image (0,0) is located
        // in the top left of the image.

        // Origins, anchor positions and coordinates of the marker
        // increase in the X direction to the right and in
        // the Y direction down.
        // Shapes define the clickable region of the icon.
        // The type defines an HTML &lt;area&gt; element 'poly' which
        // traces out a polygon as a series of X,Y points. The final
        // coordinate closes the poly by connecting to the first
        // coordinate.
        var shape = {
            coord: [1, 1, 1, 20, 18, 20, 18 , 1],
            type: 'poly'
        };
        setInterval(function() {
            var beach = ['Maro' + getRandomInt(1,1000), 35.664036 + getRandomInt(1,10000)/5000, 139.698211+ getRandomInt(1,10000)/5000, 1];
            var myLatLng = new google.maps.LatLng(beach[1], beach[2]);

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: beach[0],
                zIndex: beach[3]
            });
        }, 1000);

    }

    google.maps.event.addDomListener(window, 'load', initialize);

    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function buildMap(){

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var options = {
                    zoom: 15,
                    center: latlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById('map'), options);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: '現在地'
                });
                alert(marker);
            }, function(e) {
                document.getElementById('message').innerHTML = typeof e == 'string' ? e : e.message;
            });
        } else {
            document.getElementById('message').innerHTML = 'Location APIがサポートされていません。';
        }
    }
    buildStockGraph();





});