(function(){
    $(document).ready(function(){
        $("#header .left-floor-menu-open").html("展开");
        $("#header .left-floor-menu-open").bind("click", function () {
                if($("#header .left-floor-menu-open").html()=="展开")
                {
                    $("#header .left-floor-menu").animate({left:"0"},500);
                    $("#header .left-floor-menu-open").html("关闭");
                }
                else if($("#header .left-floor-menu-open").html()=="关闭"){
                    $("#header .left-floor-menu").animate({left:"-102px"},500);
                    $("#header .left-floor-menu-open").html("展开");
                }
            }
        )
        $("#hot-recommend-module-control").bind("click", function () {
            var current_window_height= $("body").scrollTop()?$("body").scrollTop():$("html,body").scrollTop();
            if(current_window_height<$("#header").outerHeight()){
                $("html,body").animate({scrollTop:$(".hot-recommend-module").offset().top-110},200);
            }
            else{
                $("html,body").animate({scrollTop:$(".hot-recommend-module").offset().top-55},200);
            }

        });
        $("#beauty-skin-module-control").bind("click", function () {
            $("html,body").animate({scrollTop:$(".beauty-skin-module").offset().top-55},200);
        });
        $("#casual-wear-module-control").bind("click", function () {
            $("html,body").animate({scrollTop:$(".casual-wear-module").offset().top-55},200);
        });
        $("#digital-technology-module-control").bind("click", function () {
            $("html,body").animate({scrollTop:$(".digital-technology-module").offset().top-55},200);
        });

        function judge_high_light(){
            var current_window_height= $("body").scrollTop()?$("body").scrollTop():$("html,body").scrollTop();
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
            var hot_recommend_module_height=$(".hot-recommend-module").offset().top-100;
            var beauty_skin_module_height=$(".beauty-skin-module").offset().top-100;
            var casual_wear_module_height=$(".casual-wear-module").offset().top-100;
            var digital_technology_module_height=$(".digital-technology-module").offset().top-100;
            if(current_window_height>=hot_recommend_module_height&&current_window_height<beauty_skin_module_height){
                    $("#header .left-floor-menu li:eq(0) a").css({"background-color":"#000000"});
                    $("#header .left-floor-menu li:gt(0) a").css({"background-color":""});
            }
            else if(current_window_height>=beauty_skin_module_height&&current_window_height<casual_wear_module_height){
                    $("#header .left-floor-menu li:eq(1) a").css({"background-color":"#000000"});
                    $("#header .left-floor-menu li:gt(1) a").css({"background-color":""});
                    $("#header .left-floor-menu li:eq(0) a").css({"background-color":""});
            }
            else if(current_window_height<digital_technology_module_height&&current_window_height>=casual_wear_module_height){
                    $("#header .left-floor-menu li:eq(2) a").css({"background-color":"#000000"});
                    $("#header .left-floor-menu li:lt(2) a").css({"background-color":""});
                    $("#header .left-floor-menu li:eq(3) a").css({"background-color":""});
            }
            else if(current_window_height>=digital_technology_module_height&&current_window_height<(digital_technology_module_height+$(".main-wrap").outerHeight(true))){
                    $("#header .left-floor-menu li:eq(3) a").css({"background-color":"#000000"});
                    $("#header .left-floor-menu li:lt(3) a").css({"background-color":""});
            }
            else{
                    $("#header .left-floor-menu li a").css({"background-color":""});
            }

        };
        window.onscroll= function () {
            judge_high_light();
        }


    })
})();