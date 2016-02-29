jQuery(document).ready(function ($) {
    if ($(".home").length == 0) {
        //		alert($(".banner-title .title-item:first .dropmenu").length)
        $(".banner-title .title-item .dropmenu").remove();
        // $(".banner-title .title-item:first .title-items").html($('.title-item-addclick').attr('title'));
    } else {
        $(".banner-title .title-item .dropBtn").css("display", "block");
    }
    // aaa
    var navRight = $('.nav-right');
    var title = $('.banner-title');
    var titleItem = $('.title-item');
    var dropBtn = $('.dropBtn');
    var dropmenu = $('.dropmenu');
    var cameraIcon = $('.cameraIcon');
    var oWidth = $(window).width();
    window.onload = function () {
        $(".flexslider").height($(window).width() * 360 / 1350);

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

    $(".banner-title .title-item").removeClass("title-item-first");
    $(".banner-title .title-item:eq(0)").addClass("title-item-first");

    scrollImageNew();
    var HotEndTime = [ //倒计时结束时间
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
    $(".recommend-hover-time").each(function (i) {
        count(HotEndTime[i].endTime, this);
    });

    $(".reitem-content .reitem-nowprice").width(findMaxWidth($(".reitem-content .reitem-nowprice")));

    if (oWidth <= 1014) {
        oResizeAfter();
        oResize();
    } else {
        oResizeBefore();
        oResize();
    }
    smallIndex();
    menuFix();

    indexDropmenu();

    cart();

    // changeMain();
    resizeWidth();
    showMain();
    function scrollImageNew() {
        var bannerCtrl = $("#bannerCtrl");
        bannerCtrl.html("");
        $("#banner_tabs li").each(function () {
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
    function findMaxWidth(el) {
        var maxWidth = 0;
        el.each(function () {
            if ($(this).width() >= maxWidth) {
                maxWidth = $(this).width();
            }
        });
        return maxWidth + 1;
    }

    function oResizeAfter() {
        navRight.css("font-size", "1.2rem");
        title.css("font-size", "1.4rem");
        dropBtn.css("right", "0");
        dropmenu.css("font-size", "1.2rem");
        cameraIcon.css("font-size", "1.6rem");
        titleItem.each(function (i) {
            titleItem.css("padding", "0 1%");
        })
    }
    function oResizeBefore() {
        navRight.css("font-size", "");
        title.css("font-size", "");
        dropBtn.css("right", "");
        dropmenu.css("font-size", "");
        cameraIcon.css("font-size", "");
        titleItem.each(function (i) {
            titleItem.css("padding", "");
        });
    }

    function showMain() {
        $(".main-wrap").each(function () {
            $(this).find(".main-header-tab li:eq(0)").attr("class", "main-header-on");
            $(this).find(".main-header-tab li:eq(1)").attr("class", "");
            $(this).find(".main-middle-show:eq(0)").attr("class", "main-middle-show main-middle-on");
            $(this).find(".main-middle-show:eq(2)").attr("class", "main-middle-show");
        });
        $(".main-header-tab li").mouseover(function () {
            // alert($(this).index());
            $(this).attr("class", "main-header-on");
            $(this).siblings().attr("class", "");
            var show = $(this).closest(".main-wrap").find(".main-middle-show:eq(" + $(this).index() + ")");
            show.addClass("main-middle-on");
            show.siblings().removeClass("main-middle-on");
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

        });
    }
    //适应窗口变小
    function oResize() {
        var meunWidth = $(".index-right-menu").width(); //右部悬浮菜单的宽度
        $("#trolley-box").css("right", meunWidth + 'px');
        $(".trolley-box-trangle").css("top", meunWidth * 1.3 + 'px');
        $(window).resize(function () {
            oWidth = $(window).width();
            $(".title-item-add").width($(".title-ul .title-item:eq(0)").outerWidth(true));
            if (oWidth <= 1014) {
                oResizeAfter();
            } else {
                oResizeBefore();
            }
            meunWidth = $(".index-right-menu").width(); //右部悬浮菜单的宽度
            $("#trolley-box").css("right", meunWidth + 'px');
            $(".trolley-box-trangle").css("top", meunWidth * 1.3 + 'px');
            changeHeight($(".reitem-contentR"), "reitem-contentR");
            $(".reitem-contentL").css("line-height", $(".reitem-contentR").outerHeight(true) + "px");

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
            // changeMain();
            resizeWidth();
            indexDropmenu();
        });


        oWidth = $(window).width();
        changeHeight($(".reitem-contentR"), "reitem-contentR");
        $(".reitem-contentL").css("line-height", $(".reitem-contentR").outerHeight(true) + "px");
        $(".title-item-add").width($(".title-ul .title-item:eq(0)").outerWidth(true));
        if (oWidth <= 1014) {

            oResizeAfter();
        } else {
            oResizeBefore();
        }
    }

    //滚动条滚动 
    function menuFix() {
        $(window).scroll(function () {
            var headerTop = $(".headerContent").outerHeight();
            var getScrollTop = $(document).scrollTop();
            if (getScrollTop > headerTop) {
                $(".banner-title").css("position", "fixed");
                if ($(".home").length > 0) {
                    $(".title-item-add").show();
                    $(".title-ul .title-item:eq(0)").hide();
                }
            } else {
                $(".banner-title").css("position", "");
                $(".title-item-add").hide();
                $(".title-ul .title-item:eq(0)").show();

            }
            /*if(getScrollTop > 800){
                $(".footer").css("position","fixed");
            }else {
                $(".footer").css("position","relative");
            }*/
            // alert(headerTop)
        });
    }
    function indexDropmenu() {
        $(".dropmenu-right-btn").each(function (i) {
            $(this).css("top", (60 * i + 20) + "px");
        });
    }
    // 计算倒计时函数
    function count(date, obj) {
        date = date.replace(/-/g, '/'); //转换日期格式
        var endTime = new Date(date);
        var timer = null;
        var now = new Date();
        if (now - endTime <= 0) {
            $(obj).html(countTime(now, endTime));
            $(obj).closest(".recommend-item").find(".reitem-cont-left span").html(countTimeDay(now, endTime));
        } else {
            $(obj).html("活动已结束!");
            clearInterval(timer);
            $(obj).closest(".recommend-item").find(".reitem-cont-left span").html(0)
        }
        timer = setInterval(function () {
            now = new Date();
            if (now - endTime <= 0) {
                $(obj).html(countTime(now, endTime));
            } else {
                $(obj).html("活动已结束!");
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
    function countTimeDay(now, endTime) {
        var leftSecond = (endTime.getTime() - now.getTime()) / 1000;
        var year = Math.floor(leftSecond / (60 * 60 * 24 * 30 * 12));
        leftSecond -= year * 60 * 60 * 24 * 30 * 12;
        var month = Math.floor(leftSecond / (60 * 60 * 24 * 30));
        leftSecond -= month * 60 * 60 * 24 * 30;
        var day = Math.floor(leftSecond / (60 * 60 * 24));
        // var millisecond = 
        return day;
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


    // 设置响应式调整 
    function resizeWidth() {
        var trueWidth = $(".recommend-hover").width();
        var sumWidth = $(".recommend-hover-mid").outerWidth(true) + $(".recommend-hover-img").outerWidth(true) + $(".recommend-hover-right").outerWidth(true);
        if (sumWidth > trueWidth) {
            $(".recommend-hover").css("padding", "10px 0");
            $(".recommend-hover-right").css("margin-top", "10px");
            $(".recommend-hover").css("min-height", $(".reitem-content").height() - 10);
        } else {
            $(".recommend-hover").css({
                "padding-top": "",
                "padding-bottom": ""
            });
            $(".recommend-hover").css("min-height", "");
            $(".recommend-hover-right").css("margin-top", "");
        }
    }

    // 设置响应式调整 
    function changeHeight(getDiv, classname) {
        if (getDiv[0]) {
            var aa = getDiv[0];
            for (var i = 0; i < getDiv.length; i++) {
                if ($(getDiv[i]).height() >= $(aa).height()) {
                    aa.className = classname + " small";
                    aa = getDiv[i];
                } else {
                    getDiv[i].className = classname + " small";
                }
            }
            aa.className = classname + " big";
            $(".big").css("height", "");
            $(".small").height($(".big").height());
            $(".big").height($(".big").height());
            getDiv.attr("class", classname);
        }
    }
    //悬浮购物车效果函数
    function cart() {
        var selectInputs = $(".check-one");
        var selectInputsTwo = $(".check-two");
        var checkAllInputs = $(".check-all");
        var trolleyClose = document.getElementById("trolley-head-close");
        var trolleyDisplay = $(".menu-item-mid");

        //关闭按键
        if (trolleyClose) {
            trolleyClose.onclick = function (e) {
                e = e || window.event;
                var el = e.srcElement ? e.srcElement : e.target;
                // $(el).parent().parent().parent().css("display","none");
                $("#trolley-box").hide();
            }
        }


        //显示隐藏
        trolleyDisplay.mouseover(function () {
            $("#trolley-box").show();
        });
        trolleyDisplay.mouseout(function () {
            $("#trolley-box").hide();
        });

        // 点击选择框
        for (var i = 0; i < selectInputs.length; i++) {
            selectInputs[i].onclick = function (e) {
                e = e || window.event;
                var el = e.srcElement ? e.srcElement : e.target;
                if (el.className.indexOf('check-all') >= 0) { //如果是全选，则吧所有的选择框选中
                    for (var j = 0; j < selectInputs.length; j++) {
                        selectInputs[j].checked = el.checked;
                    }
                }
                if (!el.checked) { //只要有一个未勾选，则取消全选框的选中状态
                    for (var i = 0; i < checkAllInputs.length; i++) {
                        checkAllInputs[i].checked = false;
                    }

                }
                var checkOne = $(".check-one");
                var checkTwo = $(".check-two");
                for (j = 0; j < checkTwo.length; j++) {
                    checkTwo[j].checked = checkOne[j].checked;
                }

                getTotal(); //选完更新总计
            }
        }
        for (var i = 0; i < selectInputsTwo.length; i++) {
            selectInputsTwo[i].onclick = function (e) {
                e = e || window.event;
                var el = e.srcElement ? e.srcElement : e.target;
                if (el.className.indexOf('check-all') >= 0) { //如果是全选，则吧所有的选择框选中
                    for (var j = 0; j < selectInputsTwo.length; j++) {
                        selectInputsTwo[j].checked = el.checked;
                    }
                }
                if (!el.checked) { //只要有一个未勾选，则取消全选框的选中状态
                    for (var i = 0; i < checkAllInputs.length; i++) {
                        checkAllInputs[i].checked = false;
                    }

                }
                var checkOne = $(".check-one");
                var checkTwo = $(".check-two");

                for (x = 0; x < checkOne.length - 1; x++) {
                    checkOne[x].checked = checkTwo[x].checked;
                }
                getTotal(); //选完更新总计
            }
        }
        function getTotal() {
            var selected = 0;
            var showNum = document.getElementById("trolley-head-num");
            for (var i = 0; i < selectInputsTwo.length; i++) {
                if (selectInputsTwo[i].checked) {
                    selected++;
                }
            }
            if (showNum) {
                showNum.innerHTML = selected;
            }
        }
        if (checkAllInputs[0]) {
            checkAllInputs[0].click();
        }

    }

    //轮播图


    function smallIndex() {
        getHeight();
        function getHeight() {
            var bodyheight = document.body.scrollHeight || document.documentElement.scrollHeight;
            // var a=document.getElementById("header-left-js");
            //点击头部左上角
            $(".js-none").height(bodyheight - 95.7);
            $(".menu-buttom").height(bodyheight - 200);
        }

        $("#header-left").click(function () {
            $("#header-left-js").fadeIn();
            $("#search").fadeOut();
        });
        $("#x").click(function () {
            $("#header-left-js").fadeOut();
            $("#search").fadeIn();
        });
        //点击头部左上
        change();
        equal();
        //倒计时
        function FreshTime() {
            // alert("sfdafs")
            var endtime = new Date("2015/11/11,23:59:59") //结束时间
            var nowtime = new Date(); //当前时间
            var lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
            d = parseInt(lefttime / 3600 / 24);
            h = formatNum(parseInt((lefttime / 3600) % 24));
            m = formatNum(parseInt((lefttime / 60) % 60));
            s = formatNum(parseInt(lefttime % 60));
            $("#timeNum1").html(d + "天" + "&nbsp;" + h + ":" + m + ":" + s);
            if (lefttime <= 0) {
                $("#LeftTime").html("已结束");
                clearInterval(sh);
            }
        }
        FreshTime()
        var sh;
        sh = setInterval(FreshTime, 1000);
        //倒计时结束

        //点击分类
        $("#classi").click(function () {
            if (!$("#classification").is(":visible")) {
                $("#classification").css("display", "block");
                $("#cboxOverlay").css("display", "block");
                $("#cboxOverlay").css("z-index", "99");
                $("#cboxOverlay").css("background", "rgba(0,0,0,0.2)");

            } else {
                $("#classification").css("display", "none");
                $("#cboxOverlay").css("display", "none");
                $("#cboxOverlay").css("z-index", "");
                $("#cboxOverlay").css("background", "");
            }
        });
        //点击分类结束

        //响应式调整

        $(window).resize(function () {
            change();
            getHeight();
            equal();
            if ($(window).width() > 720)
                $(".flexslider").height($(window).width() * 329 / 1263);
            else
                $(".flexslider").height($(window).width() * 250 / 700);

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
    var flag1 = true;
    // $(".right-down img").click(function() {

    //   if (flag1) {

    //     $(".header-small .header-wrapper-triangle").css("display", "block");

    //   } else {
    //     $(".header-small .header-wrapper-triangle").css("display", "none");
    //   }
    //   flag1 = !flag1;
    // });
    $("#showtext").click(function () {
        // alert($("#contentid").is(":visible"))
        if (!$("#contentid").is(":visible")) {
            // alert("dsf")
            $("#contentid").css("display", "block");
            $("#cboxOverlay").css("display", "block");
            $(".header-wrapper-triangle").css("display", "block")
            $("#cboxOverlay").css("z-index", "99");
            $("#cboxOverlay").css("background", "rgba(0,0,0,0.2)");
        } else {
            $("#contentid").css("display", "none");
            $("#cboxOverlay").css("display", "none");
            $("#cboxOverlay").css("z-index", "");
            $("#cboxOverlay").css("background", "");
            $(".header-wrapper-triangle").css("display", "none");
        }
    });
    $("#cboxOverlay").click(function () {
        $("#contentid").css("display", "none");
        $("#cboxOverlay").css("display", "none");
        $("#cboxOverlay").css("z-index", "");
        $("#cboxOverlay").css("background", "");
        $(".classification").css("display", "none");
        $(".header-small-click").css("display", "none");
        $(".header-wrapper-triangle").css("display", "none");
    });
});

function showDiv(targetid, objN) {

    // var target=document.getElementById(targetid);
    // var clickimg=document.getElementById(objN);
    // if(target && clickimg) {
    // 	if (target.style.display=="block") {
    // 	target.style.display="none";
    // } else{
    // 	target.style.display="block";
    // }
    // }
}