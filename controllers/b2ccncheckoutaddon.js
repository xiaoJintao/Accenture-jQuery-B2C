var dateAndTime = new Array();
var dateAndTimeArr = new Array();
var dateArr = new Array();
var ids = new Array();
var dateTime="";
var timeSlotName;
var title;
var alerttext;
var today;
var sunday;
var monday;
var tuesday;
var wednesday;
var thursday;
var friday;
var saturday;
var timeline
var optional;
var selected;
var flag;
var newtime;


function setmessage(alert1, today1, sunday1, monday1, tuesday1, wednesday1, thursday1, friday1, saturday1, timeline1, optional1, selected1) {
	alerttext = alert1;
	today = today1;
	sunday = sunday1;
	monday = monday1;
	tuesday = tuesday1;
	wednesday = wednesday1;
	thursday = thursday1;
	friday = friday1;
	saturday = saturday1;
	timeline = timeline1;
	optional = optional1;
	selected = selected1;
}

function getWeek(riqi) {
	var week;
	var arys1 = new Array();
	
	arys1 = riqi.split('-'); // 日期为输入日期，格式为 2013-3-10
	var ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
	
	if (ssdate.getDay() == 0)
		week = sunday
	if (ssdate.getDay() == 1)
		week = monday
	if (ssdate.getDay() == 2)
		week = tuesday
	if (ssdate.getDay() == 3)
		week = wednesday
	if (ssdate.getDay() == 4)
		week = thursday
	if (ssdate.getDay() == 5)
		week = friday
	if(ssdate.getDay()==6) 
		week = saturday
	
	return week;
}

function getDate(i) {
	var newDate = new Date();
	newDate = newDate.valueOf();
	newDate = newDate + i * 24 * 60 * 60 * 1000;
	newDate = new Date(newDate);
	var vYear = newDate.getFullYear();
	var vMon = newDate.getMonth() + 1;
	var vDay = newDate.getDate();
	var date = vYear+ "-" + (vMon<10 ? "0" + vMon : vMon) + "-" + (vDay<10 ? "0"+ vDay : vDay);
	return date;
}

function change(className) {
	$("."+className).addClass("std");
}

function changeCursor(className) {
	$("."+className).addClass("cursor");
}

function getTime(tr) {
	return $('#' + tr).children('td').eq(0).html();
}

function getDateAndTime(id) {

	dateAndTime = id.split('-');
	
	var time = getTime(dateAndTime[0]);
	
	var tdindex = dateAndTime[1].substring(3,2);
	
	var tdtext = $('#tr1').children('td').eq(tdindex).html();
	
	dateArr = tdtext.split(' ');
	
	var dateAndTimes = dateArr[0] + ",  " + time;
	
	return dateAndTimes;
}

function getIdByDateTime(newdatetime, timearr) {
	var times = newdatetime.split(",");
	var trindex;
	var tdindex;
	for(var i=2; i<8; i++) {
		if($('#tr1').children('td').eq(i).html().indexOf(times[0].trim()) >= 0) {
			tdindex = i;
    	}
	}
	
	$("#tab").find("tr").each(function(){
		var tds = $(this).children();
		var time = times[1].trim().replace('&nbsp;&nbsp;','');
		if(time.trim() == tds.eq(0).text().trim()) {
			trindex = $(this).index() + 1;
		}
	})
	ids.length = 0;
	ids.push("tr" + trindex + "-" + "td" + tdindex);
	return "tr" + trindex + "-" + "td" + tdindex;
}


//判断访问设备
function is_pc() {
	var isMobile = {
		    Android: function() {
		        return navigator.userAgent.match(/Android/i) ? true: false;
		    },
		    BlackBerry: function() {
		        return navigator.userAgent.match(/BlackBerry/i) ? true: false;
		    },
		    iOS: function() {
		        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true: false;
		    },
		    Windows: function() {
		        return navigator.userAgent.match(/IEMobile/i) ? true: false;
		    },
		    any: function() {
		        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
		    }
		};
		
	if (isMobile.any()){ 
		//true 为手机
	    return true;
	}
	else {
		return false;
	}
}


function choseDate(id, className) {
	
	ids.push(id);
	
	if(ids.length == 2) {
		$("#" + ids[0]).html(optional);
		$("#" + ids[0]).removeClass();
		$("#" + ids[0]).css({color:"#7abd54"})
		$("#" + ids[0]).addClass("cursor");
		ids.splice($.inArray(ids[0],ids),1);
	}
	
	if(className == 'cursor') {
		$("#" + id).html(selected);
		$("#" + id).css({color:"white"});
		$("#" + id).addClass("chosedtd");
	}
	else {
		$("#" + id).html(optional);
		$("#" + id).removeClass();
		$("#" + id).css({color:"#7abd54"})
		$("#" + id).addClass("cursor");
		ids = [];
	}
	
	// 根据id获取选择的日期及时间段
	if(ids.length == 0) {
		dateTime = "";
	}
	else {
		dateTime = getDateAndTime(ids[0]);
	}
}


