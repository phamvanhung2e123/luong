/**
 * Created by hoangnn on 2/27/14.
 */

/**
 * Created by hoangnn on 2/27/14.
 */

/**
 * Created by hoangnn on 2/17/14.
 */
var source = new EventSource('/update');

source.addEventListener('message', function(e) {
    console.log(JSON.parse(e.data));
    console.log("hunefe");
}, false);


