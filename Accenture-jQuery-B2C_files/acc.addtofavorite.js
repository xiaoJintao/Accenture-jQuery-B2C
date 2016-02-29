$(document).ready(function() {
	 
//	$("#addTofavoriteForm").ajaxForm({
//		complete: function(data) {
//			  var json = eval(data);
//		 }
//	});
	var favoriteButton = $("#addToFavoriteButton");
	var productId = $("#addToFavoriteProductCodePost").val();
	var alreadyAddedText = $("#alreadyAddedText").text();
	var addToFavoriteText = $("#addToFavoriteText").text();
	favoriteButton.click(function(event){
		event.preventDefault();
		var self = $(this);
		var url = $("#addTofavoriteForm").attr("action");
		$.ajax({
		  type: "POST",
		  url: url,
		  data: { productCode: productId },
		  complete: function(data) {
			  var jsonData = JSON.parse(data.responseText);
			  var redirect = jsonData.redirect;
			  if(redirect != undefined) {
				  location.href = redirect;
			  } else {
				  $("#dialog").find("a").attr("href", jsonData.url);
				  $("#dialog").dialog("open");
				  self.text(alreadyAddedText);
				  self.attr('disabled','disabled');
			  }
			  
		  }
		});
	});
	
	var checkAddedURL = $("#checkAddedFrom").attr("action");
	if(productId != undefined) {
		$.ajax({
			type: "GET",
			url: checkAddedURL + "&productCode=" + productId,
			complete: function(data) {
				 var jsonData = JSON.parse(data.responseText);
				 var existed = jsonData.existed;
				 if(existed == "true") {
					 favoriteButton.attr('disabled','disabled');
					 favoriteButton.html(alreadyAddedText);
				 } else {
					 favoriteButton.removeAttr('disabled');
					 favoriteButton.html(addToFavoriteText);
				 }
			}
		});
	}
	


	$("#dialog").dialog({
		autoOpen : false,
		show : {
			effect : "blind",
			duration : 1000
		},
		hide : {
			effect : "explode",
			duration : 1000
		}
	});
	
	$(".favoriteOptionButton").click(function(){
		var id = $(this).attr("id");
		id = id.substring(13);
		var input = $("<input type='hidden' name='removeId' value='" + id + "' />");
		$("#removeFavorite").append(input);
	});
	
	var selectedFavoriteArr = [];
//	$(".selectedFavorite").click(function() {
//	    var checkbox = $(this);
//	    var checkId = checkbox.attr("id").substring(9);
//	    // checkbox will contain a reference to the checkbox   
//	    if (checkbox.is(':checked')) {
//	        // the checkbox was checked 
//	    	if($.inArray( checkId, selectedFavoriteArr ) == -1) {
//	    		selectedFavoriteArr.push(checkId);
//	    	} 
//	    } else {
//	        // the checkbox was unchecked
//	    	if($.inArray( checkId, selectedFavoriteArr ) != -1) {
//	    		selectedFavoriteArr.push(checkId);
//	    		selectedFavoriteArr = $.grep(selectedFavoriteArr, function(value) {
//	    			return value != checkId;
//	    		});
//	    	} 
//	    }
//	});
	$(".batchSubmitButton").attr('disabled','disabled');
	$(".batchSubmitButton").click(function(e){
		if(selectedFavoriteArr.length > 0) {
			for(var selectedIndex = 0; selectedIndex < selectedFavoriteArr.length; selectedIndex++) {
				var input = $("<input type='hidden' name='removeId' value='" + selectedFavoriteArr[selectedIndex] + "' />");
				$("#removeFavorite").append(input);
			}
		}
	});
	
	$(".batchSubmitButton").on("idChanges", function(e){
		var self = $(this);
		if(selectedFavoriteArr.length > 0) {
			self.removeAttr('disabled');
		} else {
			self.attr('disabled','disabled');
		}
	})
	
	$.fn.selectCheckBox = function( options) {
		var opts = $.extend( {}, $.fn.selectCheckBox.defaults, options );
		var self = $(this);
		var selectAllButtons = self.find(opts.selectAll);
		var selectOneButtons = self.find(opts.selectOne);
		var actionButtons = self.find(opts.actionButton);
		//add listener
		selectAllButtons.each(function(){
			$(this).click(function(e){
				var checkbox = $(this);
				if (checkbox.is(':checked')) {
					selectOneButtons.each(function(){
						var checkItem = $(this);
						checkItem.attr('checked', true);
						var checkId = checkItem.attr("id").substring(9);
						if($.inArray( checkId, selectedFavoriteArr ) == -1) {
				    		selectedFavoriteArr.push(checkId);
				    	} 
					});
					selectAllButtons.each(function(){
						$(this).attr('checked', true);
					});
				} else {
					selectOneButtons.each(function(){
						var checkItem = $(this);
						checkItem.attr('checked', false);
						var checkId = checkItem.attr("id").substring(9);
						if($.inArray( checkId, selectedFavoriteArr ) != -1) {
				    		selectedFavoriteArr = $.grep(selectedFavoriteArr, function(value) {
				    			return value != checkId;
				    		});
				    	}
					});
					selectAllButtons.each(function(){
						$(this).attr('checked', false);
					});
				}
				actionButtons.each(function(){
					var actionButtonItem = $(this);
					actionButtonItem.trigger( "idChanges" );
				});
			});
		});
		
		selectOneButtons.each(function(){
			
			var checkbox = $(this);
			checkbox.click(function(){
				var selfCheckbox = $(this);
				var checkId = selfCheckbox.attr("id").substring(9);
			    // checkbox will contain a reference to the checkbox   
			    if (selfCheckbox.is(':checked')) {
			        // the checkbox was checked 
			    	if($.inArray( checkId, selectedFavoriteArr ) == -1) {
			    		selectedFavoriteArr.push(checkId);
			    	} 
			    } else {
			        // the checkbox was unchecked
			    	if($.inArray( checkId, selectedFavoriteArr ) != -1) {
			    		selectedFavoriteArr = $.grep(selectedFavoriteArr, function(value) {
			    			return value != checkId;
			    		});
			    	} 
			    }
			    actionButtons.each(function(){
					var actionButtonItem = $(this);
					actionButtonItem.trigger( "idChanges" );
				});
			});
		   
		});
	};
	
	$.fn.selectCheckBox.defaults = {
		selectAll: ".selectAll",
		selectOne: ".selectOne",
		actionButton: ".actionButton"
	};
	
	$("#removeFavorite").selectCheckBox({
		selectAll: ".selectAllCheckbox",
		selectOne: ".selectedFavorite",
		actionButton: ".batchSubmitButton"
	});
});