function doEditDateTime(date, time, timeSlotName1) {

	if(is_pc()) {
		$("#tagdiv1").width('220px');
		$("#tagdiv2").width('220px');
		heightauto = $(window).height() * 0.85;
		widthauto = $(window).width() * 0.85;
	}
	else {
		heightauto = '417';
		widthauto = '716';
	}
	
	timeSlotName = timeSlotName1;
	
	var a = new Array();//定义一个数组
	
	$("#tab").empty();
	
	$("#tab").append("<tr id='tr1' class='tr1'></tr>");
	
	// append title
	$("#tr1").append("<td style='width:auto;'>"+timeline+"</td>");
	// append today.
	today = getDate(0) + " " + today;
	
	$("#tr1").append("<td style='width:auto;'>"+today+"</td>");
	
	for(var i=1; i<7; i++) {
		var week = getDate(i) + " " + getWeek(getDate(i)); 
		$("#tr1").append("<td style='width:auto;'>"+week+"</td>");
	}
	
	var timearr = time.slice(1,time.length-1).split(",");
	
	var datearr = date.slice(1,date.length-1).split(",");
	
	// append date
	$.each(timearr,function(n,value) {
		
		var tr = "tr" + (n + 2);
		
		$("#" + tr).empty();
		
		$("#tab").append("<tr class='trapp' id="+ tr +"></td>");
        var td = "";
        td = "<td style='width:auto;'>"+timearr[n]+"</td>";
        $("#" + tr).append(td);
        
        // append td
        $("#" + tr).append("<td style='width:auto;' class='std' onmouseover='change(this.className)'></td>");
        
        
        for(var j=2; j<8; j++) {
        	var id = tr + "-" + "td" + j;
    		$("#" + tr).append("<td style='width:auto;' class='cursor' onclick='choseDate(this.id, this.className);' onmouseover='changeCursor(this.className);' id="+id+"><font color='#7abd54'>"+optional+"</font></td>");
        }
        
        // 遍历禁止送货日期
        if(date != "[]") {
        	$.each(datearr,function(n,value) {
    			for(var i=2; i<8; i++) {
    				if($('#tr1').children('td').eq(i).html().indexOf(datearr[n].trim()) >= 0) {
    					a.push(i);
                	}
        		}
            });
        }

        $.each(getArray(a),function(n,value) {
        	 var id = tr + "-" + "td" + value;
        	 $("#" + id).removeClass();
        	 $("#" + id).removeAttr("onclick");
        	 $("#" + id).removeAttr("onmouseover");
        	 $("#" + id).addClass("std");
        	 $("#" + id).html("");
        });
        
        
	});
	
	if(newtime != null) {
		$("#" + getIdByDateTime(newtime.trim(), timearr)).html(selected);
		$("#" + getIdByDateTime(newtime.trim(), timearr)).css({color:"white"});
		$("#" + getIdByDateTime(newtime.trim(), timearr)).addClass("chosedtd");
		dateTime = newtime;
	}
	
	
	 $("#dialogdiv").dialog({
		  resizable: true,
		  height: heightauto,
		  width: widthauto,
		  modal: true,
		  close:function() {
			  if(dateTime == "") {
					// 显示选择按钮
				    $("#dttext").empty();
				    $("#dta").addClass("hdta");
	    	 		$("#dtac").removeClass();
				 }
	    	 	 else {
	    	 		
	    	 		if(flag == 1 || flag == undefined) {
	    	 			 $("#" + ids[0]).html(optional);
		    	 		 $("#" + ids[0]).removeClass();
		    	 		 $("#" + ids[0]).css({color:"#7abd54"})
		    			 $("#" + ids[0]).addClass("cursor");
	    	 		 }
	    	 		 if($("#dta").attr("class")== "hdta") {
	    	 			dateTime == "";
	    	 			$("#dtac").removeClass();
	    	 		 }
	    	 	 }
		  }
	 });
}


function getArray(a) {
	
	var hash = {}, len = a.length, result = [];

	for (var i = 0; i < len; i++) {
		if (!hash[a[i]]) {
			hash[a[i]] = true;
			result.push(a[i]);
		}
	}
	return result;
}


function submitDateAndTime(contextPath) {
	if(dateTime == "") {
		alert(alerttext);
		return false;
	}
	else {
		var dtarr = new Array();
		dtarr = dateTime.trim().split(",");
		$.ajax({
			  type : "GET",
			  url : contextPath + '/checkout/multi/select-delivery-timeslot-ajax',
			  data:{'timeslot':timeSlotName, 'deliveryDate':dtarr[0], 'deliveryTime':dtarr[1]},
			  success : function(data) {
				  flag = 0;
				  $("#dialogdiv").dialog("destroy");
				  $("#dta").removeClass();
				  $("#dttext").empty();
				  $("#dttext").append(dateTime);
				  $("#dtac").addClass("hdtac");
			  }
		});
	}
}

function showdialog(flag1) {
	
	if(is_pc()) {
		$("#tagdiv1").width('220px');
		$("#tagdiv2").width('220px');
		heightauto = $(window).height() * 0.85;
		widthauto = $(window).width() * 0.85;
	}
	else {
		heightauto = '417';
		widthauto = '716';
	}
	
	flag = flag1;
	$("#dialogdiv").dialog({
		  resizable: true,
		  height: heightauto,
		  width: widthauto,
		  modal: true,
		  close:function() {
			  if(dateTime == "") {
					// 显示选择按钮
	    	 		$("#dtac").removeClass();
				 }
	    	 	 else {
	    	 		 if(flag == 1) {
	    	 			 $("#" + ids[0]).html(optional);
		    	 		 $("#" + ids[0]).removeClass();
		    	 		 $("#" + ids[0]).css({color:"#7abd54"})
		    			 $("#" + ids[0]).addClass("cursor");
	    	 		 }
	    	 		
	    	 		 if($("#dta").attr("class")== "hdta") {
	    	 			dateTime == "";
	    	 			$("#dtac").removeClass();
	    	 		 }
	    	 	 }
		  }
	 });
}

function submitform() {
	if(timeSlotName == 'CUSTOMIZED_MODE') {
		if($("#dta").attr("class")== "hdta") {
			alert(alerttext);
		 }
		else {
			$("#placeOrderForm1").submit();
		}
	}
	else {
		$("#placeOrderForm1").submit();
	}
}