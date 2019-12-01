
/*確保載入好jQuery後再去執行裡面的程式碼*/
$(document).ready(() => { 
    $(".bar").on("click",() => {
            $(".navItem").toggleClass('active');
            $("nav").toggleClass('active');
    });

    $(".down-btn").click(()=> {
        //取得顯示內容的位置
        var target = $(".container").offset().top;
        //滾動到指定位置
        $("html,body").animate({scrollTop:target},800);
    });

    $(".up-btn").click(()=> {
        //取得顯示內容的位置
        var target = $("nav").offset().top;
        //滾動到指定位置
        $("html,body").animate({scrollTop:target},800);
    });
    
    $(this).scroll(function(){
        $('#feature div').fadeIn(1000);
    })


    /*-------------------------------------order頁面控制-------------------------------------*/
    //orederlist頁面切換
    $('#page1').siblings().hide();
    $(".option-item li").click(function(){
        $('.show_page').hide();
        $($(this).children().attr('href')).show();
        $('.current').removeClass("current");
        $(this).addClass("current");
    });

    //新增菜色到列表中
    let list =[];
    $('.add').click(function(){
        let current = $(this).prev().prev().prev();
        let dishId = current.attr('id');
        let content = current.html();
        let menu = `
            <tr>
                <td class="${dishId}">${$(this).prev().prev().prev().html()}</td>
                <td><div class="btn btn-2 increase"><img src="./img/add-2.png" width="100%" height="auto"></div><div class="tb-1 btn">1</div><div class="btn btn-2 decrease"><img src="./img/sub.png" width="100%" height="auto"></div></td>
                <td>${$(this).prev().children().html()}</td>
                <td class="cancel-btn"><input type="image" name="cancel" src="./img/cancel.png" width="35px" height="35px" align="center"></td>
            </tr>
            `;
        //確認購物車是否已有該菜品
        function checkOut(dishes){
            return dishes == content;
        }
         
        function addShopping(arr,item){
            if(arr.length ==0){
                arr.push(item);
                $('tbody').append(menu); //加入資訊到明細裡面
            }
            else{
                let exist = list.some(checkOut); //透過陣列確認購物車是否已有該菜品
                if(exist == true){   //有，只修改數量和小計
                    let num = parseInt($('.'+ dishId).next().children().next().html());
                    num++; //取得數量並且更改
                    $('.'+ dishId).next().children().first().next().html(num);

                    let price = parseInt($('#'+ dishId).next().next().children().html()); //從menu-list取得菜色價格
                    let subtotal = price * num;
                    $('.'+ dishId).next().next().html(subtotal);         
                }
                else{   //沒有，將菜色顯示在購物清單中
                    arr.push(item);
                    $('tbody').append(menu);
                }
            }
        }
        addShopping(list,content);
        totalPrice();
    });

    //刪除菜單
    $('tbody').on('click','.cancel-btn',function(){
        let exist = $(this).parent().children().first().html(); //取得菜名
        let num = list.indexOf(exist);  //取得菜名在陣列中的位置
        list.splice(num,1);   //從陣列中把菜色移除
        $(this).parent().remove();  //將該菜名的table的節點移除
        totalPrice(); 
    });

    //增加數量
    $('tbody').on('click','.increase',function(){
        let num = parseInt($(this).next().html());
        num++;
        $(this).next().html(num);
        let dishId = $(this).parent().parent().children().first().attr('class');
        let price = parseInt($('#'+ dishId).next().next().children().html()); //從menu-list取得菜色價格
        let subtotal = price * num;
        $('.'+ dishId).next().next().html(subtotal);   
        totalPrice();
    })

    //減少數量
    $('tbody').on('click','.decrease',function(){
        let num = parseInt($(this).prev().html());
        if(num > 1){ //確認該菜色至少有一份
            num--;
            $(this).prev().html(num);
            let dishId = $(this).parent().parent().children().first().attr('class');
            let price = parseInt($('#'+ dishId).next().next().children().html()); //從menu-list取得菜色價格
            let subtotal = price * num;
            $('.'+ dishId).next().next().html(subtotal);   
            totalPrice();
        }
    })

    //計算總價
    function totalPrice(){
        let sum = 0;
        let trs = $('#items tr');
            for (let i=0; i < trs.length ; i++){
                let td = trs.eq(i).children().eq(2);
                let price = parseInt($(td).html());
                sum = sum + price;
            }
        $('#totalPrice').html(sum);
    };
    
    //<768px時的shop-list
    $('.shop-cart').click(function(){
        $('.total').toggleClass('marginSet').animate(800);
        $('.menu-list').toggleClass('display');
        $('.option').toggleClass('display');
        $('.container').toggleClass('active');
    });

    /*-------------------------------------reservation頁面控制-------------------------------------*/
    //phone rining
    let Ring = setInterval(function(){
                    $('#phone').toggleClass("ring");
                },400);
    setTimeout(function stopRing(){
            clearInterval(Ring);
    },2400);     
    
    let delay = function(s){
        return new Promise(function(resolve,reject){
            setTimeout(resolve,s);
        });
    };
    
    delay().then(function(){
        $('#num1').fadeOut();
        return delay(600);
    }).then(function(){
        $('#num2').fadeOut();
        return delay(600);
    }).then(function(){
        $('#num1').fadeIn();
        return delay(600);
    }).then(function(){
        $('#num2').fadeIn();
        return delay(600);
    });
    
    //
    setTimeout(function(){
        $('.title').fadeIn();
    },1000);
    

   
   
    


});