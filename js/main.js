
/*確保載入好jQuery後再去執行裡面的程式碼*/
$(document).ready(() => { 
    $(".bar").on("click",() => {
            $(".navItem").toggleClass('active');
            $("nav").toggleClass('active');
    });
    
   
    $("#link1").click(()=> {
        //取得顯示內容的位置
        var target = $("#feature").offset().top;
        //滾動到指定位置
        $("html,body").animate({scrollTop:target},1000);
        $(".navItem").toggleClass('active');
        $("nav").toggleClass('active');
    });
    
    $(".float-menu").click(()=> {
        //取得顯示內容的位置
        var target = $(".container").offset().top;
        //滾動到指定位置
        $("html,body").animate({scrollTop:target},800);
    });

    $(".back-btn").click(()=> {
        //取得顯示內容的位置
        var target = $("nav").offset().top;
        //滾動到指定位置
        $("html,body").animate({scrollTop:target},800);
    });

    
});