/**
 * Created by Administrator on 2017/2/19.
 */
  user = $.cookie("username")
  trans_info = {}
  var user_info = {}
$(document).ready(function(){

    user_log()
    trans_info["username"] = user
    status =  data.succ
    data = JSON.parse(data.data)

    if(status == "false")
    {
        location.href="../index"
        return
    }
    disp_event_info(data)
})

function disp_event_info(data)
{
        trans_info["event"] = data[0].pk
        console.info(trans_info)

        fields = data[0].fields
        var event_status = fields["status"]
    console.info(event_status)
        var publisher = fields["publisher"]
        var publish_time = fields["publish_time"]
        var receiver = fields["receiver"]
        var money = fields["money"]
        var title = fields["title"]
        var event_Img = fields["event_Img"]
        var content = fields["content"]

        status_string = eventStatus(event_status)

        element = "<div class='navbar-left event_span'>\
                            <span class='glyphicon glyphicon-pencil'></span>\
                            <span> "+publish_time+"</span>\
                        </div>\
                        <div class='navbar-left event_span'>\
                            <span class='glyphicon glyphicon-user'></span>\
                            <span>"+publisher+"</span>\
                        </div>\
                        <div class='navbar-right event_span'>\
                            <span class='glyphicon glyphicon-eye-open'></span>\
                            <span id='status_string'>"+status_string+"</span>\
                        </div>\
                         <div class='navbar-right event_span'>\
                            <span class='glyphicon glyphicon-heart'></span>\
                            <span>"+money+"</span>\
                        </div>"
    $('.event_top').append(element)

     try {
                 var event_Img = fields["event_Img"]
                 var imgs = event_Img.split(",")
                 for (var j = 0; j < imgs.length - 1; j++)
                 {
                   element = '<div class="item">\
                                    <img src="../static/upload/'+imgs[j]+'" class="center" alt="First slide">\
                               </div>'
                     $(".carousel-inner").append(element)
                 }
                 $(".item:first").addClass('active')
             }catch(err)
             {
                 $("#event_right").addClass('hidden')
                $("#event_left").removeClass('col-xs-6')
             }

    $("#title_h3").text(title)
    $("#event_content_area").text(content)


    console.info(event_status)
    if(event_status == 'false')
    {
        if(publisher == user)
            $("#status_del_btn").removeClass('hidden')
        else
            $("#status_r_btn").removeClass('hidden')
    }
    else if(event_status == 'ing'){
       if(publisher == user)
            $("#status_p_btn").removeClass('hidden')
        else
            $("#status_t_btn").removeClass('hidden')
    }
    else{
        console.info("343453")
         $("#status_r_btn").removeClass('hidden')
         $("#status_r_btn button").removeClass("btn-warning")
         $('#event_btn_group button').attr('disabled',"true")
    }

    if(user == undefined || user == 'null')
    {
        $('#event_btn_group button').attr('disabled',"true")
    }

}

function receive_event_btn(){

    $.ajax({
        url:'/receive/',
        type:'POST',
        data:trans_info,
        success:function(data){
            data = JSON.parse(data)
            eve_id = data["id"]
            location.href = "../page/?id="+eve_id
        },
        error:function(){

        }
    })

}
function pub_succ_btn(){

    $.ajax({
        url:'/pub_confirm/',
        type:'POST',
        data:trans_info,
        success:function(data){
            data = JSON.parse(data)
            eve_id = data["id"]
            location.href = "../page/?id="+eve_id
        },
        error:function(){

        }
    })

}

function pub_del_btn(){

    $.ajax({
        url:'/pub_cancel/',
        type:'POST',
        data:trans_info,
        success:function(data){
            data = JSON.parse(data)
            eve_id = data["result"]
            location.href = "../index"
        },
        error:function(){

        }
    })

}

function rec_succ_btn(){

    $.ajax({
        url:'/rec_confirm/',
        type:'POST',
        data:trans_info,
        success:function(data){
            data = JSON.parse(data)
            eve_id = data["id"]
            location.href = "../page/?id="+eve_id
        },
        error:function(){

        }
    })

}

function rec_del_btn(){

    $.ajax({
        url:'/rec_cancel/',
        type:'POST',
        data:trans_info,
        success:function(data){
            data = JSON.parse(data)
            eve_id = data["id"]
            location.href = "../page/?id="+eve_id
        },
        error:function(){

        }
    })

}

function login(){

    var user = $('#login_username').val()
    var pwd = $('#login_pwd').val()
/*
*  <div class="prompt empt hidden">用户名或密码不能为空</div>
                                    <div class="prompt erro hidden">用户名或密码不正确</div>
* */
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
                $('#myTab li:first').addClass('active')
                $('#myTab li:last').removeClass('active')
                return
            }else if(result == "done"){
                $('#ios .prompt').text("用户已存在！")
                $('#ios .prompt').removeClass('hidden')
            }else{
                 $('#ios .prompt').text("未知原因失败，请联系管理员")
                $('#ios .prompt').removeClass('hidden')
            }
        },
        error:function(){


        }
    })


}
