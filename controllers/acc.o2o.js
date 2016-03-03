ACC.o2oAtg = {
	bindAll: function()
	{
		//alert("#notice-store-link");
		if($("#productGrid").size() != 0){
			var tablelength = $('#productGrid table').length;

			for(var tabNo = 1;tabNo <= tablelength;tabNo++){
				var tabId = '#notice-store-link'+tabNo;
				this.bindChangeNoticeStoreLink($(tabId));
			}
		}
		if($("#productAddToCartPanel").size() != 0){
			this.bindChangeNoticeStoreLink($('#notice-store-link'));
		}
		
		if($("#qr-login-getqr").size() != 0){
			this.bingShowQrCode();
		}
		
		if($("#slideIMG").size()!=0){
			this.bindslidEvent();
		}
//		if($("#cartPagePoints").size() != 0){
//			//alert("initiPointsChangePage");
//			this.initiPointsChangePage();
//			//alert("bindCartPagePointsChangeEvent");
//			this.bindCartPagePointsChangeEvent();
//		}
	},
	
	bindslidEvent: function()
	{
		//幻灯片
		$("#slideIMG").slippry({
			transition: 'fade',
			useCSS: true,
			speed: 1000,
			pause: 3000,
			auto: true,
			preload: 'visible'
		});
	},

	bindNoticeStoreDialogEvent: function()
	{
		$('.btn-yes').unbind("click").click(function(e) {
			if($("#email").size() == 0 || $("#cellPhone").size() == 0) {
				$.colorbox.close();
				//window.location.reload();
			}
			
			$("#noticeStoreForm").submit();
			
		});
		
		//alert("请求数据");
		$("#noticeStoreForm").ajaxForm({
			success: function(data)
			{
				$("#noticeStoreDiv").replaceWith(data);
				$.colorbox.resize();
				if($("#email").size() == 0) {
					$("#cboxClose").css('display','none');
				}
				ACC.o2oAtg.bindNoticeStoreDialogEvent();
			}
		});
		
		ACC.common.refreshScreenReaderBuffer();
	},
	
	showTheNoticeStoreBox: function(data)
	{
		$.colorbox({
			html: data,
			width:330,
			height: false,
			overlayClose: true,
			onOpen: function()
			{
				//alert("onOpen");
			},
			onComplete: function()
			{
				//alert("onComplete");
				ACC.o2oAtg.bindNoticeStoreDialogEvent();
			},
			onClosed: function()
			{
				//alert("onClosed");
				ACC.common.refreshScreenReaderBuffer();
			}
		});
	},
	
	bindChangeNoticeStoreLink: function(link)
	{
		link.click(function()
		{
			$.get($(this).data('url')).done(
			    ACC.o2oAtg.showTheNoticeStoreBox
			);
		});
	},
	
	bingShowQrCode: function()
	{
		$("#qr-login-getqr").click(function(){ 
			//alert("hover");
			ACC.o2oAtg.showTheQrCodeLoginBox(document.getElementById("show-qrcode").innerHTML);
			ACC.o2oAtg.startCheckQrLogin();
		});
	},
	
	showTheQrCodeLoginBox: function(data)
	{
		$.colorbox({
			html: data,
			width:320,
			height:320,
			overlayClose: true,
			onOpen: function()
			{
				//alert("onOpen");
			},
			onComplete: function()
			{
				//alert("onComplete");
				
				var qrValue = document.getElementById("show-qrcode-value").value;
//				var qrValue = 2015122214082600016;
				var encodedContextPath = document.getElementById("show-qrcode-fullUrlBefore").value;
				var qrLink = encodedContextPath + "/qrcode/set?q="+qrValue;
//				alert(qrLink);
				//$('#qr-code').qrcode(qrLink);
				$("#cboxContent .qr-code").qrcode({ 
				    width: 200, //宽度 
				    height:200, //高度 
				    text: qrLink, //任意内容 
				}); 
			},
			onClosed: function()
			{
				ACC.common.refreshScreenReaderBuffer();
			}
		});
	},
	
	startCheckQrLogin: function(){
		var second = 3000;
		var t1 = window.setInterval(function(){
			var encodedContextPath = document.getElementById("show-qrcode-encodedContextPath").value;
			options = {
					type: 'GET',
					url: encodedContextPath+'/qrcode/check',
					data: {
						qrValue: document.getElementById("show-qrcode-value").value,
					},
					error: function(request) {
			            alert("Connection error, please check your network");
			        },
					success: function (data)
					{
						if(data=="OK"){
			        		//alert("OK");
			        		window.location.href=encodedContextPath;
			        		//return;
			        	}else{
			        		//alert("NOOK");
			        	}
					}
				};
			$.ajax(options);
		},second); 
		$("#cboxClose").click(function(){
			window.clearInterval(t1); 
		})
	},
	
//	checkQrLoginAjax: function(){
//		var encodedContextPath = document.getElementById("show-qrcode-encodedContextPath").value;
//		options = {
//				type: 'GET',
//				url: encodedContextPath+'/qrcode/check',
//				data: {
//					qrValue: document.getElementById("show-qrcode-value").value,
//				},
//				error: function(request) {
//		            alert("Connection error");
//		        },
//				success: function (data)
//				{
//					if(data=="OK"){
//		        		alert("OK");
//		        		window.location.href=encodedContextPath;
//		        		//return;
//		        	}else{
//		        		alert("NOOK");
//		        	}
//				}
//			};
//		$.ajax(options);
//	},
};

$(document).ready(function ()
{
	with(ACC.o2oAtg)
	{
			ACC.o2oAtg.bindAll();
	}
});