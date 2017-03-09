/**
 * Created by Administrator on 2017/1/12.
 */
var user_info = {}
$(document).ready(function(){

    user_log()
    get_last_event()


})



function get_last_event(){

     $.ajax({
        type:'POST',
        url:"/upload-event/",
        data:{"data":"11"},
        success:function(data){
            info = JSON.parse(data)["data"]
            disp_last_event(info)
        },
         error:function(XMLHttpRequest, textStatus, errorThrown){

            }
    })


}



function disp_last_event(data)
{


    for (var i = 0; i<data.length; i++)
    {
            id = data[i]["pk"]
            fields = data[i]["fields"]
            var event_status = fields["status"]
            var publisher = fields["publisher"]
            var publish_time = fields["publish_time"]
            var money = fields["money"]
            var title = fields["title"]

           status_string = eventStatus(event_status)

            var element = "<div class='event_box'>\
                                <div class='row event_info' style='padding:0 20px;'> \
                                    <div class='navbar-left text-left col-xs-8' >\
                                        <div class='event_span'>\
                                            <span class='glyphicon glyphicon-pencil'></span>\
                                            <span>"+publish_time+"</span>\
                                        </div>\
                                        <div class='event_span'>\
                                            <span class='glyphicon glyphicon-heart'></span>\
                                            <span>"+money+"</span>\
                                        </div>\
                                    </div>\
                                    <div class='navbar-right text-right col-xs-4'>\
                                        <div class='event_span'>\
                                            <span class='glyphicon glyphicon-user'></span>\
                                            <span>"+publisher+"</span>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class='row event_imgs'  style='padding:0 20px;'>\
                                    <hr  class='event_hr'/>\
                                    <div id='imgs_area"+i+"'></div>\
                                </div>\
                                <hr  class='event_hr'/>\
                                <div class='row event_title' style='padding:0 20px;'>\
                                       <div class='navbar-left text-left col-xs-8'>\
                                           <a href='../page?id="+id+"'>"+title+"</a>\
                                   </div>\
                                   <div class='navbar-right text-right col-xs-4'>\
                                           <div class='event_span'>\
                                                <span class='	glyphicon glyphicon-eye-open'></span>\
                                                <span>"+status_string+"</span>\
                                            </div>\
                                       </div>\
                                   </div>\
                                </div>\
                            </div>\
                            </br>"

             $("#last_event").append(element)


             try {
                 var event_Img = fields["event_Img"]
                 var imgs = event_Img.split(",")
                 for (var j = 0; j < imgs.length - 1; j++)
                 {
                     element = "<img src='../static/upload/" + imgs[j] + "' alt=''/>"
                     $("#imgs_area"+i).append(element)
                 }
             }catch(err)
             {
                $("#imgs_area"+i).parent().addClass( 'hidden')
             }


    }

}



function login(){

    var user = $('#login_username').val()
    var pwd = $('#login_pwd').val()

    if(user == "" || pwd == "")
    {
        $('#home .prompt').text("用户名或密码不能为空")
        $('#home .prompt').removeClass('hidden')
        return
    }

    user_info["username"] = user
    user_info["pwd"] = pwd

    $.ajax({
        type:'POST',
        data:user_info,
        url:"/login/",
        success:function(data){
           var result = data["result"]
            if (result == "true")
            {
                $('#home input').val("")
                $('.login_close').click()


                /*$.cookie('username', user, { expires: 1, path: '/' });*/
                $.cookie('username', user, { path: '/' });
                 user_log()

            }
            else{
                $('#home .prompt').text("用户名或密码不正确")
                $('#home .prompt').removeClass('hidden')
                return
            }
        },
       error: function(XMLHttpRequest, textStatus, errorThrown){
           $('#home .prompt').text("非法的用户密码，请重新登录")
           $('#home .prompt').removeClass('hidden')
           return
        }
    })

}

function regist(){

    var regist_info = {}

    var user = $('#sign_user').val()
    var  pwd = $('#sign_pwd').val()
    var Repwd = $('#sign_Repwd').val()
    var  email = $('#sign_emil').val()

    if(user == "" || pwd =="")
    {
        $('#ios .prompt').text("用户名或密码不能为空")
        $('#ios .prompt').removeClass('hidden')
        return
    }

    if(email == "")
    {
        $('#ios .prompt').text("邮箱地址不能为空")
        $('#ios .prompt').removeClass('hidden')
        return
    }

    if (pwd.length<6)
    {
         $('#ios .prompt').text("密码为6位以上字母数字组合")
        $('#ios .prompt').removeClass('hidden')
        return
    }

    if(pwd != Repwd)
    {
         $('#ios .prompt').text("两次输入密码不一致")
        $('#ios .prompt').removeClass('hidden')
        return
    }
    if(!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/))
    {
         $('#ios .prompt').text("邮箱地址格式不正确")
        $('#ios .prompt').removeClass('hidden')
        return
    }

    regist_info.user = user
    regist_info.pwd = pwd
    regist_info.email = email

    $.ajax({
        url:'/sign/',
        type:'POST',
        data:regist_info,
        success:function(data){
            var result = data["result"]
            if(result == "true")
            {
                $('#ios .prompt').text("注册成功！")
                $('#ios .prompt').removeClass('hidden')
                $('#ios input').val("")
                return
            }else if(result == "done"){
                $('#ios .prompt').text("用户已存在！")
                $('#ios .prompt').removeClass('hidden')
            }else{
                 $('#ios .prompt').text("未知原因失败，请联系管理员")
                $('#ios .prompt').removeClass('hidden')
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){

            }
    })


}