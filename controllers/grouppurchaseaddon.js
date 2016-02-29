/* CHINAACC:NEWFILE */

$(function(){
	$('.tab .navi li').mouseover(function(){
		var selectorName,index;
		selectorName = $(this).parent().parent().attr('class').split(' tab')[0];
		index = $('.' + selectorName +' .navi li').index(this);
		$('.' + selectorName +' .tabInner li').eq(index).show().siblings().hide();
		$('.' + selectorName +' .navi li').eq(index).addClass('on').siblings().removeClass('on');
		$('.' + selectorName +' .tabInner li').eq(index).find('img.lazy').lazyload();
	});
	
	
	/* add for word limit  begin */
	var maxLen = 18;
	$('.productName').each(function() {
		$(this).find('a').html(cutstr($(this).find('a').html(), maxLen));
	});
	function cutstr(str,len){  
		var str_length = 0;  
		var str_len = 0;  
		str_cut = new String();  
		str_len = str.length;  
		for(var i = 0; i < str_len; i++){  
			a = str.charAt(i);  
			str_length++;  
			if(escape(a).length > 4){  
				//ï¿½ï¿½ï¿½ï¿½ï¿½Ö·ï¿½Ä³ï¿½ï¿½È¾ï¿½ï¿½ï¿½ï¿½ï¿½Ö®ï¿½ï¿½ï¿½ï¿½ï¿½4  
				str_length++;  
			}  
			str_cut = str_cut.concat(a);  
			if(str_length>=len){  
				str_cut = str_cut.concat("...");  
				return str_cut;  
			}  
		}
		if(str_length < len){  
     		return  str;  
		}   
	}
	/* add for limit word end */

});

$(document).ready(function ()
{   
//	alert(grouppurchaseendDate);
	if (typeof(grouppurchaseendDate) =='string' && grouppurchaseendDate != "")
	{   
		var now = new Date(); 
		var endDate = new Date(grouppurchaseendDate);
		var leftTime=endDate.getTime()-now.getTime(); 
		var leftsecond = parseInt(leftTime/1000); 
		var day1=Math.floor(leftsecond/(60*60*24)); 
		var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
		var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
		var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60); 
		$("#day")[0].innerHTML=day1;
		$("#hour")[0].innerHTML=hour;
		$("#minute")[0].innerHTML=minute;
		$("#second")[0].innerHTML=second;				
	}
setInterval ( function(){
if (typeof(grouppurchaseendDate) =='string' && grouppurchaseendDate != "")
	{   
		var now = new Date(); 
		var endDate = new Date(grouppurchaseendDate);
		var leftTime=endDate.getTime()-now.getTime(); 
		var leftsecond = parseInt(leftTime/1000); 
		var day1=Math.floor(leftsecond/(60*60*24)); 
		var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
		var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
		var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60); 
		$("#day")[0].innerHTML=day1;
		$("#hour")[0].innerHTML=hour;
		$("#minute")[0].innerHTML=minute;
		$("#second")[0].innerHTML=second;				
	}

},1000);


	// 计算倒计时函数
    function count(date, obj){
        date = date.replace(/-/g,'/'); //转换日期格式
        var endTime = new Date(date);
        var timer = null;
        var now = new Date();
        if(now - endTime <= 0){
            obj.innerHTML = countTime(now, endTime);
        }
        else {
            obj.innerHTML ="活动已结束!";
            clearInterval(timer);
        }
        timer = setInterval(function(){
            now = new Date();
            if(now - endTime <= 0){
                obj.innerHTML = countTime(now, endTime);
            }
            else {
                // $('#groupBuy-day').html("day");
                $('.show-countdown').html("活动已结束!");
                clearInterval(timer);
            }

        },1000);
    }

    // 计算时间
    function countTime(now, endTime){
        var leftSecond = (endTime.getTime() - now.getTime())/1000;
        var year = Math.floor(leftSecond/(60 * 60 * 24 * 30 * 12));
        leftSecond -= year * 60 * 60 * 24 * 30 * 12;
        var month = Math.floor(leftSecond/(60 * 60 * 24 * 30));
        leftSecond -= month * 60 * 60 * 24 * 30;
        var day = Math.floor(leftSecond/(60 * 60 * 24));
        leftSecond -= day * 60 * 60 * 24;
        var hour = formatNum(Math.floor(leftSecond/(60 * 60)));
        leftSecond -= hour * 60 * 60;
        var minutes = formatNum(Math.floor(leftSecond/60));
        leftSecond -= minutes * 60;
        var second = formatNum(Math.floor(leftSecond));
        leftSecond -= minutes * 60;
        $("#day").html(day);
        $("#hour").html(hour);
        $("#minute").html(minutes);
        $("#second").html(second);
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
    var endTime = "2015/11/27 17:00";
    // 调用倒计时函数
    count(endTime, $('#leftname'));


});
