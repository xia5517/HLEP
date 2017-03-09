/**
 * Created by Administrator on 2017/2/9.
 */
var SAMP = null;        //Dropzone对象

$(document).ready(function(){

    user_log()
    isLogin()

      SAMP = new Dropzone("#dropzone",
    {
              url: "#",  //后台响应的链接
              maxFiles: 4,    //最大可以传输的文件数量  目前我们设定为1
              maxFilesize: 2048, //文件大小的限制
              acceptedFiles: ".png,.jpg,.gif,.jpeg,.bmp", // 文件格式的限制
              autoProcessQueue:false,  //文件是否自动传回到后台
              myAwesomeDropzone:false,
    })



    var myFormData = new FormData()

 SAMP.on("addedfile", function(file) {
    myFormData.append(file.name, file)
   console.info(myFormData.get(file.name))
 })




    $('#pub_submit').click( function(){
        var publish_title = $('#publish_title').val()
        var publish_content = $('#publish_content').val()
        var publish_money = $('#publish_money').val()

        if(publish_title=="" )
        {
            $('#publish .prompt').removeClass('hidden')
            $('#publish .prompt').text("标题不能为空！")

            $('#publish #publish_title').val("")
            $('#publish #publish_content').val("")
            return;
        }

        if(publish_content=="")
            {
            $('#publish .prompt').removeClass('hidden')
            $('#publish .prompt').text("内容不能为空！")

             $('#publish #publish_title').val("")
            $('#publish #publish_content').val("")
                return;
        }


        myFormData.append("publish_title", publish_title)
        myFormData.append("publish_content", publish_content)
        myFormData.append("publish_money",publish_money)
        myFormData.append("publisher",$.cookie("username"))


	    $.ajax({
            type:'POST',
		    url:"/upload-img/",
		    data:myFormData,
            processData: false,
            contentType: false,
		    success:function(data){
                         location.href = "../index"
							     },
		    error:function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    })
})


