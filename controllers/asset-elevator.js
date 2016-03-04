(function(){
    $(document).ready(function(){
        // $("#header .left-floor-menu-open").html("展开");
        // $("#header .left-floor-menu-open").bind("click", function () {
        //         if($("#header .left-floor-menu-open").html()=="展开")
        //         {
        //             $("#header .left-floor-menu").animate({left:"0"},500);
        //             $("#header .left-floor-menu-open").html("关闭");
        //         }
        //         else if($("#header .left-floor-menu-open").html()=="关闭"){
        //             $("#header .left-floor-menu").animate({left:"-102px"},500);
        //             $("#header .left-floor-menu-open").html("展开");
        //         }
        //     }
        // );
        
        // //flags用来判断是否是当前楼层
        // var flags =[];
        // for(var i =0;i<$("#header .left-floor-menu ul li a").length;i++){
        //     flags[i]=false;
        // }
       
        $("#header .left-floor-menu").css("display","none");
        $("#header .left-floor-menu li a:last").css("border-bottom","none");
        $("#header .left-floor-menu-content ul li a").each(function(){     
            $(this).attr("flag",false); 
             });
        $("#header .left-floor-menu").css("display","none");
        
         function hoverChange(selector,overname,outname){
            $(selector).hover(function(){
                $(this).html(overname);
                $(this).css({"color":"#fff","background-color":"#fd8d24"})
             },
             function(){
               $(this).css({"color":"#fd8d24","background-color":""})
                if(!($(this).attr("flag")==="true")){
                    $(this).css("color","#888");
                    $(this).html(outname);
                }      
            }
            );
         } 
         hoverChange("#hot-recommend-module-control","畅销","1F");
         hoverChange("#digital-technology-module-control","数码","2F");
         hoverChange("#casual-wear-module-control","服饰","3F");
         hoverChange("#beauty-skin-module-control","护肤","4F");
       
        
        $("#hot-recommend-module-control").bind("click", function () {           
            $("html,body").animate({scrollTop:$(".hot-recommend-module").offset().top-55},200);
            // $("#hot-recommend-module-control").html("推荐");
          
        });
        $("#digital-technology-module-control").bind("click", function () {
            $("html,body").animate({scrollTop:$(".digital-technology-module").offset().top-55},200);
             // $("#digital-technology-module-control").html("数码");
        });
        $("#casual-wear-module-control").bind("click", function () {
            $("html,body").animate({scrollTop:$(".casual-wear-module").offset().top-55},200);
             // $("#casual-wear-module-control").html("服饰");
        });
        $("#beauty-skin-module-control").bind("click", function () {
            $("html,body").animate({scrollTop:$(".beauty-skin-module").offset().top-55},200);
             // $("#beauty-skin-module-control").html("护肤");
        });
       
        

        function judge_high_light(){
            //var top_height=$("#header").outerHeight(true)+$("#banner_tabs").outerHeight(true)-$(".banner-title").outerHeight()*2;
            //var index_recommend_height=$(".index-recommend").outerHeight(true);
            //var main_wrap_height=$(".main-wrap").outerHeight(true);
            //if(top_height<=current_window_height&&current_window_height<(top_height+index_recommend_height)){
            //    $("#header .left-floor-menu li:eq(0) a").css({"background-color":"#000000"});
            //    $("#header .left-floor-menu li:gt(0) a").css({"background-color":""});
            //
            //}
            //else if((top_height+index_recommend_height)<=current_window_height&&current_window_height<(top_height+index_recommend_height+main_wrap_height)){
            //    $("#header .left-floor-menu li:eq(1) a").css({"background-color":"#000000"});
            //    $("#header .left-floor-menu li:gt(1) a").css({"background-color":""});
            //    $("#header .left-floor-menu li:eq(0) a").css({"background-color":""});
            //
            //}
            //else if((top_height+index_recommend_height+main_wrap_height)<=current_window_height&&current_window_height<(top_height+index_recommend_height+main_wrap_height*2)){
            //    $("#header .left-floor-menu li:eq(2) a").css({"background-color":"#000000"});
            //    $("#header .left-floor-menu li:lt(2) a").css({"background-color":""});
            //    $("#header .left-floor-menu li:eq(3) a").css({"background-color":""});
            //}
            //else if((top_height+index_recommend_height+main_wrap_height*2)<=current_window_height&&current_window_height<(top_height+index_recommend_height+main_wrap_height*3-100)){
            //    $("#header .left-floor-menu li:eq(3) a").css({"background-color":"#000000"});
            //    $("#header .left-floor-menu li:lt(3) a").css({"background-color":""});
            //
            //}
            //else{
            //    $("#header .left-floor-menu li a").css({"background-color":""});
            //}
            var current_window_height = $("body").scrollTop()?$("body").scrollTop():$("html,body").scrollTop();
            var hot_recommend_module_height=$(".hot-recommend-module").offset().top-400;
            var digital_technology_module_height=$(".digital-technology-module").offset().top-400;
           
            var casual_wear_module_height=$(".casual-wear-module").offset().top-400;
            var beauty_skin_module_height=$(".beauty-skin-module").offset().top-400;
           
           
            if(current_window_height >= hot_recommend_module_height&&current_window_height<(beauty_skin_module_height+$(".main-wrap").outerHeight(true))){
                 $("#header .left-floor-menu").css("display","block");
            }else{
                 $("#header .left-floor-menu").css("display","none");
            }
            if(current_window_height>=hot_recommend_module_height&&current_window_height<digital_technology_module_height){
                    $("#header .left-floor-menu ul li a").each(function(){ $(this).attr("flag",false); });
                    // $("#header .left-floor-menu li:eq(0) a").css({"background-color":"#000000"});
                    // $("#header .left-floor-menu li:gt(0) a").css({"background-color":""});
                    $("#header .left-floor-menu li a").css({"color":"#888"});
                    $("#header .left-floor-menu li:eq(0) a").css({"color":"#fd8d24"});
                    $("#digital-technology-module-control").html("2F");
                    $("#hot-recommend-module-control").attr("flag",true).html("畅销");
                    
            }
            else if(current_window_height>=digital_technology_module_height&&current_window_height<casual_wear_module_height){
                    $("#header .left-floor-menu ul li a").each(function(){ $(this).attr("flag",false); });
                    // $("#header .left-floor-menu li:eq(1) a").css({"background-color":"#000000"});
                    // $("#header .left-floor-menu li:gt(1) a").css({"background-color":""});
                    // $("#header .left-floor-menu li:eq(0) a").css({"background-color":""});
                    $("#header .left-floor-menu li a").css({"color":"#888"});
                    $("#header .left-floor-menu li:eq(1) a").css({"color":"#fd8d24"});
                    $("#hot-recommend-module-control").html("1F");
                    $("#casual-wear-module-control").html("3F");
                    $("#digital-technology-module-control").attr("flag",true).html("数码");

            }
            else if(current_window_height>=casual_wear_module_height&&current_window_height<beauty_skin_module_height){
                    $("#header .left-floor-menu ul li a").each(function(){ $(this).attr("flag",false); });
                    // $("#header .left-floor-menu li:eq(2) a").css({"background-color":"#000000"});
                    // $("#header .left-floor-menu li:lt(2) a").css({"background-color":""});
                    // $("#header .left-floor-menu li:eq(3) a").css({"background-color":""});
                    $("#digital-technology-module-control").html("2F");
                    $("#header .left-floor-menu li a").css({"color":"#888"});
                    $("#header .left-floor-menu li:eq(2) a").css({"color":"#fd8d24"});
                    $("#beauty-skin-module-control").html("4F");
                    $("#casual-wear-module-control").attr("flag",true).html("服饰");
            }
            else if(current_window_height>=beauty_skin_module_height&&current_window_height<(beauty_skin_module_height+$(".main-wrap").outerHeight(true))){
                    $("#header .left-floor-menu ul li a").each(function(){ $(this).attr("flag",false); });
                    // $("#header .left-floor-menu li:eq(3) a").css({"background-color":"#000000"});
                    // $("#header .left-floor-menu li:lt(3) a").css({"background-color":""});
                    $("#header .left-floor-menu li a").css({"color":"#888"});
                    $("#header .left-floor-menu li:eq(3) a").css({"color":"#fd8d24"});
                    $("#casual-wear-module-control").html("3F");
                    $("#beauty-skin-module-control").attr("flag",true).html("护肤");
            }
            else{
                    $("#header .left-floor-menu li a").css({"background-color":""});

            }
             

        };
        window.onscroll= function () {
            judge_high_light();
        }
        //  setInterval(function(){            
        //     else{
        //          $("#header .left-floor-menu").css("display","none");
        //     }
        // },200);

    })
})();