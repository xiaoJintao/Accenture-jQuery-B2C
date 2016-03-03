ACC.register = {

	validated: false,
		
	bindSendDynPwdPress: function ()
	{
		$('#b2cCard_capcha').click(function() {  
			changeCapchaImage("b2cCard_capcha", "captchaToken"); 
		});  
		
	},
	
	chectOutCapcha: function ()
	{
	    $("#captcha_from").submit(function(event){  
	        if (ACC.register.validated)  
	           return true;  
	        else {  
	            $( "#span_captcha" ).text( "验证码不正确。" ).show().fadeOut( 3000 );  
	            var timestamp = new Date().getTime();  
	            
	            event.preventDefault();  
	            }  
	        }  
	    );
	    
	    $("#id_input_verification").blur(function() {  
	        $.post(  
	            $("#id_url_check").val(),  
	            {"code": $("#id_input_verification").val()},  
	            function (data) {  
	            	var messaage = eval("("+data+")");
	                if (messaage.status == true){ 
	                	ACC.register.validated = true; 
	                }
	                else{
	                	$( "#span_captcha" ).text( "验证码不正确。" ).show().fadeOut( 3000 );  
	    	            var timestamp = new Date().getTime();  
	    	            event.preventDefault();  
	                }
	            },
	            "json"
	        );  
	    });  
	}
};

function changeCapchaImage(validateImage, token) {
	var imgSrc = $("#" + validateImage);
	var src = imgSrc.attr("src");
	var newsrc = resetCapchaURL(src, token);
	imgSrc.attr("src", newsrc);
}

function resetCapchaURL(oldurl, token) {
	var timestamp = (new Date()).valueOf();
	var newurl = "";
	if(oldurl.indexOf("?") > 0) {
	    newurl = oldurl.substring(0, oldurl.indexOf("?"));
	}
	if ((newurl.indexOf("&") >= 0)) {
		newurl = newurl + "&timestamp=" + timestamp + "&token=" + token;
	} else {
		newurl = newurl + "?timestamp=" + timestamp + "&token=" + token;
	}
	return newurl;
}

$(document).ready(function ()
{
	ACC.register.bindSendDynPwdPress();
	ACC.register.chectOutCapcha();
});