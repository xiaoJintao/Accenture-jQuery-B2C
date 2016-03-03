$(function(){
	var priceFilter=$(".OrderMakingUpMain .label .price-filter");
	
	/*priceFilter.each(function(){
		var priceFilterCon = $(this).html();
		var priceFilterStr1 = (priceFilterCon.split("/").slice(-2,-1)).toString();
		var priceFilterStr2 = (priceFilterCon.split("/").slice(-1)).toString();
		$(this).html(priceFilterStr1+"-"+priceFilterStr2)
	})
	priceFilter.eq(0).html("全部");*/
	
	priceFilter.each(function(){
		
		var priceFilterUrl = $(this).attr("href");
		var priceFilterPriceMin = (priceFilterUrl.split("/").slice(-2,-1)).toString();
		var priceFilterPriceMax = (priceFilterUrl.split("/").slice(-1)).toString();
		var minPrice = $("#minPrice").val();
		var maxPrice = $("#maxPrice").val();
		switch(priceFilterPriceMin == minPrice && priceFilterPriceMax == maxPrice){
		case true:
		$(this).css("color","#ff0000").siblings().css("color","");
		break;
		default:break;
		}
	})
	
})