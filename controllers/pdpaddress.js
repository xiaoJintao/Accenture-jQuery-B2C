$(function() {
		firstGetProvince();
	});
	
	var currentProvince = "";
	var currentCity = "";
	var currentArea = "";
	var currentProvinceName = "";
	var currentCityName = "";
	var currentAreaName = "";

	function firstGetProvince() {
		var options = {
			url : '/b2cstorefront/acnb2c/zh/atg/editGetDeliveryCostRegions',
			data : {
				provinceIsoCode : '',
				cityCode : ''
			},
			type : 'GET',
			success : function(data) {
				$("#store-selector .text").after(data);
				//chooseProvince();
				attachOnChangeFunctionOntoProvinceSelector();
				//ACC.address.bindChinaUpdateAddressForm(); 
			}
		};
		$.ajax(options);
	}
	function attachOnChangeFunctionOntoProvinceSelector() {
		$("#stock_province_item")
				.find("a")
				.click(
						function() {
							var provincename = $(this).text();
							var provincecode = $(this).attr("data-value");
							currentProvince = provincecode;
							currentProvinceName = provincename;
							var options = {
								//url: '/b2cstorefront/acnb2c/zh/atg/editGetDeliveryCostCity',
								url : '/b2cstorefront/acnb2c/zh/atg/editGetDeliveryCostCity',
								data : {
									provinceIsoCode : provincecode,
									cityCode : ''
								},
								type : 'GET',
								success : function(data) {
									var html = "";
									var longhtml = [];
									var longerhtml = [];
									var result = eval(data);
									if (result && result.length > 0) {
										for (var i = 0, j = result.length; i < j; i++) {
											result[i].name = result[i].name
													.replace(" ", "");
											if (result[i].name.length > 12) {
												longerhtml = longerhtml
														+ "<li class='longer-area'><a href='#none' data-value='"+result[i].code+"'>"
														+ result[i].name
														+ "</a></li>";
											} else if (result[i].name.length > 5) {
												longhtml = longhtml
														+ "<li class='long-area'><a href='#none' data-value='"+result[i].code+"'>"
														+ result[i].name
														+ "</a></li>";
											} else {
												html = html
														+ "<li><a href='#none' data-value='"+result[i].code+"'>"
														+ result[i].name
														+ "</a></li>";
											}
										}
									}
									html = html + (longhtml + "");
									html = html + (longerhtml + "");
									$("#stock_province_item").hide();
									$("#JD-stock .tab li").eq(0).removeClass(
											"curr").find("em").html(
											provincename);
									$("#JD-stock .tab li")
											.eq(1)
											.addClass("curr")
											.show()
											.find("em")
											.html(
													'请选择');
									$("#JD-stock .tab li").eq(2).hide();
									$("#JD-stock .tab li").eq(3).hide();
									$("#stock_city_item").show();
									$("#stock_area_item").hide();
									$("#stock_town_item").hide();
									$("#stock_city_item .area-list").html(html);
									attachOnChangeFunctionOntoCitySelector();
								}
							};
							$.ajax(options);

						})
	}

	function attachOnChangeFunctionOntoCitySelector() {
		$("#stock_city_item")
				.find("a")
				.click(
						function() {
							var cityname = $(this).text();
							var citycode = $(this).attr("data-value");
							currentCity = citycode;
							currentCityName = cityname;
							var options = {
								//url: '/b2cstorefront/acnb2c/zh/atg/editGetDeliveryCostCity',
								url : '/b2cstorefront/acnb2c/zh/atg/editGetDeliveryCostCityDis',
								data : {
									provinceIsoCode : '',
									cityCode : citycode
								},
								type : 'GET',
								success : function(data) {
									var html = "";
									var longhtml = [];
									var longerhtml = [];
									var result = eval(data);
									if (result && result.length > 0) {
										for (var i = 0, j = result.length; i < j; i++) {
											result[i].name = result[i].name
													.replace(" ", "");
											if (result[i].name.length > 12) {
												longerhtml = longerhtml
														+ "<li class='longer-area'><a href='#none' data-value='"+result[i].code+"'>"
														+ result[i].name
														+ "</a></li>";
											} else if (result[i].name.length > 5) {
												longhtml = longhtml
														+ "<li class='long-area'><a href='#none' data-value='"+result[i].code+"'>"
														+ result[i].name
														+ "</a></li>";
											} else {
												html = html
														+ "<li><a href='#none' data-value='"+result[i].code+"'>"
														+ result[i].name
														+ "</a></li>";
											}
										}
									}
									html = html + (longhtml + "");
									html = html + (longerhtml + "");
									$("#stock_city_item").hide();
									$("#JD-stock .tab li").eq(1).removeClass(
											"curr").find("em").html(cityname);
									$("#JD-stock .tab li")
											.eq(2)
											.addClass("curr")
											.show()
											.find("em")
											.html(
													'请选择');
									$("#JD-stock .tab li").eq(3).hide();
									$("#stock_town_item").hide();
									$("#stock_area_item").show();
									$("#stock_area_item .area-list").html(html);
									attachOnChangeFunctionOntoAreaSelector();
								}
							};
							$.ajax(options);
						})
	}

	function attachOnChangeFunctionOntoAreaSelector() {
		$("#stock_area_item")
				.find("a")
				.click(
						function() {
							var areaname = $(this).text();
							var areacode = $(this).attr("data-value");
							currentArea = areacode;
							currentAreaName = areaname;
							var productcode = '816262';
							var options = {
								url : '/b2cstorefront/acnb2c/zh/atg/getDeliveryCost',
								data : {
									provinceIsoCode : currentProvince,
									cityCode : currentCity,
									citydistrict : areacode,
									productcode : productcode
								},
								type : 'GET',
								success : function(data) {
									$('#store-selector').removeClass('hover');
									var html = ""
									html = html + "<p>" + currentProvinceName
											+ "" + currentCityName + ""
											+ currentAreaName + "</p>"
									$("#store-selector .text").html(html);
									var result = eval("(" + data + ")");
									if (null != result.deliveryCostValue
											&& result.deliveryCostValue == '0.0') {
										$("#store-prompt .text")
												.html(
														'免费');
									} else {
										$("#store-prompt .text").html(
												"¥" + result.deliveryCostValue);
									}

								}
							};
							$.ajax(options);
						})
	}

	function changeProvince() {
		$("#JD-stock .tab li").removeClass("curr");
		$("#JD-stock .tab li").eq(0).addClass("curr").show();
		$("#stock_province_item").show();
		$("#stock_city_item").hide();
		$("#stock_area_item").hide();
		$("#stock_town_item").hide();
		$("#JD-stock .tab li").eq(1).hide();
		$("#JD-stock .tab li").eq(2).hide();
		$("#JD-stock .tab li").eq(3).hide();
	}

	function changeCity() {
		$("#JD-stock .tab li").removeClass("curr");
		$("#JD-stock .tab li").eq(1).addClass("curr").show();
		$("#stock_province_item").hide();
		$("#stock_city_item").show();
		$("#stock_area_item").hide();
		$("#stock_town_item").hide();
		$("#JD-stock .tab li").eq(2).hide();
		$("#JD-stock .tab li").eq(3).hide();
	}