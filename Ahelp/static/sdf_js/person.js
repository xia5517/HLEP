
$(document).ready(function(){

    user_log()
    isLogin()

  SAMP = new Dropzone("#por",
    {
              url: "#",  //后台响应的链接
              maxFiles: 1,    //最大可以传输的文件数量  目前我们设定为1
              maxFilesize: 1024, //文件大小的限制
              acceptedFiles: ".png,.jpg,.gif,.jpeg,.bmp", // 文件格式的限制
              autoProcessQueue:false,  //文件是否自动传回到后台
              myAwesomeDropzone:false,
    })

    user = $.cookie("username")
    $.ajax({
        type:'POST',
        url:"/query_person_info/",
        data:{"user":user},
        success:function(data){
                    disp_person_info(data)
              },
        error:function(XMLHttpRequest, textStatus, errorThrown){
                                            console.info("222")
															       }
    })


   function disp_person_info(data) {

       rec = JSON.parse(data)["rec"]
       pub = JSON.parse(data)["pub"]
       person = JSON.parse(data)["user"]

           for (var i = 0; i < rec.length; i++) {
               id = rec[i]["pk"]
               rec_info = rec[i]["fields"]
               var event_status = rec_info["status"]
               var publisher = rec_info["publisher"]
               var publish_time = rec_info["publish_time"]
               var money = rec_info["money"]
               var title = rec_info["title"]

               status_string = eventStatus(event_status)
                console.info(event_status)
                 var element ="<div class='event_box'>\
                                <div class='row event_info' style='padding:0 20px;'> \
                                    <div class='navbar-left text-left col-xs-8' >\
                                       <div class='event_span'>\
                                           <span class='glyphicon glyphicon-time'></span>\
                                           <span>"+publish_time+"</span>\
                                       </div>\
                                       <div class='event_span'>\
                                           <span class='glyphicon glyphicon-user'></span>\
                                           <span>"+publisher+"</span>\
                                       </div>\
                                    </div>\
                                    <div class='navbar-right text-right col-xs-4'>\
                                        <div class='event_span'>\
                                           <span>"+status_string+"</span>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class='row event_imgs'  style='padding:0 20px;'>\
                                    <hr  class='event_hr'/>\
                                    <div id='imgs_area"+i+"'></div>\
                                </div>\
                                <hr  class='event_hr'/>\
                                <div class='row event_title' style='padding:0 20px;'>\
                                     <a href='../page?id="+id+"'>"+title+"</a>\
                                </div>\
                            </div>\
                            </br>"


                console.info(event_status)
               if(event_status == 'ing')
               {
                   console.info(event_status)
                   $("#history_received_info").append(element)

                    try
                    {
                     var event_Img = rec_info["event_Img"]
                     var imgs = event_Img.split(",")
                     for (var j = 0; j < imgs.length - 1; j++)
                     {
                         element = "<img src='../static/upload/" + imgs[j] + "' alt=''/>"
                         $("#history_received_info #imgs_area"+i).append(element)
                     }
                    }catch(err)
                    {
                    $("#history_received_info #imgs_area"+i).parent().addClass( 'hidden')
                    }
               }
               else
               {
                    $("#history_receive_info").append(element)

                    try
                    {
                     var event_Img = rec_info["event_Img"]
                     var imgs = event_Img.split(",")
                     for (var j = 0; j < imgs.length - 1; j++)
                     {
                         element = "<img src='../static/upload/" + imgs[j] + "' alt=''/>"
                         $("#history_receive_info #imgs_area"+i).append(element)
                     }
                    }catch(err)
                    {
                    $("#history_receive_info #imgs_area"+i).parent().addClass( 'hidden')
                    }
               }

           }



       for (var i = 0; i < pub.length; i++)
       {

           id = pub[i]["pk"]
           pub_info = pub[i]["fields"]
           var event_status = pub_info["status"]
           var publisher = pub_info["publisher"]
           var publish_time = pub_info["publish_time"]
           var money = pub_info["money"]
           var title = pub_info["title"]

           status_string = eventStatus(event_status)

          var element ="<div class='event_box'>\
                                <div class='row event_info' style='padding:0 20px;'> \
                                    <div class='navbar-left text-left col-xs-8' >\
                                       <div class='event_span'>\
                                           <span class='glyphicon glyphicon-time'></span>\
                                           <span>"+publish_time+"</span>\
                                       </div>\
                                       <div class='event_span'>\
                                           <span class='glyphicon glyphicon-user'></span>\
                                           <span>"+publisher+"</span>\
                                       </div>\
                                    </div>\
                                    <div class='navbar-right text-right col-xs-4'>\
                                        <div class='event_span'>\
                                           <span>"+status_string+"</span>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class='row event_imgs'  style='padding:0 20px;'>\
                                    <hr  class='event_hr'/>\
                                    <div id='imgs_area"+i+"'></div>\
                                </div>\
                                <hr  class='event_hr'/>\
                                <div class='row event_title' style='padding:0 20px;'>\
                                     <a href='../page?id="+id+"'>"+title+"</a>\
                                </div>\
                            </div>\
                            </br>"


             $("#history_publish_info").append(element)


             try {
                 var event_Img = pub_info["event_Img"]
                 var imgs = event_Img.split(",")
                 for (var j = 0; j < imgs.length - 1; j++)
                 {
                     element = "<img src='../static/upload/" + imgs[j] + "' alt=''/>"
                     $("#history_publish_info #imgs_area"+i).append(element)
                 }
             }catch(err)
             {
                $("#history_publish_info #imgs_area"+i).parent().addClass( 'hidden')
             }
       }


       user_info = person[0]["fields"]
       $("#per_age").text(user_info["age"])
       $("#per_sex").text(user_info["sex"])
       $("#per_tel").text(user_info["tel"])
       $("#per_email").text(user_info["email"])
       $("#per_box_user").text($.cookie("username"))
       $("#per_box_money").text(user_info["property"])

       if (data[por]) {
           element = "../static/img/" + data[img]
       }
       else {
           element = '<img src="../static/img/por5.jpg" class="img-thumbnail" style="margin:0 auto;" alt=""/>'
       }
       $("#por").append(element)


   }


    var myFormData = new FormData()

 SAMP.on("addedfile", function(file) {
    myFormData.append("file", file)
 })


})
