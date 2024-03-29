jQuery(function ($) {
    $(".quick_links_panel li").mouseenter(function () {
        $(this).children(".mp_tooltip").animate({ left: -92, queue: true });
        $(this).children(".mp_tooltip").css("visibility", "visible");
        $(this).children(".ibar_login_box").css("display", "block");
    });
    $(".quick_links_panel li").mouseleave(function () {
        $(this).children(".mp_tooltip").css("visibility", "hidden");
        $(this).children(".mp_tooltip").animate({ left: -121, queue: true });
        $(this).children(".ibar_login_box").css("display", "none");
    });
    $(".quick_toggle li").mouseover(function () {
        $(this).children(".mp_qrcode").show();
    });
    $(".quick_toggle li").mouseleave(function () {
        $(this).children(".mp_qrcode").hide();
    });

    //创建DOM
    var quickHTML = document.querySelector("div.quick_link_mian");
    var quickShell = $(document.createElement('div')).html(quickHTML).addClass('quick_links_wrap');
	var quickLinks = quickShell.find('.quick_links');
    var quickPanel = quickLinks.next();
    quickShell.appendTo('.mui-mbar-tabs');
    var aaaaa = "";

    //具体数据操作 
    var quickPopXHR;
    var loadingTmpl = '<div class="loading" style="padding:30px 80px"><i></i><span>Loading...</span></div>';
    var popTmpl = '<a href="javascript:;" class="ibar_closebtn" title="关闭"></a><div class="ibar_plugin_title"><h3><%=title%></h3></div><div class="pop_panel"><%=content%></div><div class="arrow"><i></i></div><div class="fix_bg"></div>';
    var historyListTmpl = '<ul><%for(var i=0,len=items.length; i<5&&i<len; i++){%><li><a href="<%=items[i].productUrl%>" target="_blank" class="pic"><img alt="<%=items[i].productName%>" src="<%=items[i].productImage%>" width="60" height="60"/></a><a href="<%=items[i].productUrl%>" title="<%=items[i].productName%>" target="_blank" class="tit"><%=items[i].productName%></a><div class="price" title="单价"><em>&yen;<%=items[i].productPrice%></em></div></li><%}%></ul>';
    var newMsgTmpl = '<ul><li><a href="#"><span class="tips">新回复<em class="num"><b><%=items.commentNewReply%></b></em></span>商品评价/晒单</a></li><li><a href="#"><span class="tips">新回复<em class="num"><b><%=items.consultNewReply%></b></em></span>商品咨询</a></li><li><a href="#"><span class="tips">新回复<em class="num"><b><%=items.messageNewReply%></b></em></span>我的留言</a></li><li><a href="#"><span class="tips">新通知<em class="num"><b><%=items.arrivalNewNotice%></b></em></span>到货通知</a></li><li><a href="#"><span class="tips">新通知<em class="num"><b><%=items.reduceNewNotice%></b></em></span>降价提醒</a></li></ul>';
    var quickPop = quickShell.find('#quick_links_pop');

    $.getJSON(
    "models/try.json", function (data) {
        var dataLength = data.length;
        var content;
        var htmlc = "";
        $.each(data, function (index, value) {
            content = '<li class="cart_item"><div class="cart_item_pic"><a href="#"><img src=' + value.img_src + '></a></div><div class="cart_item_desc"><a href="#" class="cart_item_name">' + value.name + '</a><div class="cart_item_sku"><span>' + value.discribe + '</span></div><div class="cart_item_price"><span class="cart_price">' + value.price + '</span><a href="#" class="sc" title="删除"><img src="images/sc.png" alt="删除" /></a></div></div></li>'

            htmlc = htmlc + content;
        })
        htmlc = '<div class="ibar_plugin_content"><div class="ibar_cart_group ibar_cart_product"><ul>' + htmlc + '</div><div class="cart_handler"><a href="#" class="cart_go_btn jiaru" target="_blank">加入购物车</a></div></div>'
        aaaaa = htmlc;
    })

	var quickDataFns = {
	    //购物信息
	    message_list: {
	        title: '购物车',
	        content: '<div class="ibar_plugin_content"><div class="ibar_cart_group ibar_cart_product"><div class="ibar_cart_group_header"><a href="#">我的购物车</a></div><ul><li class="cart_item"><div class="cart_item_pic"><a href="#"><img src="images/xiez.jpg" /></a></div><div class="cart_item_desc"><a href="#" class="cart_item_name">夏季透气真皮豆豆鞋反绒男士休闲鞋韩版磨砂驾车鞋英伦船鞋男鞋子</a><div class="cart_item_sku"><span>尺码：38码（精工限量版）</span></div><div class="cart_item_price"><span class="cart_price">￥700.00</span></div></div>	</li></ul></div><div class="cart_handler"><div class="cart_handler_header"><span class="cart_handler_left">共<span class="cart_price">1</span>件商品</span><span class="cart_handler_right">￥569.00</span></div><a href="#" class="cart_go_btn" target="_blank">去购物车结算</a></div></div>',
	        init: $.noop
	    },

	    //我的资产
	    history_list: {
	        title: '我的积分',
	        content: '<div class="ibar_plugin_content"><div class="ia-head-list"><a href="#" target="_blank" class="pl"><div class="num">0</div><div class="text">积分</div></a></div><div class="ga-expiredsoon"><div class="es-head">积分交易历史</div><div class="ia-none">您还没有进行过积分交易哦</div></div><div class="ga-expiredsoon"><div class="es-head">积分购买产品</div><div class="ia-none">您还没有用积分购买过产品哦</div></div></div>',
	        init: $.noop
	    },
	    mpbtn_histroy: {
	        title: '我的足迹',
	        content: '<div class="ibar_plugin_content"><div class="ibar-history-head">共3件产品<a href="#">清空</a></div><div class="ibar-moudle-product"><div class="imp_item"><a href="#" class="pic"><img src="images/xiez.jpg" width="100" height="100" /></a><p class="tit"><a href="#">夏季透气真皮豆豆鞋反绒男士休闲鞋韩</a></p><p class="price"><em>￥</em>649.00</p><a href="#" class="imp-addCart">加入购物车</a></div><div class="imp_item"><a href="#" class="pic"><img src="images/xiez.jpg" width="100" height="100" /></a><p class="tit"><a href="#">夏季透气真皮豆豆鞋反绒男士休闲鞋韩</a></p><p class="price"><em>￥</em>649.00</p><a href="#" class="imp-addCart">加入购物车</a></div><div class="imp_item"><a href="#" class="pic"><img src="images/xiez.jpg" width="100" height="100" /></a><p class="tit"><a href="#">夏季透气真皮豆豆鞋反绒男士休闲鞋韩</a></p><p class="price"><em>￥</em>649.00</p><a href="#" class="imp-addCart">加入购物车</a></div></div></div>',
	        init: $.noop
	    },
	    mpbtn_wdsc: {
	        title: '我的收藏',
	        content: '<div class="ibar_plugin_content"><div class="ibar_cart_group ibar_cart_product"><ul><li class="cart_item"><div class="cart_item_pic"><a href="#"><img src="images/xiez.jpg" /></a></div><div class="cart_item_desc"><a href="#" class="cart_item_name">夏季透气真皮豆豆鞋反绒男士休闲鞋韩版磨砂驾车鞋英伦船鞋男鞋子</a><div class="cart_item_sku"><span>尺码：38码（精工限量版）</span></div><div class="cart_item_price"><span class="cart_price">￥700.00</span><a href="#" class="sc" title="删除"><img src="images/sc.png" alt="删除" /></a></div></div>	</li></ul></div><div class="cart_handler"><a href="#" class="cart_go_btn jiaru" target="_blank">加入购物车</a></div></div>',
	        init: $.noop
	    },
	    mpbtn_recharge: {
	        title: '我常买',
	        content: '<div class="ibar_plugin_content"><div class="ibar-history-head">共3件产品<a href="#">清空</a></div><div class="ibar-moudle-product"><div class="imp_item"><a href="#" class="pic"><img src="images/xiez.jpg" width="100" height="100" /></a><p class="tit"><a href="#">夏季透气真皮豆豆鞋反绒男士休闲鞋韩</a></p><p class="price"><em>￥</em>649.00</p><a href="#" class="imp-addCart">加入购物车</a></div><div class="imp_item"><a href="#" class="pic"><img src="images/xiez.jpg" width="100" height="100" /></a><p class="tit"><a href="#">夏季透气真皮豆豆鞋反绒男士休闲鞋韩</a></p><p class="price"><em>￥</em>649.00</p><a href="#" class="imp-addCart">加入购物车</a></div><div class="imp_item"><a href="#" class="pic"><img src="images/xiez.jpg" width="100" height="100" /></a><p class="tit"><a href="#">夏季透气真皮豆豆鞋反绒男士休闲鞋韩</a></p><p class="price"><em>￥</em>649.00</p><a href="#" class="imp-addCart">加入购物车</a></div></div></div>',
	        init: $.noop
	    }
	};

    //showQuickPop
    var
	prevPopType,
	prevTrigger,
	doc = $(document),
	popDisplayed = false,
	hideQuickPop = function () {
	    if (prevTrigger) {
	        prevTrigger.removeClass('current');
	    }
	    popDisplayed = false;
	    prevPopType = '';
	    quickPop.hide();
	    quickPop.animate({ left: 0, queue: true });
	},
	showQuickPop = function (type) {
	    if (quickPopXHR && quickPopXHR.abort) {
	        quickPopXHR.abort();
	    }
	    if (type !== prevPopType) {
	        var fn = quickDataFns[type];
	        quickPop.html(ds.tmpl(popTmpl, fn));
	        fn.init.call(this, fn);
	    }
	    doc.unbind('click.quick_links').one('click.quick_links', hideQuickPop);

	    quickPop[0].className = 'quick_links_pop quick_' + type;
	    popDisplayed = true;
	    prevPopType = type;
	    quickPop.show();
	    quickPop.animate({ left: -320, queue: true });
	};
    quickShell.bind('click.quick_links', function (e) {
        e.stopPropagation();
    });
    quickPop.delegate('a.ibar_closebtn', 'click', function () {
        quickPop.hide();
        quickPop.animate({ left: 0, queue: true });
        if (prevTrigger) {
            prevTrigger.removeClass('current');
        }
    });

    //通用事件处理
    var
	view = $(window),
	quickLinkCollapsed = !!ds.getCookie('ql_collapse'),
	getHandlerType = function (className) {
	    return className.replace(/current/g, '').replace(/\s+/, '');
	},
	showPopFn = function () {
	    var type = getHandlerType(this.className);
	    if (popDisplayed && type === prevPopType) {
	        return hideQuickPop();
	    }
	    showQuickPop(this.className);
	    if (prevTrigger) {
	        prevTrigger.removeClass('current');
	    }
	    prevTrigger = $(this).addClass('current');
	},
	quickHandlers = {
	    //购物车，最近浏览，商品咨询
	    message_list: showPopFn,
	    history_list: showPopFn,
	    mpbtn_histroy: showPopFn,
	    mpbtn_wdsc: showPopFn,
	    mpbtn_recharge: showPopFn,
	    //返回顶部
	    return_top: function () {
	        ds.scrollTo(0, 0);
	        hideReturnTop();
	    }
	};
    quickShell.delegate('a', 'click', function (e) {
        var type = getHandlerType(this.className);
        if (type && quickHandlers[type]) {
            // Jiang Ping
            quickDataFns.mpbtn_wdsc.content = aaaaa;
            quickHandlers[type].call(this);
        }
    });

    //Return top
    var scrollTimer, resizeTimer, minWidth = 1350;

    function resizeHandler() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(checkScroll, 160);
    }

    function checkResize() {
        quickShell[view.width() > 1340 ? 'removeClass' : 'addClass']('quick_links_dockright');
    }
    function scrollHandler() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkResize, 160);
    }
    function checkScroll() {
        view.scrollTop() > 100 ? showReturnTop() : hideReturnTop();
    }
    function showReturnTop() {
        quickPanel.addClass('quick_links_allow_gotop');
    }
    function hideReturnTop() {
        quickPanel.removeClass('quick_links_allow_gotop');
    }
    view.bind('scroll.go_top', resizeHandler).bind('resize.quick_links', scrollHandler);
    quickLinkCollapsed && quickShell.addClass('quick_links_min');
    resizeHandler();
    scrollHandler();
});