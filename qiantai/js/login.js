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
