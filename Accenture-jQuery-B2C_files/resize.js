
	var menuHead = $('.menu_head');
	var menuBody = $('.menu_body a');
	var allWword = $(".allWword");
	var	em = $("i>em");
	var picdescribe = $(".pic-describe>span");
	var describe = $(".pic-describe");
	var righttitle = $(".right-title>a>h3");

	var oWidth = $(window).width();
	if(oWidth<=1100){
		eResizeAfter();
		eResize();
	}else{
		eResizeBefore();
		eResize();
	}

	function eResizeAfter(){
		menuHead.css("width","77%");
		menuHead.css("padding-left","23%");
		menuBody.css("width","80%");
		menuBody.css("padding-left","23%");
		allWword.css("width","10%");

		em.css("left","15%");
		righttitle.css("width","5%");
	}
	function eResizeBefore(){
		menuHead.css("width","82%");
		menuHead.css("padding-left","18%");
		menuBody.css("width","60%");
		menuBody.css("padding-left","18%");
		allWword.css("width","4.4%");	
		em.css("left","30%");
		righttitle.css("width","4%");
	}

	function eResize() {
		$(window).resize(function(){
			oWidth = $(window).width();
			if(oWidth<=1100){
				eResizeAfter();
			}else{
				eResizeBefore();
			}
		})
	}

