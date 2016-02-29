
jQuery(document).ready(function($){
initList();
bindItemHover("all-pics");
moreOrless("choose");

var oWidth = $(window).width();
changem();
function changem(){
	var ewidth=$('#box').width();
	if(ewidth>90){
		$(".one-pic em").css({
		"position":"absolute",
		"top":"14%",
		"left":ewidth/2-45+'px',
	});
	}
}

$(window).resize(function(){
	changem();
});
secondJump();
function secondJump() {
	var $jump = $(".second-main .jump input");
	$jump.keydown(function(event){
		if(event.keyCode==13){
			var page = $(this).val();
			var check = false;
			$(".second-main .page-choose a").each(function(){
				if($(this).text() == page && page != "<<" && page != ">>"){
					$(this).click();
					check = true;
					return ;
				}
			});
			if(!check){
				alert("你输入的页面有误！");
			}	
		}
	});
}

	 function mouseoverHandler(e){
	 	var outer = $(".second-main .first");
	 	var list = $(".second-main .first > li");

		for(var i=0 ; i< list.length;i++){
			list[i].className = '';
		}
		for(var i=0 ; i<outer.length;i++){
			outer[i].childNodes[1].childNodes[3].innerHTML = "+";
		}
		e.childNodes[1].className = "active-list";
		e.childNodes[3].className = "active";
		e.childNodes[1].childNodes[3].innerHTML = "-"

	 }

	 function headChoose(e){
	 	var listHead = $("#headChooseUl > li");
		var listHeadA = $("#headChooseUl > li>a");
		for(var i=0;i<listHead.length;i++){
			listHead[i].className='title-item';
		}
		for(var i=0;i<listHeadA.length;i++){
			
			listHeadA[i].style.color='#fff';

		}
		e.className="head-choose";
		e.childNodes[0].style.color = "rgb(6,50,87)";
	 }

	 function headChooseOut(e){
	 	var listHead = $("#headChooseUl > li");
		var listHeadA = $("#headChooseUl > li>a");
		for(var i=0;i<listHead.length;i++){
			listHead[i].className='title-item';
		}
		for(var i=0;i<listHeadA.length;i++){
			
			listHeadA[i].style.color='#fff';
		}
		listHead[0].className="head-choose";
		listHead[0].childNodes[0].style.color = "rgb(6,50,87)";
	 }

	function initList(){
		var outer = $(".first");
		var listHead = $("#headChooseUl > li");
		for (var i = 0; i < outer.length; i++) {
			outer[i].onclick =function() {
				mouseoverHandler(this);
			};
		}
		for(var j=0 ; j< listHead.length;j++){

			listHead[j].onmouseover = function(){
				headChoose(this);
			}
			listHead[j].onmouseout = function(){
				headChooseOut(this);
			}
		}
	}

	function bindItemHover(id){
		var listItem = $("#"+id).find(".box");
		$(".second-main .hide-show").css({"background-color":"rgb(253,253,253)"});
		listItem.bind("mouseenter", function(){
			var aLink = $(this).find(".one-pic");
			var i = $(this).find("i");
			$(this).stop();
			i.stop();
			i.css("display","inline");
			i.animate({
				opacity: "1"
			},300);
			aLink.stop();
			aLink.animate({
				height: "120px"
			},300);
			$(".second-main .hide-show").css({"background-color":"#fff"});
		});

		listItem.bind("mouseleave", function(e){
			var aLink = $(this).find(".one-pic");
			var i = $(this).find("i");
			$(this).stop();
			aLink.stop();
			i.stop();
			i.animate({
				opacity: "0"
			},300);
			i.css("display","inline");
			aLink.animate({
				height:"220px"
			},300);
			$(".second-main .hide-show").css({"background-color":"rgb(253,253,253)"});
		});
	}

	function moreOrless(id){
		var ulList = $("#"+id).find("ul");
		
		for(var i=0;i<ulList.length ;i++){
			// alert(ulList[i].children.length);
			if(ulList[i].children.length>8){
				packUp(ulList[i]);
			}		
		}
	}

	function packUp(theUl){
		var liList = theUl.children;
		for(var i=6;i<liList.length -2;i++){
			liList[i].style.display = 'none';
			
		}
		$(theUl).find(".showMore").css("display","inline");
	}

	

	var showMore = $(".showMore");
	var packUpAll = $(".packUp");
	for(var i=0 ; i<showMore.length ; i++){
		showMore[i].onclick = function(e){
			e= e||window.event;
			var el=e.srcElement ? e.srcElement : e.target;
			$(el).parent().parent().children("#selection").css("display","inline");
			$(el).parent().parent().children("#packUp").css("display","inline");
			$(el).parent().css("display","none");
			var chooseHeight = $(el).parent().parent().parent().parent().parent().children(".choose-right").css("height");
			var currentHeight = parseInt(chooseHeight);
			// alert(currentHeight);
			$(el).parent().parent().parent().parent().parent().children(".choose-left").css("height",currentHeight);
		}
	}

	for(var i=0 ; i<packUpAll.length ; i++){
		packUpAll[i].onclick = function(e){
			e= e||window.event;
			var el= e.srcElement ? e.srcElement : e.target;
			packUp(el.parentNode.parentNode);
			$(el).parent().parent().children("#showMore").css("display","inline");
			$(el).parent().css("display","none");
			var chooseHeight = $(el).parent().parent().parent().parent().parent().children(".choose-right").css("height");
			var currentHeight = parseInt(chooseHeight);
			$(el).parent().parent().parent().parent().parent().children(".choose-left").css("height",currentHeight);
		}
	}

	var allSelect = $(".second-main .content");
	for(i =0 ; i< allSelect.length ; i++){
		allSelect[i].onclick = function(e){
			e = e||window.event;
			var el = e.srcElement ? e.srcElement : e.target;
			$(el).parent().parent().children("#selection").css("background-color","");
			$(el).parent().css("background-color","rgb(34,100,186)");
			$(el).parent().parent().find("a").css("color",'rgb(92,95,100)');
			$(el).css("color","#fff");
			$(el).parent().parent().parent().children(".allWword").css("background-color","rgb(249,249,249)");
			$(el).parent().parent().parent().children(".allWword").children().css("color","rgb(92,95,100)");
		}
	}
	var allWord = $(".allWword");
	for(i=0 ; i<allWord.length ; i++){
		allWord[i].onclick =function(e){
			e = e||window.event;
			var el = e.srcElement ? e.srcElement : e.target;
			$(el).parent().parent().children("ul").children("#selection").css("background-color","");
			$(el).parent().parent().children("ul").children("#selection").children().css("color","rgb(92, 95, 100)");
			$(el).css("color","#fff");
			$(el).parent().css("background-color","rgb(34,100,186)");
		}
	}
// 排序
	var order = $(".paixu>ul>li");
	order.click(function(e){
		order.removeClass("order-now");
		$(this).addClass("order-now");
	})

	var choosePage = $(".page-choose");
	var pageChooseUp = $(choosePage[0]).children("ul").children("li");
	var pageChooseDown = $(choosePage[1]).children("ul").children("li");
	// 翻页
	pageChooseUp.click(function(e){
		pageChooseUp.removeClass("page-now");
		pageChooseDown.removeClass("page-now");
		$(this).addClass("page-now");
		var i = pageChooseUp.index($(this));
		$(pageChooseDown[i]).addClass("page-now");

	});
	pageChooseDown.click(function(e){
		pageChooseDown.removeClass("page-now");
		pageChooseUp.removeClass("page-now");
		$(this).addClass("page-now");
		var i = pageChooseDown.index($(this));
		$(pageChooseUp[i]).addClass("page-now");

	});
	$(".second-main #firstpane .menu_body:eq(0)").show();
	$(".second-main #firstpane p.menu_head").click(function(){
		$(this).addClass("current").next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
		$(this).siblings().removeClass("current");
	});
	  $("#secondpane .menu_body:eq(0)").show();
	$("#secondpane p.menu_head").mouseover(function(){
		$(this).addClass("current").next("div.menu_body").slideDown(500).siblings("div.menu_body").slideUp("slow");
		$(this).siblings().removeClass("current");
	});
});

