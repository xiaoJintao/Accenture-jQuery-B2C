$(function() {
	indexHeaderImgToggle();
  $('.headToggle').click(function() {
    $(".userRegister").toggle();
  });
  scrollImageNew();
  indexDropmenu();
  function scrollImageNew() {
    var bannerCtrl = $("#bannerCtrl");
    bannerCtrl.html("");
    $("#banner_tabs li").each(function() {
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
  }
  $(".small-mask").height($(window).height());
  $(window).scroll(function() {
    var headerTop = $("#header").outerHeight();
    var getScrollTop = $(document).scrollTop();
	if($(".hearer_banner_img").length>0){
    	 var headerBannerHeight = $(".hearer_banner_img").height();
    }else {
    	var headerBannerHeight = 0;
    }
    if (getScrollTop >  headerTop + headerBannerHeight) {
      $(".navigationbarcollectioncomponent").css("position", "fixed");
      $(".navigationbarcollectioncomponent").css("top", "0");
      $(".dropmenu").addClass("dropmenu-none");
      $(".dropBtn").css("display", "none");
    } else {
      $(".navigationbarcollectioncomponent").css("position", "");
      $(".navigationbarcollectioncomponent").css("top", "");
      $(".dropBtn").css("display", "block");
      $(".dropmenu").removeClass("dropmenu-none");
    }
//    add 1.28
   if (getScrollTop > 500) {
      $("#back-top").css("display", "block");
      $(".left-menu-list").css("display", "block");
    } else {
      $(".back-top").css("display", "none");
      $(".left-menu-list").css("display", "none");
    }
// add 1.28
  });

  function showMain() {
    $(".main-wrap").each(function() {
      $(this).find(".main-header-tab li:eq(0)").attr("class", "main-header-on");
      $(this).find(".main-header-tab li:eq(1)").attr("class", "");
      $(this).find(".main-middle-show:eq(0)").attr("class", "main-middle-show main-middle-on");
      $(this).find(".main-middle-show:eq(2)").attr("class", "main-middle-show");
    });
    $(".main-header-tab li").mouseover(function() {
      $(this).attr("class", "main-header-on");
      $(this).siblings().attr("class", "");
      var show = $(this).closest(".main-wrap").find(".main-middle-show:eq(" + $(this).index() + ")");
      $(this).closest(".main-wrap").find(".main-middle-show").hide();
      show.show();
      changeSizeOfIndex();
    });
  }

  showMain();
  window.onload = function() {
    changeSizeOfIndex();
  }
  $(window).resize(function() {
    changeSizeOfIndex();
    if ($(window).width() >= 720) {
      $('.userRegister').css("display", "block");
    }
  });
  function changeSizeOfIndex() {
    if ($(".main-middle").height() > 10) {
      $(".main-left").height($(".main-middle").height());
      $(".main-right-top").height(($(".main-middle").height()) * 0.58);
      $(".main-right-top").css("margin-bottom", ($(".main-middle").height()) * 0.02);
      $(".main-right-top-detail").css({
        "height": $(".main-right-top-detail").width(),
        "line-height": $(".main-right-top-detail").width() + "px"
      });
      $(".main-right-bottom-detail").css({
        "height": $(".main-right-bottom-detail").width(),
        "line-height": $(".main-right-bottom-detail").width() + "px"
      });
      $(".main-right-bottom").height(($(".main-middle").height()) * 0.4);
    }
  }

  $("#showtext").click(function() {
    $("#contentid").toggle();
    //	  alert("asdf")
    if ($("#contentid").is(":visible")) {
      $(".header-wrapper-triangle").css("display", "block");
      $(".small-mask").css("display", "block");
    } else {
      $(".header-wrapper-triangle").css("display", "none");
    }
  });

  $(".header-small-right").click(function() {
    $(".header-small-click").toggle();
    if ($(".header-small-click").is(":visible")) {
      $(".header-wrapper-triangle").css("display", "block");
      $(".small-mask").css("display", "block");
    } else {
      $(".header-wrapper-triangle").css("display", "none");
    }
  });
  $(".small-mask").click(function() {
    $("#contentid").css("display", "none");
    $(".header-wrapper-triangle").css("display", "none");
    $(".header-small-click").css("display", "none");
    $(".header-wrapper-triangle").css("display", "none");
    $("#classification").css("display", "none");
    $(".small-mask").css("display", "none");
  });
  smallIndex();
  function smallIndex() {
    getHeight();
    function getHeight() {
      var bodyheight = document.body.scrollHeight || document.documentElement.scrollHeight;
      // var a=document.getElementById("header-left-js");
      //点击头部左上角
      $(".js-none").height(bodyheight - 95.7);
      $(".menu-buttom").height(bodyheight - 200);
    }

    $("#header-left").click(function() {
      $("#header-left-js").fadeIn();
      $("#search").fadeOut();
    });
    $("#x").click(function() {
      $("#header-left-js").fadeOut();
      $("#search").fadeIn();
    });
    //点击头部左上
    change();
    equal();

    //点击分类
    $("#classi").click(function() {
      if (!$("#classification").is(":visible")) {
        $("#classification").css("display", "block");
        $(".small-mask").css("display", "block");
      } else {
        $("#classification").css("display", "none");
        $(".small-mask").css("display", "none");
      }
    });
    //点击分类结束

    //响应式调整

    $(window).resize(function() {
      change();
      getHeight();
      equal();
    });
    function equal() {
      $(".index-beauty .left-1").height($(".index-beauty .right-top .right-top-1 .right-top-2").height());
      $(".index-beauty .left-1 a img").height($(".index-beauty .right-top .right-top-1 .right-top-2").height());
    }
    function change() {
      $(".arder>.left").height($('.arder>.right-bottom').height() + $('.arder>.right-top').height());
      $(".arder>.left>a").height($('.arder>.left').height());
      $(".beauty>.left").height($('.beauty>.right-bottom').height() + $('.beauty>.right-top').height());
      $(".beauty>.left>a").height($('.beauty>.left').height());
    }
  }
  // alert("asdf")
  // var flag1=true;
  // $(".right-down img").click(function(){

  // 	if(flag1){

  // 		$(".header-small .header-wrapper-triangle").css("display","block");

  // 	}else{
  // 		$(".header-small .header-wrapper-triangle").css("display","none");
  // 	}
  // 	flag1 = !flag1;
  // });
  function showDiv(targetid, objN) {
    var target = document.getElementById(targetid);
    var clickimg = document.getElementById(objN);
    if (target && clickimg) {
      if (target.style.display == "block") {
        target.style.display = "none";
      } else {
        target.style.display = "block";
      }
    }
  }
  function indexDropmenu() {
    $(".dropmenu-right-btn").each(function(i) {
      $(this).css("top", (60 * i + 20) + "px");
    });
  }
  

  cartSelectedAll();  //add by huangyun 1.26.2016 
  backTop();   //add 1.28
  /*  add 1.28  */
  $(".menu-item-footprint").bind("click", function() {
      if ($(".index-right-menu").css("right") == "0px") {
          $(".index-right-menu").animate({
              "right": 252
          }, 1000);
          $(".myfootprint").animate({
              "right": 0
          }, 1000);
          $(this).css("background", "#fd6a27");
          $(this).find(":nth-child(2)").css("display", "block");
      } else {
          $(".index-right-menu").animate({
              "right": 0
          }, 1000);
          $(".myfootprint").animate({
              "right": -252
          }, 1000);
          setTimeout(function() {
              $(".menu-item-footprint").css("background", "");
              $(".menu-item-footprint").find(":nth-child(2)").css("display", "");
          }, 1000);

      }

  });
  showCart();
});

// added by huangyun 1.26.2016
function cartSelectedAll(){
	$("#cartItems .checked:[name=all]").bind("click",function(){
		if($(this).is(':checked')){
			$("#cartItems .checked").attr("checked",true);
		}
	});
	$("#cartItems .checked").bind("click",function(){
		if(!$(this).is(':checked')){
			$("#cartItems .checked:[name=all]").attr("checked",false);
		}
	});
}
// add 1.28
function backTop(){
	var backToTop = $('#back-top');
    var img = backToTop.find('img');
    backToTop.bind("mouseenter", function() {
        img.animate({
            top: "-40px"
        }, 200);
    });
    backToTop.bind("mouseleave", function() {
        img.animate({
            top: "0"
        }, 200);
    });
    backToTop.bind("click", function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
    })
}

// add 1.28
function showCart(){
	var myCart = $(".index-right-menu .menu-item-cart");
	var myCartDetail = $("#miniCartLayer");
	myCart.bind("mouseenter",function(e){
		myCartDetail.css({
			"position": "fixed",
			"bottom": "150px",
			"right": "55px"
		});
	});
	myCart.bind("mouseleave",function(e){
		myCartDetail.unbind("mouseenter");
		myCartDetail.css({
			"position": "",
			"bottom": "",
			"right": ""
		});
	});
}

// add 2.2
function indexHeaderImgToggle(){
	bigImageDown();
    $(".banner_img_small").mouseover(function() {
      	$(this).slideUp(1000);
      	bigImageDown();
   });
}
function bigImageDown() {
   $(".banner_img").slideDown(1000, function() {
   setTimeout(function() {
      $(".banner_img").slideUp(1000);
     $(".banner_img_small").slideDown(1000);
    }, 3000);
   });
}