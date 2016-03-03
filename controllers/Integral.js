$(function(){
	//轮播图
	var bannerCtrl = $("#bannerCtrl");
    bannerCtrl.html("");
    $("#banner_tabs li").each(function(){
        bannerCtrl.html(bannerCtrl.html() + "<li><a></a></li>");
    });
    $("#bannerCtrl li").eq(0).addClass("active");
    var bannerSlider = new Slider($('#banner_tabs'), {
        time: 4000,
        delay: 1000,
        event: 'hover',
        auto: true,
        mode: 'fade',
        controller: $('#bannerCtrl'),
        activeControllerCls: 'active'
    });

    // 左侧手风琴效果
	$(".reservationLeft .product_list_box_inner ul.listItem:eq(0)").show();
	$(".reservationLeft .product_list_box_inner li.listTitle").click(function(){
		$(this).find("ul.listItem").slideToggle(300).siblings("ul.listItem").slideUp("slow");
	});

	function findMaxWidth(el){
		var maxWidth = 0;
		el.each(function(){
			if($(this).width() >= maxWidth){
				maxWidth = $(this).width();
			}
		});
		return maxWidth + 1;
	}


	// 计算倒计时函数
    function count(date, obj){
//        date = date.replace(/-/g,'/'); //转换日期格式
        var endTime = new Date(date);
        var timer = null;
        var now = new Date();
        if(now - endTime <= 0){
			$(obj).find(".day").html(countTime(now, endTime).day);
			$(obj).find(".hour").html(countTime(now, endTime).hour);
			$(obj).find(".minute").html(countTime(now, endTime).minutes);
        }
        else {
            $(obj).html("活动已结束!");
            clearInterval(timer);
        }
        timer = setInterval(function(){
            now = new Date();
            if(now - endTime <= 0){
            	$(obj).find(".day").html(countTime(now, endTime).day);
    			$(obj).find(".hour").html(countTime(now, endTime).hour);
    			$(obj).find(".minute").html(countTime(now, endTime).minutes);
            }
            else {
                $(obj).html("活动已结束!");
                clearInterval(timer);
            }

        },1000);
    }

    // 计算时间
    function countTime(now, endTime){
    	var Time = {
    		year: 0,
    		month: 0,
    		day: 0,
    		hour: 0,
    		minutes: 0,
    		second: 0
    	};
        var leftSecond = (endTime.getTime() - now.getTime())/1000;
        Time.year = Math.floor(leftSecond/(60 * 60 * 24 * 30 * 12));
        leftSecond -= Time.year * 60 * 60 * 24 * 30 * 12;
        Time.month = Math.floor(leftSecond/(60 * 60 * 24 * 30));
        leftSecond -= Time.month * 60 * 60 * 24 * 30;
        Time.day = Math.floor(leftSecond/(60 * 60 * 24));
        leftSecond -= Time.day * 60 * 60 * 24;
        Time.hour = formatNum(Math.floor(leftSecond/(60 * 60)));
        leftSecond -= Time.hour * 60 * 60;
        Time.minutes = formatNum(Math.floor(leftSecond/60));
        leftSecond -= Time.minutes * 60;
        Time.second = formatNum(Math.floor(leftSecond));
        leftSecond -= Time.minutes * 60;
        return Time;

    }

    //时间格式
    function formatNum(num){
        if(num < 10)
            num = '0' + num;
        else
            num = num;
        return num;
    }

    

    $(".countdown p").each(function (i) {
    	var newDate = new Date($(".firstPayEnd").eq(i).val());
    	var dateFormat = newDate.getFullYear() + "/" + (newDate.getMonth()+ 1 ) + "/" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes();
    	count(dateFormat, this);
    });
	
    //preOrder percentage
	$(".reservationMain .main-right-part-2 ul li").each(function(){
		var stockAmount = parseInt($(this).find(".preorderStockAmount").val());
		var preOrderAmount = parseInt($(this).find(".have-bought .buyers").html());
		var progressBarValue = preOrderAmount/stockAmount * 100 + "%";
		$(this).find(".have-bought-progressBar").css("width",progressBarValue);
	})
	
});