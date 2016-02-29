
jQuery(document).ready(function($) {
  var navRight = $('.nav-right');
  var title = $('.banner-title');
  var titleItem = $('.title-item');
  var dropBtn = $('.dropBtn');
  var dropmenu = $('.dropmenu');
  var cameraIcon = $('.cameraIcon');
  var oWidth = $(window).width();
  var aaa = true;


  var HotEndTime = [ //倒计时结束时间
    {
      "endTime": "2016/2/29 12:00"
    },
    {
      "endTime": "2016/2/29 12:00"
    },
    {
      "endTime": "2016/2/29 12:00"
    },
    {
      "endTime": "2016/2/29 12:00"
    },
    {
      "endTime": "2016/2/29 12:00"
    },
    {
      "endTime": "2016/2/29 12:00"
    },
    {
      "endTime": "2016/2/29 12:00"
    },
    {
      "endTime": "2016/2/29 12:00"
    },
    {
      "endTime": "2016/2/29 12:00"
    },
    {
      "endTime": "2016/2/29 12:00"
    },
    {
      "endTime": "2016/2/29 12:00"
    },
    {
      "endTime": "2016/2/29 12:00"
    }];
    // 调用倒计时函数

  $(".special-hover-time").each(function(i) {
    count(HotEndTime[i].endTime, this);
  });

  if (oWidth <= 1014) {
    oResizeAfter();
    oResize();
  } else {
    oResizeBefore();
    oResize();
  }

  // var flag = true;
  // $("#classi").click(function() {
  //   if (flag) {
  //     $("#classification").css("display", "block");
  //   } else {
  //     $("#classification").css("display", "none");
  //   }
  //   flag = !flag;
  // });

  marginRight();
  headerClick();
  function oResizeAfter() {
    navRight.css("font-size", "1.2rem");
    title.css("font-size", "1.4rem");
    dropBtn.css("right", "0");
    dropmenu.css("font-size", "1.2rem");
    cameraIcon.css("font-size", "1.6rem");
    titleItem.each(function(i) {
      titleItem.css("padding", "0 1%");
    })
  }
  function oResizeBefore() {
    navRight.css("font-size", "");
    title.css("font-size", "");
    dropBtn.css("right", "");
    dropmenu.css("font-size", "");
    cameraIcon.css("font-size", "");
    titleItem.each(function(i) {
      titleItem.css("padding", "");
    })
  }

  function headerClick() {
    $("#page .header-small-right").click(function() {
      if ($("#page .header-small-click").is(":visible")) {
        $("#page .header-small-click").show();
        $("#page .header-wrapper-triangle").show();
        $("#cboxOverlay").css("display", "block");
        $("#cboxOverlay").css("z-index", "99");
        $("#cboxOverlay").css("background", "rgba(0,0,0,0.2)");
      } else {
        $("#page .header-small-click").hide();
        $("#page .header-wrapper-triangle").hide();
        $("#cboxOverlay").css("display", "none");
        $("#cboxOverlay").css("z-index", "");
        $("#cboxOverlay").css("background", "");
      }

    });
  }
  function displayOldPrice() {
    var PriceWidth = findMaxWidthTrue($(".hot-consmall-price"));
    var PeopleNumWidth = findMaxWidthTrue($(".hotsmall-buy"));
    var contentWidth = $(".hot-consmall-main").width();
    var aaa = true;
    if (contentWidth > 280) {
      $(".hotsmall-price-old").show();
      aaa = true;
    } else {
      $(".hotsmall-price-old").hide();
    }
  }
  function displayBuyPeople() {
    var contentWidth = $(".hot-consmall-main").width();
    if (contentWidth > 225) {
      $(".hotsmall-buy").show();
    } else {
      $(".hotsmall-buy").hide();
    }
  }
  function changeSize() {
    var getTime = $(".special-hover-time");
    getTime.width("");
    getTime.width(findMaxWidth(getTime));

    var hotConsmall = $(".hot-consmall-bargin");
    hotConsmall.height("");
    hotConsmall.height(findMaxHeight(hotConsmall));
  }

  function findMaxWidthTrue(el) {
    var maxWidth = 0;
    el.each(function() {

      if ($(this).outerWidth(true) >= maxWidth) {
        maxWidth = $(this).outerWidth(true);
      }
    });
    return maxWidth + 1;
  }
  //寻找最大宽度
  function findMaxWidth(el) {
    var maxWidth = 0;
    el.each(function() {

      if ($(this).width() >= maxWidth) {
        maxWidth = $(this).width();
      }
    });
    return maxWidth + 1;
  }

  //寻找最大高度
  function findMaxHeight(el) {
    var maxHeight = 0;
    el.each(function() {

      if ($(this).height() >= maxHeight) {
        maxHeight = $(this).height();
      }
    });
    return maxHeight + 1;
  }
  function marginRight() {
    $(".hot-consmall-item:nth-child(2n)").css("margin-right", "0");
    $(".hot-content-item:nth-child(3n)").css("margin-right", "0");
  }

  // 页面变小适应函数
  function oResize() {
    $(".title-item-add").width($(".title-ul .title-item:eq(0)").outerWidth(true));
    cTimePadding();
    changeSize();
    $(window).resize(function() {
      displayOldPrice();
      displayBuyPeople();
      $(".title-item-add").width($(".title-ul .title-item:eq(0)").outerWidth(true));
      oWidth = $(window).width();
      if (oWidth <= 1014) {
        oResizeAfter();
      } else {
        oResizeBefore();
      }
      changeSize();
      cTimePadding();

    });
    displayOldPrice();
    displayBuyPeople();
  }

  function cTimePadding() {
    var changeTime = $(".special-hot-hover");
    changeTime.css("padding-top", "");
    var paddingTop = $(".hot-content-main").height() - changeTime.outerHeight(true);
    changeTime.css("padding-top", (paddingTop + 20) + "px");
  }



  // 计算倒计时函数
  function count(date, obj) {
    date = date.replace(/-/g, '/'); //转换日期格式
    var endTime = new Date(date);
    var timer = null;
    var now = new Date();
    if (now - endTime <= 0) {
      obj.innerHTML = countTime(now, endTime);
    } else {
      obj.innerHTML = "活动已结束!";
      clearInterval(timer);
    }
    timer = setInterval(function() {
      now = new Date();
      if (now - endTime <= 0) {
        obj.innerHTML = countTime(now, endTime);
      } else {
        obj.innerHTML = "活动已结束!";
        clearInterval(timer);
      }

    }, 1000);
  }

  // 计算时间
  function countTime(now, endTime) {
    var leftSecond = (endTime.getTime() - now.getTime()) / 1000;
    var year = Math.floor(leftSecond / (60 * 60 * 24 * 30 * 12));
    leftSecond -= year * 60 * 60 * 24 * 30 * 12;
    var month = Math.floor(leftSecond / (60 * 60 * 24 * 30));
    leftSecond -= month * 60 * 60 * 24 * 30;
    var day = Math.floor(leftSecond / (60 * 60 * 24));
    leftSecond -= day * 60 * 60 * 24;
    var hour = formatNum(Math.floor(leftSecond / (60 * 60)));
    leftSecond -= hour * 60 * 60;
    var minutes = formatNum(Math.floor(leftSecond / 60));
    leftSecond -= minutes * 60;
    var second = formatNum(Math.floor(leftSecond));
    leftSecond -= minutes * 60;
    // var millisecond = 
    return day + "天" + hour + ":" + minutes + ":" + second;
  }

  //时间格式
  function formatNum(num) {
    if (num < 10)
      num = '0' + num;
    else
      num = num;
    return num;
  }
  // 计算倒计时函数结束

});

