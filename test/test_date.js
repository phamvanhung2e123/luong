/**
 * Created by hoangnn on 2/27/14.
 */
require("date-utils");
console.log("Today: " + Date.today());
var date = new Date();
console.log(date.toYMD(""));

console.log("D-"+date.getUTCDate()+"M-"+(date.getUTCMonth()+1)+"Y-"+date.getUTCFullYear());