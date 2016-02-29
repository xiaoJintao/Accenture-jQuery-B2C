
jQuery(document).ready(function($){
//	alert("sdf")
	var navRight = $('.nav-right');
	var title = $('.gb-banner-title');
	var titleItem = $('.title-item');
	var dropBtn = $('.dropBtn');
	var dropmenu = $('.dropmenu');
	var cameraIcon = $('.cameraIcon');
	$(".main-menu-right-bottom .yCmsComponent").css("position","initial");
	$(".main-menu-right-bottom .yCmsComponent").eq(0).find("li").addClass("selected").end().find(".menu-right-bottom-con").show();
	$(".gb-main-wrap .mod:not(:first)").hide();
	
	$(".main-menu-right-bottom .menu-right-bottom-title").eq(1).css({"left":"33.31%","top":"1"});
	$(".main-menu-right-bottom .menu-right-bottom-title").eq(2).css({"left":"66.62%","top":"2"});
	$(".main-menu-right-bottom .yCmsComponent .mod").eq(1).css({"margin-top":"58px"});
	$(".main-menu-right-bottom .yCmsComponent .mod").eq(2).css({"margin-top":"57px"});
	var oWidth = $(window).width();
	if(oWidth<=1014){
		oResizeAfter();
		oResize();
	}else{
		oResizeBefore();
		oResize();
	}
	indexDropmenu();
	menuFix();
	mainrightFix();
	headerClick();
	function indexDropmenu(){
		$(".dropmenu-right-btn").each(function(i){
			$(this).css("top",(60*i+20)+"px");
		});
	}
	function oResizeAfter(){
		navRight.css("font-size","1.2rem");
		title.css("font-size","1.4rem");
		dropBtn.css("right","0");
		dropmenu.css("font-size","1.2rem");
		cameraIcon.css("font-size","1.6rem");
		titleItem.each(function(i){
			titleItem.css("padding","0 1%");
		})
	}
	function oResizeBefore(){
		navRight.css("font-size","");
		title.css("font-size","");
		dropBtn.css("right","");
		dropmenu.css("font-size","");
		cameraIcon.css("font-size","");
		titleItem.each(function(i){
			titleItem.css("padding","");
		});
	}
	function oResize() {
		$(window).resize(function(){
			oWidth = $(window).width();
			if(oWidth<=1014){
				oResizeAfter();
			}else{
				oResizeBefore();
			}
			indexDropmenu();
		});
	}

	function headerClick() {
		$(".header-small-right").click(function(){
			$(".header-small-click").toggle();
			$(".header-wrapper-triangle").toggle();
		});
	}
	//滚动条滚动 
	function menuFix(){
		$(window).scroll(function(){
			if($(".gb-banner").length>0){
				var headerTop= $(".gb-banner").position().top - $(".gb-banner-title").outerHeight();
				var getScrollTop = $(document).scrollTop();
				if(getScrollTop>headerTop){
					$(".gb-banner-title").css("position","fixed");
					$(".title-item-add").show();
					$(".title-ul .title-item:eq(0)").hide();
				}else{
					$(".gb-banner-title").css("position","");
					$(".title-item-add").hide();
					$(".title-ul .title-item:eq(0)").show();

				}
				/*if(getScrollTop > 800){
					$(".special-small-footer").css("position","fixed");
				}else {
					$(".special-small-footer").css("position","relative");
				}*/
			}
			
			// alert(headerTop)
		});
	}
	function mainrightFix(){
		if($(".gb-main-wrap .main-menu-right").length > 0){
			var mainTop= $(".gb-main-wrap .main-menu-right").offset().top+$(".gb-main-wrap .main-menu-right-top").outerHeight(true)-75;			
			var getscrollTop = $(document).scrollTop();
			var mainHeight=$(document).height()-$(".index-footer").height()-$(".gb-main-wrap .main-menu-right-bottom").height()-80;
			var menuLeftWidth = $(".gb-main-wrap .main-menu-left").outerWidth(true);

			// alert(getscrollTop);
			if(getscrollTop>mainHeight){
				// alert("afdsfg")
				$(".gb-main-wrap .main-menu-right-bottom").css("position","absolute");
				$(".gb-main-wrap .main-menu-right-bottom").css("left",menuLeftWidth);
				$(".gb-main-wrap .main-menu-right-bottom").css("bottom",24);
				$(".gb-main-wrap .main-menu-right-bottom").css("top","");
				$(".gb-main-wrap .main-menu-right-bottom").css("width","35.11%");
			}else if(getscrollTop>mainTop){
				$(".gb-main-wrap .main-menu-right-bottom").css("position","fixed");
				$(".gb-main-wrap .main-menu-right-bottom").css("left","");
				$(".gb-main-wrap .main-menu-right-bottom").css("bottom","");
				$(".gb-main-wrap .main-menu-right-bottom").css("top",75);
				$(".gb-main-wrap .main-menu-right-bottom").css("width","33.1%");
				$(".gb-main-wrap .main-menu-right-top").css("margin-bottom",$(".gb-main-wrap .main-menu-right-bottom").outerHeight(true)+"px");
			}
			else{
				// alert("dsgfsdfg")
				$(".gb-main-wrap .main-menu-right-bottom").css("position","");
				$(".gb-main-wrap .main-menu-right-bottom").css("left","");
				$(".gb-main-wrap .main-menu-right-bottom").css("bottom","");
				$(".gb-main-wrap .main-menu-right-bottom").css("top","");
				$(".gb-main-wrap .main-menu-right-bottom").css("width","100%");
				$(".gb-main-wrap .main-menu-right-top").css("margin-bottom","");
			}
		}
			
			
		}
	$(window).scroll(function(){
		mainrightFix();
	});
function count(date, obj,i){
		date = date.replace(/-/g,'/'); //转换日期格式
		var endTime = new Date(date);
		var timer = null;
		var time = null;
		var now = new Date();
		// alert(endTime)
		if(now - endTime <= 0){
			time = countTime(now, endTime,i);
			// alert(time.day)
			// alert(time.hour)
			if(obj.className == "menu-item-count"){
				$(".menu-item-days").eq(i).html(time.day);
				obj.innerHTML = time.hour +":"+ time.minutes+":"+time.second;
			}
			if(obj.className == "banner-bottom-count"){

				$(".banner-bottom-days").eq(i).html(time.day);
				$(".banner-bottom-hours").eq(i).html(time.hour);
				$(".banner-bottom-mins").eq(i).html(time.minutes);
				$(".banner-bottom-seconds").eq(i).html(time.second);
			}
			if(obj.className == "gb-small-menu-item-time"){
				$(".gb-small-menu-item-days").eq(i).html(time.day);
				$(".gb-small-menu-item-count").eq(i).html ( time.hour +":"+ time.minutes+":"+time.second);
			}

		}
		else {
			obj.innerHTML ="活动已结束!";
			clearInterval(timer);
		}
		// alert(endTime)
		timer = setInterval(function(){
			now = new Date();
			if(now - endTime <= 0){
				time = countTime(now, endTime,i);
				if(obj.className == "menu-item-count"){
					$(".menu-item-days").eq(i).html(time.day);
					obj.innerHTML = time.hour +":"+ time.minutes+":"+time.second;
				}
				if(obj.className == "banner-bottom-count"){

					$(".banner-bottom-days").eq(i).html(time.day);
					$(".banner-bottom-hours").eq(i).html(time.hour);
					$(".banner-bottom-mins").eq(i).html(time.minutes);
					$(".banner-bottom-seconds").eq(i).html(time.second);
				}
				if(obj.className == "gb-small-menu-item-time"){
					$(".gb-small-menu-item-days").eq(i).html(time.day);
					$(".gb-small-menu-item-count").eq(i).html( time.hour +":"+ time.minutes+":"+time.second);
				}
				
			}
			else {
				obj.innerHTML ="活动已结束!";
				clearInterval(timer);
			}

		},1000);
	}
	function countTime(now, endTime,i){
		var time = {
			year : 0,
			month : 0,
			day : 0,
			hour : 0,
			minutes : 0,
			second : 0};
		// alert(time.year);
		var leftSecond = (endTime.getTime() - now.getTime())/1000;
		time.year = Math.floor(leftSecond/(60 * 60 * 24 * 30 * 12));
		leftSecond -= time.year * 60 * 60 * 24 * 30 * 12;
		time.month = Math.floor(leftSecond/(60 * 60 * 24 * 30));
		leftSecond -= time.month * 60 * 60 * 24 * 30;
		time.day = Math.floor(leftSecond/(60 * 60 * 24));
		leftSecond -= time.day * 60 * 60 * 24;
		time.hour = formatNum(Math.floor(leftSecond/(60 * 60)));
		leftSecond -= time.hour * 60 * 60;
		time.minutes = formatNum(Math.floor(leftSecond/60));
		leftSecond -= time.minutes * 60;
		time.second = formatNum(Math.floor(leftSecond));
		leftSecond -= time.second * 60;
		// var millisecond = 
		// $(".menu-item-days").eq(i).html(day);
		// $(".banner-bottom-hours").eq(i).html(hour);
		// $(".banner-bottom-mins").eq(i).html(minutes);
		// $(".banner-bottom-seconds").eq(i).html(second);
		// return hour + ":" + minutes + ":" + second;
		return time;
	}
	//时间格式
	function formatNum(num){
		if(num < 10)
			num = '0' + num;
		else
			num = num;
		return num;
	}
	// 计算倒计时函数结束

	var HotEndTime = [	   //倒计时结束时间
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"},
	{"endTime": "2016/2/29 13:59:59"}];
	
	
//Tab content

 var titles =$('#menu-right-bottom-title li'),
	// divs=$('#menu-right-bottom-con')[0].getElementsByTagName('div');
	divs=$(".gb-main-wrap .mod");
	
	if(titles.length!=divs.length)
		return;
	for(var i=0;i<titles.length;i++){
		titles[i].id=i;
		titles[i].onmouseover=function(){
			for(var j=0;j<titles.length;j++){
				titles[j].className='';
				divs[j].style.display='none';
			}
			
			this.className='selected';
			divs[this.id].style.display='block';
		}
	}
	
	
	
	
	
// 调用倒计时函数
$(".menu-item-count").each(function (i) {
	count(HotEndTime[i].endTime, this,i);
});
$(".banner-bottom-count").each(function (i) {
	count(HotEndTime[i].endTime, this,i);
});
$(".gb-small-menu-item-time").each(function (i) {
	count(HotEndTime[i].endTime, this,i);
});
 // alert($(".gb-small-menu-item-days").length)

	// $(".mod li").click(function(){
	// $(".mod-drop:eq(0)").show();	
	// 	$(this).addClass("current").next("div.mod-drop").slideToggle(300).siblings("div.mod-drop").slideUp("slow");
	// 	$(this).siblings().removeClass("current");
	// });
/*var droptitles=$('.mod li'),
dropitems=$('.mod-drop');

if(droptitles.length!=dropitems.length)
	return;
for(var i=0;i<droptitles.length;i++){
	droptitles[i].id=i;
	droptitles[i].onmouseenter =function(){
		for(var j=0;j<droptitles.length;j++){

			$(dropitems[j]).slideUp(300);
		}
		$(dropitems[this.id]). slideDown();
				// $(dropitems[this.id]).find(".mod-drop-img").show(1000);
			}
		}*/
	// scrollImg();

	/*function scrollImg(){
		$(".main_visual").hover(function(){
			$("#btn_prev,#btn_next").fadeIn()
		},function(){
			$("#btn_prev,#btn_next").fadeOut()
		});
		$(".flicking_spot span").click(function(){
			$(".flicking_con span:eq("+$(this).index()+")").click();
		});
		$dragBln = false;

		$(".main_image").touchSlider({
			flexible : true,
			speed : 200,
			btn_prev : $("#btn_prev"),
			btn_next : $("#btn_next"),
			paging : $(".flicking_con span"),
			counter : function (e){

				$(".flicking_con span").removeClass("on").eq(e.current-1).addClass("on");
			// alert("safd")
			$(".flicking_spot span").removeClass("on").eq(e.current-1).addClass("on");
			}
		});

		$(".main_image").bind("mousedown", function() {
			$dragBln = false;
		});

		$(".main_image").bind("dragstart", function() {
			$dragBln = true;
		});

		$(".main_image a").click(function(){
			if($dragBln) {
				return false;
			}
		});

		timer = setInterval(function(){
			$("#btn_next").click();
		}, 5000);

		$(".main_visual").hover(function(){
			clearInterval(timer);
		},function(){
			timer = setInterval(function(){
				$("#btn_next").click();
			},5000);
		});

		$(".main_image").bind("touchstart",function(){
			clearInterval(timer);
		}).bind("touchend", function(){
			timer = setInterval(function(){
				$("#btn_next").click();
			}, 5000);
		});
	}*/

	
		/*$(".menu-right-bottom-con .mod").width(($(".menu-right-bottom-title ul").outerWidth(true))-4);
console.log($(".menu-right-bottom-title li").width())

$(window).resize(function(){
	$(".menu-right-bottom-con .mod").width(($(".menu-right-bottom-title ul").outerWidth(true))-4);
		// $(".menu-right-bottom-con mod").width(($(".main-menu-right-title li").width()+2)*3);
	});*/
$(".gb-small-main-menu-item:nth-child(2n+1)").css("margin-right","1%");
$(window).resize(function(){
	$(".gb-small-main-menu-item:nth-child(2n+1)").css("margin-right","1%");

})
});


