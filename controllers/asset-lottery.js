(function(){
    $(document).ready(function(){

        function lottery_page(){
            var lotteryNumber=0;
            $.getJSON("models/lottery-products.json", function (data) {

                $.each(data, function (index,value) {
                    if(index<8){
                        $("#bigBox .positive-side").eq(index).append("<div class='img-warpper' style='background-image: url("+value.imgSrc+")'></div><div class='title'>"+value.productName+"</div> <div class='price'><span class='ui-yuan'>¥</span>"+value.price+"</div>");
                    }

                    else{
                        $("#bigBox .ctrl-zone").append( "<div class='remain-chance-tips'> 亲，您有 <span id='chanceNumbers'>"+value.lotteryNumber+"</span> 局游戏机会 </div>");
                        if(value.lotteryNumber==0){
                            $("#bigBox .ctrl-zone #start-game").css("background","url(images/btn-no-chance.png) no-repeat center center");
                        }
                    }
                });
                lotteryNumber=data[8].lotteryNumber;
                reserve_all_cards(lotteryNumber,data);
            });
        };
        lottery_page();
        //console.log(lotteryNumber);

        //点击开始将所有卡片翻转到背面
        function reserve_all_cards(number,data){
                $("#bigBox #start-game").bind("click",function(){
                    $("#bigBox .ctrl-zone #start-game").css("background","url(images/btn-no-chance.png) no-repeat center center");
                    $(".item").addClass("positive-flipped");
                    $("#bigBox #chanceNumbers").html(number-1);
                    number=number-1;
                    $("#bigBox .mask").css("display","block")
                    bind_click(number,data);

                    if(number==0){
                        $("#bigBox #start-game").unbind("click");
                    }
                })
        }

        //卡片绑定翻拍事件
        function bind_click(number,data){
            $(".item").bind("click", function () {
                $("#bigBox .mask").css("display","none")
                var i=fRandomBy(0, 7);//后台可通过判定抽取到的是什么商品
                $(this).children(".positive-side").html("<div class='img-warpper' style='background-image: url("+data[i].imgSrc+")'></div><div class='title'>"+data[i].productName+"</div> <div class='price'><span class='ui-yuan'>¥</span>"+data[i].price+"</div>")
                $(this).toggleClass("positive-flipped");

                if(number>0){
                    $("#bigBox .ctrl-zone #start-game").css("background","url(images/btn-start-game.png)  no-repeat center center");
                }
                unbind_click();
            });
        }


        //卡片解绑翻拍事件
        function unbind_click(){
            $(".item").unbind("click");
        }

        //输出指定范围内的随机整数
        function fRandomBy(under, over) {
            switch (arguments.length) {
                case 1:
                    return parseInt(Math.random() * under + 1);
                case 2:
                    return parseInt(Math.random() * (over - under + 1) + under);
                default:
                    return 0;
            }
        }
    })
})();

