
jQuery(document).ready(function($){
	// 左侧手风琴效果
//	 alert("adfasd")
	$(".integral-main #firstpane .menu_body:eq(0)").show();
	$(".integral-main #firstpane p.menu_head").click(function(){
		$(this).addClass("current").next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
		$(this).siblings().removeClass("current");
	});
	$(".integral-main #secondpane .menu_body:eq(0)").show();
	$(".integral-main #secondpane p.menu_head").mouseover(function(){
		$(this).addClass("current").next("div.menu_body").slideDown(500).siblings("div.menu_body").slideUp("slow");
		$(this).siblings().removeClass("current");
	});
	// 缩放时头部css变化
	var navRight = $('.nav-right');
	var title = $('.banner-title');
	var titleItem = $('.title-item');
	var dropBtn = $('.dropBtn');
	var oWidth = $(window).width();
	// 缩放时左侧手风琴css变化
	var menuHead = $('.integral-main .menu_head');
	var menuBody = $('.integral-main .menu_body a');
	var oWidth = $(window).width();
	if(oWidth<=1100){
		leResizeAfter();
		leResize();
	}else{
		leResizeBefore();
		leResize();
	}
	function leResizeAfter(){
		menuHead.css("width","77%");
		menuHead.css("padding-left","23%");
		menuBody.css("width","80%");
		menuBody.css("padding-left","23%");
	}
	function leResizeBefore(){
		menuHead.css("width","82%");
		menuHead.css("padding-left","18%");
		menuBody.css("width","60%");
		menuBody.css("padding-left","18%");
	}
	function leResize() {
		$(window).resize(function(){
			oWidth = $(window).width();
			if(oWidth<=1100){
				leResizeAfter();
			}else{
				leResizeBefore();
			}
		})
	}
//	alert("sfad")
	// 滚动时头部和手风琴固定
	$(document).scroll(function(){
		// alert(accordionTop)
		var getScrollTop = $(document).scrollTop();
		var dHeight=$(document).height();
		var fHeight=$(".index-footer").height();
		var cHeight=$(".integral-main .main-left").outerHeight(true);
		var oHeight = dHeight-fHeight-cHeight-50;
		//console.log(getScrollTop>oHeight);
		//alert(dHeight-fHeight-cHeight-50);
		if(getScrollTop>oHeight){
			// alert("hello");
			$(".integral-main .main-left").css("position","absolute");
			$(".integral-main .main-left").css("width","17%");
			$(".integral-main .main-left").css("bottom",-22);
			$(".integral-main .main-left").css("top","");
		 	$(".integral-main .main-left").css("left",0);
		 }else if(getScrollTop>230){
		 	$(".integral-main .main-left").css("position","fixed");
		 	$(".integral-main .main-left").css("width","16.15%");
			$(".integral-main .main-left").css("top","55px");
			$(".integral-main .main-left").css("left","2.5%");
			$(".integral-main .main-left").css("bottom","");
		 }
		else{
			// alert("sdfsedg")
			$(".integral-main .main-left").css("position","");
			$(".integral-main .main-left").css("width","17%");
			$(".integral-main .main-left").css("top","");
			$(".integral-main .main-left").css("left","");
			$(".integral-main .main-left").css("bottom","");
		}
	})
	// 轮播图
	// IntegralscrollImgbig();
	// IntegralscrollImgSmall()
	function IntegralscrollImgbig(){
	$(".integral-main .flicking_con").html("");
	$(".integral-main .main_image ul li").each(function(){
		$(".integral-main .flicking_con").html($(".integral-main .flicking_con").html()+"<span></span>");
	});
	$(".integral-main .main_visual").hover(function(){
		$(".integral-main #btn_prev,.integral-main #btn_next").fadeIn()
	},function(){
		$(".integral-main #btn_prev,.integral-main #btn_next").fadeOut()
	});
	
	$dragBln = false;
	
	$(".integral-main .main_image").touchSlider({
		flexible : true,
		speed : 200,
		btn_prev : $(".integral-main #btn_prev"),
		btn_next : $(".integral-main #btn_next"),
		paging : $(".integral-main .flicking_con span"),
		counter : function (e){
			$(".integral-main .flicking_con span").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	$(".integral-main .main_image").bind("mousedown", function() {
		$dragBln = false;
	});
	
	$(".integral-main .main_image").bind("dragstart", function() {
		$dragBln = true;
	});
	
	$(".integral-main .main_image a").click(function(){
		if($dragBln) {
			return false;
		}
	});
	
	timer = setInterval(function(){
		$(".integral-main #btn_next").click();
	}, 5000);
	
	$(".integral-main .main_visual").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(function(){
			$(".integral-main #btn_next").click();
		},5000);
	});
	
	$(".integral-main .main_image").bind("touchstart",function(){
		clearInterval(timer);
	}).bind("touchend", function(){
		timer = setInterval(function(){
			$(".integral-main #btn_next").click();
		}, 5000);
	});
}

function IntegralscrollImgSmall(){
	$(".integral-small-main .flicking_con").html("");
	$(".integral-small-main .main_image ul li").each(function(){
		$(".integral-small-main .flicking_con").html($(".integral-small-main .flicking_con").html()+"<span></span>");
	});
	$(".integral-small-main .main_visual").hover(function(){
		$(".integral-small-main #btn_prev,.integral-main #btn_next").fadeIn()
	},function(){
		$(".integral-small-main #btn_prev,.integral-main #btn_next").fadeOut()
	});
	
	$dragBln = false;
	
	$(".integral-small-main .main_image").touchSlider({
		flexible : true,
		speed : 200,
		btn_prev : $(".integral-small-main #btn_prev"),
		btn_next : $(".integral-small-main #btn_next"),
		paging : $(".integral-small-main .flicking_con span"),
		counter : function (e){
			$(".integral-small-main .flicking_con span").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	$(".integral-small-main .main_image").bind("mousedown", function() {
		$dragBln = false;
	});
	
	$(".integral-small-main .main_image").bind("dragstart", function() {
		$dragBln = true;
	});
	
	$(".integral-small-main .main_image a").click(function(){
		if($dragBln) {
			return false;
		}
	});
	
	timer = setInterval(function(){
		$(".integral-small-main #btn_next").click();
	}, 5000);
	
	$(".integral-small-main .main_visual").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(function(){
			$(".integral-small-main #btn_next").click();
		},5000);
	});
	
	$(".integral-small-main .main_image").bind("touchstart",function(){
		clearInterval(timer);
	}).bind("touchend", function(){
		timer = setInterval(function(){
			$(".integral-small-main #btn_next").click();
		}, 5000);
	});
}
$(".integral-small-main .change .jf").width("");
$(".integral-small-main .change .jf").width($(".integral-small-main .change .jf"));
// alert(findMaxWidth($(".integral-small-main .change .jf")));
function findMaxWidth(el){
		var maxWidth = 0;
		el.each(function(){
			if($(this).width() >= maxWidth){
				maxWidth = $(this).width();
			}
		});
		return maxWidth + 1;
	}
});