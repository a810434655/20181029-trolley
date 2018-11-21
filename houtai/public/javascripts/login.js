// 设置背景衍射
$("#bir").focusin(function() {
    $('.background').css("background-color","#ff9800");
});
$("#iki").focusin(function() {
    $('.background').css("background-color","#03a9f4");
});
$("#bir, #iki").focusout(function() {
    $('.background').css("background-color","");
    var userName=$("#bir").val();
    var pwd=$("#iki").val();
    console.log("进入判断")
    if(userName!="" && pwd!=""){
        $("#tijiao").removeAttr("disabled");
        $("#tijiao").val("可以登录了");
    }
});
var id;
$("#bir").keydown(function () {
    console.log("进入ajax");
    clearInterval(id);

})
$("#bir").keyup(function () {
    var name=$(this).val();
    clearInterval(id);
    if(name!=""){
        id=setInterval(function () {
            $.ajax({
                url:"http://localhost:5000/front/login/uplode",
                type:"get",
                data:{touxiang:name},
                success:function (res) {
                    $(".img").attr("src",res);
                    clearInterval(id);
                }
            })
        },1500);
    }
})
