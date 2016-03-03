$(function() {
	var textAreaOfMy = $("#reviewComment");
	textAreaOfMy.keyup(function() {
		var len = $(this).val().length;
		$("#numOfTextarea").html(500 - len);
		if ((500 - len) <= 0) {
			$("#numOfTextarea").html(0);
		}
	});

	$(".viewReviewProductButtonAdd").each(function() {
		$(this).click(function() {
			if ($(this).closest("tr").next().is(':hidden')) {
				$(this).closest("tr").next().show();
				$(this).closest("tr").next().next().show();
			} else {
				$(this).closest("tr").next().hide();
				$(this).closest("tr").next().next().hide();
			}
		});
	});
	$("#rating5").click();
	$("#reviewComment").focus(function() {
		$("#reviewComment").height(100);
		$("#reviewComment").css("border-color", "#4679AC");
	});
	$("#reviewComment").blur(function() {
		if ($("#reviewComment").val().length > 0) {
			$("#reviewComment").height(100);
		} else {
			$("#reviewComment").height(30);
		}
		$("#reviewComment").css("border-color", "");
	}); ;
	
	var addReviewResult = $("#add-Review-Result").val();
	if(addReviewResult == "true"){
		$("#write_reviews .black_overlay_comment").css("display","block");
		$("#write_reviews .white_content_comment").css("display","block");
	}else if(addReviewResult == "false"){
		$("#write_reviews .black_overlay_comment").css("display","block");
		$("#write_reviews .white_content_comment").css("display","block");
	}
	flashbackOfComment();
	loadingOfComment();
//	$("#fade_comment").click(function(){
//		$()
//	});
	/*$(".pdp_comment_more").click(function(){
		$(".productReviews .pdp-evaluation_li:nth-child(n+6)").show();
		$(this).hide();
		$(".pdp_comment_hide").show();
	});
	$(".pdp_comment_hide").click(function(){
		$(".productReviews .pdp-evaluation_li:nth-child(n+6)").hide();
		$(this).hide();
		$(".pdp_comment_more").show();
	});*/
});

function validateReview() {
	var selectedValue = $(".selected").next().val();
	var imagesFiles = document.getElementById("file").files;
	for (var i = 0; i < imagesFiles.length; i++) {
		if (imagesFiles[i].type != "image/jpeg") {
			alert("<spring:theme code='text.message.customer.review.tip1'/>");
			return false;
		}
	}
	if (imagesFiles.length > 4) {
		alert("<spring:theme code='text.message.customer.review.tip2'/>");
		return false;
	} else if ($("#reviewComment").val().length < 7) {
		alert("<spring:theme code='text.message.customer.review.tip3'/>");
		return false;
	} else {
		if ($("#isAnonymity").is(":checked")) {
			$("#hi-isAnonymity").val("true");
		} else {
			$("#hi-isAnonymity").val("false");
		}
		return true;
	}
}
/*function addProductReview() { 
	var productCode = $("#entry-product-code").val(); 
	var orderCode = $("#order-code").val(); 
	var orderEntryNumber = $("#entry-orderEntry-code").val(); 
	$.ajax({ 
		type : "POST",
		url : "${contextPath}/my-account/reviewAndShare/create", 
		data : { 
			productCode : productCode, orderCode : orderCode, orderEntryNumber : orderEntryNumber },
		async : false, 
		error : function(request) { 
			alert("Connection error!"); 
		},
		success : function(result) { 
			var data = eval("(" + result + ")"); 
			if (data.result) { 
				alert("flase !") 
			}else{
				alert("true !") 
			} 
		} 
	}); 
}*/
function flashbackOfComment(){
	var evaluationLi=$(".pdp-evaluation .pdp-evaluation_li");
	if(evaluationLi.length>0){
		 var ss=new Array();
		    for (var i=0;i<evaluationLi.length;i++)
		    {
		       ss[i]=evaluationLi[i].innerHTML;
		    }
		    for (var i=0;i<ss.length;i++)
		    {
		    	evaluationLi[i].innerHTML=ss[ss.length-1-i];
		    }
	}
}

function loadingOfComment(){    //pdp page
	/*alert($(".productReviews:visible").length)*/
	/*productReviews*/
	var contentLength = $(".pdp-evaluation .pdp-evaluation_li").length;
	var check = true;
	$(window).scroll(function(){
		if($(".productReviews:visible").length > 0){
			var getButton = $(".pdp_comment_more");
			var getScrollTop = $(document).scrollTop();
			var contentShowL = $(".pdp-evaluation .pdp-evaluation_li:visible").length;
			if(getButton.length>0){
				if(getButton.position().top < getScrollTop){
					if(contentShowL < contentLength && check) {
						getButton.css("opacity","1");
						check = false;
						setTimeout(function(){
							for(var i=0 ;i<5 ; i++){
								$($(".pdp-evaluation .pdp-evaluation_li")[i+contentShowL]).css("display","block");
							}
							check = true;
							getButton.css("opacity","0");
							contentShowL = $(".pdp-evaluation .pdp-evaluation_li:visible").length;
							if(contentShowL >= contentLength) {
								$(".pdp_comment_hide").css("display","block");
							}
						},2000);
						
					}else if(contentShowL >= contentLength) {
						$(".pdp_comment_hide").css("display","block");
					}
				}
			}
		}
	});
}