//点击头部右上角
// function showDiv(targetid,objN){   //
// 	var target=document.getElementById(targetid);
// 	var clickimg=document.getElementById(objN);
// 	if(target){
// 		if (target.style.display=="block") {
// 		target.style.display="none";
// 	} else{
// 		target.style.display="block";
// 	}
// 	}
	
// }



ACC.paginationsort = {

	downUpKeysPressed: false,

	bindAll: function ()
	{
		this.bindPaginaSort();
	},
	bindPaginaSort: function ()
	{
		with (ACC.paginationsort)
		{
			bindSortForm($('#sort_form1'));
			bindSortForm($('#sort_form2'));
		}
	},
	bindSortForm: function (sortForm)
	{
		// if ($.browser.msie)
		// {
		// 	this.sortFormIEFix($(sortForm).children('select'), $(sortForm).children('select').val());
		// }

		sortForm.change(function ()
		{
			// if (!$.browser.msie)
			// {
			// 	this.submit();
			// }
			// else
			// {
				if (!ACC.paginationsort.downUpPressed)
				{
					this.submit();
				}
				ACC.paginationsort.downUpPressed = false;
			// }
		});
	},
	sortFormIEFix: function (sortOptions, selectedOption)
	{
		sortOptions.keydown(function (e)
		{
			// Pressed up or down keys
			if (e.keyCode === 38 || e.keyCode === 40)
			{
				ACC.paginationsort.downUpPressed = true;
			}
			// Pressed enter
			else if (e.keyCode === 13 && selectedOption !== $(this).val())
			{
				$(this).parent().submit();
			}
			// Any other key
			else
			{
				ACC.paginationsort.downUpPressed = false;
			}
		});
	}
};
$(document).ready(function ()
{
	ACC.paginationsort.bindAll();
});