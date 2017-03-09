/**
 * Created by Administrator on 2017/2/15.
 */
$(document).ready(function(){

    user_log()
    isLogin()

    $("#change_username").text($.cookie("username"))

    $("#Change_Persion_btn").click(function(){
        test_ChangeForm()
    })

})



function  Change_Person() {

    var ChangePersonForm = new FormData($("#ChangForm")[0])

    ChangePersonForm.append("username",$.cookie("username"))
    $.ajax({
        url: "/change_per_info/",
        type: 'POST',
        processData: false,
        contentType: false,
        data: ChangePersonForm,
        success: function (data) {
            data = JSON.parse(data)
            if(data["result"] == "succ")
            {
                $("#ChangForm .prompt").text("修改信息成功！")
                $.cookie("username",null,{path:'/'})
                user_log()
                isLogin()
            }else
            {
                 $("#ChangForm .prompt").text("服务器异常，修改失败")
            }
        },
        /*XMLHttpRequest, textStatus, errorThrown*/
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        },
    })
}


function  test_ChangeForm()
{

    pwd = $("#change_pwd").val()
    re_pwd = $("#change_pwd_2").val()
    email = $("#change_email").val()
    age =$("#change_age").val()
    sex = $("#change_age").val()
    tel = $("#change_tel").val()


    /*var Form = {"email":"邮箱","tel":"联系方式","re_pwd":"重复密码","pwd":"密码","age":"年龄","sex":"性别"}*/

    if(pwd == "" || re_pwd=="" || email=="" ||age=="" || sex=="" || tel=="")
    {
        $("#ChangForm .prompt").text("信息填写不完整，请检查信息")
        return
    }

    if(!tel.match(/^1[3|4|5|8][0-9]\d{4,8}$/) && !tel.match(/^0\d{2,3}-\d{5,9}|0\d{2,3}-\d{5,9}/))
    {
         $("#ChangForm .prompt").text("联系方式格式不正确，请检查输入")
        return
    }
    if(!age.match(/^[0-9]*$/))
    {
        $("#ChangForm .prompt").text("年龄必须为数字， 请检查输入")
        return
    }
    if(pwd != re_pwd)
    {
        $("#ChangForm .prompt").text("两次输入密码不一致，请检查输入")
        return
    }

    if (pwd.length<6)
    {
        $("#ChangForm .prompt").text("密码为6位以上字母数字组合")
        return
    }
    if(!email.match(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/))
    {
         $('#ChangForm .prompt').text("邮箱地址格式不正确")
        return
    }

     $("#ChangForm .prompt").text("修改个人信息校验中...")
    Change_Person()
}
