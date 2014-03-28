$(function() {

	$(document).ready(function() {

		var rqdataUrl = 'http://ec2-54-251-23-25.ap-southeast-1.compute.amazonaws.com/';//Define URL for make

		// define the options
		function configureChart(title, col_name, date_length) {
			options = {
				chart : {
					renderTo : 'container'
				},

				title : {
					text : title
				},

				subtitle : {
					text : 'Source: ベトカメ'
				},

				xAxis : {
					type : 'datetime',
					tickInterval : date_length * 24 * 3600 * 1000, // one week
					tickWidth : 0,
					gridLineWidth : 1,
					labels : {
						align : 'left',
						x : 3,
						y : -3
					}
				},

				yAxis : [{// left y axis
					title : {
						text : null
					},
					labels : {
						align : 'left',
						x : 3,
						y : 16,
						formatter : function() {
							return Highcharts.numberFormat(this.value, 0);
						}
					},
					showFirstLabel : false
				}, {// right y axis
					linkedTo : 0,
					gridLineWidth : 0,
					opposite : true,
					title : {
						text : null
					},
					labels : {
						align : 'right',
						x : -3,
						y : 16,
						formatter : function() {
							return Highcharts.numberFormat(this.value, 0);
						}
					},
					showFirstLabel : false
				}],

				legend : {
					align : 'left',
					verticalAlign : 'top',
					y : 20,
					floating : true,
					borderWidth : 0
				},

				tooltip : {
					shared : true,
					crosshairs : true
				},

				plotOptions : {
					series : {
						cursor : 'pointer',
						point : {
							events : {
								click : function() {
									hs.htmlExpand(null, {
										pageOrigin : {
											x : this.pageX,
											y : this.pageY
										},
										headingText : this.series.name,
										maincontentText : Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' + this.y + ' visits',
										width : 200
									});
								}
							}
						},
						marker : {
							lineWidth : 1
						}
					}
				},

				series : [{
					name : col_name[1],
					lineWidth : 4,
					marker : {
						radius : 4
					}
				}, {
					name : col_name[2]
				}]
			};
			return options;
		}
		/*
			Config for hourly chart
		*/
		function configureChartForHour(title, col_name, date_length){
			var xaxis = new Object();
			var list = new Array();
			var options = configureChart(title, col_name, date_length);
			for(var i=0; i<=23; i++){
				list.push(i+'時');
			}	
			xaxis.categories=list;
			options.xAxis=xaxis;
			return options;
		}
		
		/**
		 * create Analytics
		 *
		 * @param string url json request url
		 */
		function createAnalytics(url) {
			$.ajax({
				url : url,
				dataType : 'json',
				success : function(result) {
					var allVisits = [];
					var newVisits = [];
					var col_name = result.col_name;
					var title = result.title;
					var outCsv;
					var data = result.data;
					//var header = Object.keys(data);
					var chart;
					var start_date;
					var end_date;
					var options;
					/**
					 *@TODO :Make chart for KPI
					 */
					var header = [];
					for (var key in data[0]) {
						header.push(key);
					}
					
					var date_length = parseInt(data.length / 10) + 1;
					date_length= result.distance * date_length; 
					if(result.type == 2){// Line chart but Xaxis is hour
						options= configureChartForHour(title, col_name, date_length);
						options.series = getSeriesDataForHour(data, header, col_name);
					}else if(result.type==1){// Bar char
						options = configureChart(title, col_name, date_length);
						options = getOptionsForBarChar(data, header, col_name,title,options);
					}else if(result.type==0){// Line chart xaxis is time
						options = configureChart(title, col_name, date_length);
						options.series = getSeriesData(data, header, col_name);
					}
					chart = new Highcharts.Chart(options);//Make chart
					/*
					 Make CSV download link
					 */
					outCsv = getCsvFromJson(data, header);
					$("a#myCsv").attr("download", "table.csv");
					$("a#myCsv").attr("href", "data:text/csv;base64," + btoa(outCsv));
					/*
					 Make sorted table
					 */
					res = makeTableView(data, header, col_name);//user google libarary
					google.setOnLoadCallback(drawTable(res));
					//alertBox(result);
				}
			});
		}

		//function makeTable
		/**
		 * @TODO Make table view data for google table api
		 * @param: data, header, col_name
		 * @return: res 
		 * 			result
		 * 			col_name 
		 */
		 
		
		function makeTableView(data, header, col_name) {
			var rows = new Array();
			var n = header.length;
			var result = new Array();
			var res = new Object();// Return data
			$.each(data, function(index, value) {
				rows = new Array();
				for (var i = 0; i < n; i++) {
					name = header[i];
					if (name == 'date') {
						rows.push(formatDateToCsv(value.date));
					} else {
						rows.push(parseResult(value[name]));
					}
				}
				result.push(rows);
			})
			res.result = result;
			res.col_name = col_name;
			return res;

		}

		/**
		 *  Get CSV data from Json file
		 * @param: data, header
		 * @return: csv file
		 */
		
		function getCsvFromJson(data, header) {
			var rows;
			var n = header.length;
			var result = Array();
			for (var i = 0; i < n; i++) {
				result.push(header[i]);
			}
			$.each(data, function(index, value) {
				name = header[0];
				if (name == 'date') {
					result.push('\n' + formatDateToCsv(value.date));
				} else {
					result.push('\n' + parseResult(value[name]));
				}
				for (var i = 1; i < n; i++) {
					name = header[i];
					result.push(parseResult(value[name]));
				}

			})
			return result;
		}
		/**
		 * @todo: format int or float value to float or int with 2 decimal (like that 12.23)
		 */
		function parseResult(input){
			var temp = input*100;
			var temp1= parseInt(temp);
			return temp1/100;	
		}
		/*
		 For date CSV data
		 */
		function formatDateToCsv(date) {
			var new_date = new Date(date + ' UTC');
			var month = new_date.getUTCMonth() + 1;
			var res = new_date.getUTCFullYear() + '-' + month + '-' + new_date.getUTCDate();
			return res;
		}

		/**
		 * Get Series data for making line chart
		 */
		function getSeriesData(data, header, col_name) {
			var header_name;
			var series = new Array();
			for (var i = 1; i < header.length; i++) {
				header_name = header[i];
				var rows = new Array();
				for (var j in data) {
					value = data[j];
					//date=value.date;
					var date = Date.parse(value.date + ' UTC');
					var data_in_row = parseResult(value[header_name]);
					rows.push([date, data_in_row]);
				}
				series.push(rows);
			}
			var seriesOption = new Array();
			for (var i = 0; i < header.length - 1; i++) {//日程いらない
				var seriesObject = new Object();
				seriesObject.lineWidth = 4;
				seriesObject.name = col_name[i + 1];
				seriesObject.data = series[i];
				seriesOption.push(seriesObject);
			}
			return seriesOption;
		}
		/**
		 * Get series data for make line chart with Xaxis is hour 
		 */
		function getSeriesDataForHour(data, header, col_name) {
			var rows = new Array();
			for (var j in data) {
					value = data[j];
					//date=value.date
					var data_in_row = parseResult(value.active_user);
					rows.push(data_in_row);
			}
			var seriesOption = new Array();
			var seriesObject = new Object();
			
			seriesObject.lineWidth = 4;
			seriesObject.name = "Active hourly user";
			seriesObject.data = rows;
			seriesOption.push(seriesObject);
			return seriesOption;
		}
		/**
		 * Get options for bar chart
		 */
		function getOptionsForBarChar(data, header, col_name,title,options) {
			options.chart.type = 'column';
			var list_id = new Array();
			var list_number = new Array();
			for (var j in data) {
					value = data[j];
					//date=value.date
					var id = parseResult(value.id);
					var number = parseResult(value.number);
					list_id.push(id);
					list_number.push(number);
			}
			options.xAxis = new Object();
			options.xAxis.categories = list_id;
			var seriesOption = new Array();
			var seriesObject = new Object();
			var plotOptions = {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
           };
            options.plotOptions =plotOptions;
			seriesObject.name = title;
			seriesObject.data = list_number;
			seriesOption.push(seriesObject);
			options.series=seriesOption;
			return options;
		}
		/**
		 * Initial data for input value
		 */
		function initial(period) {
			var date = new Date();
			var last_week = new Date(date.getTime() - period * 24 * 3600 * 1000);
			$("#date_datepicker").val(date.getMonth() + 1 + "/"+ date.getDate() +"/"+date.getFullYear());
			$("#end_datepicker").val(date.getMonth() + 1 + "/"+ date.getDate() +"/"+date.getFullYear());		
			$("#start_datepicker").val(last_week.getMonth() + 1 + "/" + last_week.getDate() + "/"+last_week.getFullYear());
		}
		/**
		 * When start loading page the bellow function is worked
		*/
		initial(7);
		var default_url = createAnalyticURL();
		createAnalytics(default_url);
		//Start click event
		$('#start_datepicker').change(function() {
			var url = createAnalyticURL();
			createAnalytics(url);
		});
		$('#end_datepicker').change(function() {
			var url = createAnalyticURL();
			createAnalytics(url);
		});
		$('#date_datepicker').change(function() {
			var url = createAnalyticURL();
			createAnalytics(url);
		});
		
		$('#gacha_id').change(function() {
			var url = createAnalyticURL();
			createAnalytics(url);
			$( "#dialog-modal" ).dialog('close');
		});
		$('.gacha_type_id').change(function() {
			var url = createAnalyticURL();
			createAnalytics(url);
		});
		$("#temp").focus(function() {
			//$("#gacha_id").focus();
  			openDialog();
		});
		function openDialog(){
			$( "#dialog-modal" ).dialog({
            		modal: true,
            		position: 'center',
            		close:function (ev, ui) {
                        $("#temp").val($("#gacha_id").val());
                    },
 					draggable: false,
   					buttons: { "閉める": function() { $(this).dialog("close"); } } 

        	});
		}
		// End click event
		/*
			This is for menu click event
			The rule is : At first, remove class icn_jump_back from menu
			Then, add class icn_jump_back to the menu link which user clicked
			After ward, hide all input form.
			Finally, show the input form that has class name is in class names of click menu
		*/
		$(".toggle .menu").click(function(event) {
			$(".toggle .icn_jump_back").removeClass('icn_jump_back');
			$(this).addClass('icn_jump_back');
			$("#input_form fieldset").hide();
			var class_array = new Array('date','hour','gacha');
			for(var key in class_array){
				if($(".toggle .icn_jump_back").hasClass(class_array[key])){
					$("#input_form ." + class_array[key]).show();
				}
			}
			if($(this).hasClass('gacha') && $('#gacha_id').val()==""){
				openDialog();
			}
			var url = createAnalyticURL();
			createAnalytics(url);
		})
		
		/**
		 * Create URL to get data from server
		 * like that : http://localhost/user?start=9/25/2012&end=10/2/2012&date=10/2/2012&gacha_id=
		 */
		function createAnalyticURL() {
			var url = rqdataUrl + $(".toggle .icn_jump_back").attr('id') + '?';
			url += 'start=' + $('#start_datepicker').val();
			url += '&end=' + $('#end_datepicker').val();
			url += '&date=' + $('#date_datepicker').val();
			url += '&gacha_id=' + $('#gacha_id').val();
			url += '&type_id=' + $('.gacha_type_id').val();
			return url
		}

		//alert("ed");
		//http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css chart.destroy();
	});

});
