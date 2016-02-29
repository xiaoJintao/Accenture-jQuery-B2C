/* CHINAACC:NEWFILE */

$(function(){	
	$(".tabInner").each(function(){
		$(this).find("li:not(:first)").hide();
	});	
	

	//$(".shareout").find("#addTofavoriteForm").show();

	$(".tabInner").each(function(){
		$(this).find("li:not(:first)").hide();
	});	
	$('.tab .navi li').mouseover(function(){
		var selectorName,index;
		selectorName = $(this).parent().parent().attr('class').split(' tab')[0];
		index = $('.' + selectorName +' .navi li').index(this);
		$('.' + selectorName +' .tabInner li').eq(index).show().siblings().hide();
		$('.' + selectorName +' .navi li').eq(index).addClass('on').siblings().removeClass('on');
		$('.' + selectorName +' .tabInner li').eq(index).find('img.lazy').lazyload();
	});
	
	//phone_menu
	$(".menulist").click(function(){
		$(this).next(".yCmsContentSlot").find(".myLa").toggle();		
	});
	
	//register
	$(".smallHead").find("span:last").hide();
	$(".smallHead").live("click",function(){		
		if($(this).siblings(".userRegister").is(":hidden")){
			$(this).find("span").hide();
			$(this).find("span:last").show();			
			$(this).siblings(".userRegister").show();
		}else{			
			$(this).siblings(".userRegister").hide();
			$(this).find("span").hide();
			$(this).find("span:first").show();
		}
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
				//�����ַ�ĳ��Ⱦ�����֮�����4  
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