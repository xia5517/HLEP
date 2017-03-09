/**
 * Created by Administrator on 2017/2/15.
 */

function user_log(){
     if($.cookie("username") != undefined && $.cookie("username") != 'null')
     {
         $('#btn_login').addClass('hidden')
         $('#btn_sign').addClass('hidden')
         $('#btn_session_style').removeClass('hidden')
         $('#btn_session').text($.cookie("username"))
         $('#btn_session').addClass('succ_session')
         $('#btn_quit').removeClass('hidden')


         $('#btn_session').click();

     }else
     {
         $('#btn_login').removeClass('hidden')
         $('#btn_sign').removeClass('hidden')
         $('#btn_quit').addClass('hidden')
         $('#btn_session_style').addClass('hidden')
     }


    $("#btn_quit").click(function(){
    $.cookie('username', null, {  path: '/' });
    location.href="../index"
})

}

function isLogin(){
    if($.cookie("username") == undefined || $.cookie("username") == 'null')
    {
          location.href="../index"
    }
}

function eventStatus(event_status){
    if (event_status == 'false') {
            return  "可接取"
        } else if(event_status == 'true'){
            return "已完成"
        }else{
            return "进行中"
        }
}
