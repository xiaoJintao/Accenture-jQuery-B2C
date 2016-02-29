
jQuery(document).ready(function($){
	var logoImg = $('.simple_disp-img img');
	var languageDiv = $('.language');
	var languageA = $('.language a');
	var headerNavs = $('.headerNav a');
	var dividingLine = $('.headerNav a .dividing-line');
	var oWidth = $(window).width();
	if(oWidth<=1000){

		oResizeAfter();
		oResize();

	}else{
		oResizeBefore();
		oResize();
	}
	// alert("asfas");
	function oResizeBefore(){
		logoImg.css("width","");
		languageDiv.css("margin-right","");
		languageA.css("font-size","");
		headerNavs.css("font-size","");
		dividingLine.css("margin","");
	}

	function oResizeAfter(){
		logoImg.css("width","110%");
		languageDiv.css("margin-right","10px");
		languageA.css("font-size","1.2rem");
		headerNavs.css("font-size","1.2rem");
		dividingLine.css("margin","0 5px");
	}

	function oResize(){
		$(window).resize(function(){
			oWidth = $(window).width();
			if(oWidth<=1000){
				oResizeAfter();
			}else{
				oResizeBefore();
			}
		});
	}
});


ACC.product = {
	
	initQuickviewLightbox:function(){
		this.enableAddToCartButton();
		this.enableAddToBuyButton();
		this.bindToAddToCartForm();
		//this.bindToAddToBuyForm();
		$("img.lazy").lazyload();
	},
	
	
	enableAddToCartButton: function ()
	{
		$('#addToCartButton').removeAttr("disabled");
	},
	
	enableAddToBuyButton: function ()
	{
		$('#addToBuyButton').removeAttr("disabled");
	},
		
	disableAddToCartButton: function ()
	{
		$('#addToCartButton').attr("disabled", true);
	},
	
	disableAddToBuyButton: function ()
	{
		$('#addToBuyButton').attr("disabled", true);
		if($('#cboxClose').size()!=0){
			$('#cboxClose').click();
		}
	},
	
	bindToAddToCartForm: function ()
	{
		var addToCartForm = $('.add_to_cart_form');
		addToCartForm.ajaxForm({
			beforeSubmit: ACC.product.disableAddToCartButton,
			success: ACC.product.displayAddToCartPopup,
			complete: ACC.product.enableAddToCartButton
		});
	},

	bindToAddToBuyForm: function ()
	{
		var addToBuyForm = $('.add_to_buy_form');
		addToBuyForm.ajaxForm({
			beforeSubmit: ACC.product.disableAddToBuyButton,
			//success: ACC.product.displayAddToCartPopup,
			complete: ACC.product.enableAddToBuyButton
		});
	},
	
	bindToAddToCartStorePickUpForm: function ()
	{
		var addToCartStorePickUpForm = $('#pickup_store_results .resultFormAjax');
		addToCartStorePickUpForm.ajaxForm({
			success: ACC.product.displayAddToCartPopup
		});
	},

	displayAddToCartPopup: function (cartResult, statusText, xhr, formElement)
	{
		$('#addToCartLayer').remove();
		
		if (typeof ACC.minicart.refreshMiniCartCount == 'function')
		{
			ACC.minicart.refreshMiniCartCount();
		}
		
		$("#header").append(cartResult.addToCartLayer);
		
		if($(".cart_popup_error_msg").text()==""){
			ACC.product.moveToMiniCart();
		}else{
			$('#addToCartLayer').fadeIn(function(){
				$.colorbox.close();
				$("img.lazy").lazyload();
				if (typeof timeoutId != 'undefined')
				{
					clearTimeout(timeoutId);
				}
				timeoutId = setTimeout(function ()
				{
					$('#addToCartLayer').fadeOut(function(){
				 	   $('#addToCartLayer').remove();
						
					});
				}, 5000);
				$(".addToCartButton").attr("disabled","disabled");
				$(".addToBuyButton").attr("disabled","disabled");
			});
		}
		
		var productCode = $('[name=productCodePost]', formElement).val();
		var quantityField = $('[name=qty]', formElement).val();

		var quantity = 1;
		if (quantityField != undefined)
		{
			quantity = quantityField;
		}

		ACC.track.trackAddToCart(productCode, quantity, cartResult.cartData);
	},
	
	moveToMiniCart: function ()
	{	
		var endoffset = $(".miniCart .word").offset();
		if($(".addToCartButton").length>0){
			var startoffset = $(".addToCartButton").offset();
		}else{
			var startoffset = $(".addToCartButtonGP").offset();
		}
		

        var img = $(".productImagePrimary img").attr('src');
        if(img==null){
        	img = $(".product-pic img").attr('src');
        }
        var flyer = $('<img class="u-flyer" src="'+img+'">');
        var fold = $(window).scrollTop();
        flyer.fly({
            start: {
                left: startoffset.left, //开始位置（必填）#fly元素会被设置成position: fixed
                top: startoffset.top-fold //开始位置（必填）
            },
            end: {
                left: endoffset.left+10, //结束位置（必填）
                top: endoffset.top+10-fold, //结束位置（必填）
                width: 0, //结束时宽度
                height: 0 //结束时高度
            },
            onEnd: function(){ //结束回调
                $(".u-flyer").remove();
            }
        });
	}

};

$(document).ready(function ()
{
	with(ACC.product)
	{	
		bindToAddToCartForm();
//		bindToAddToBuyForm();
		bindToAddToCartStorePickUpForm();
		enableAddToCartButton();
		enableAddToBuyButton();
	}
});

