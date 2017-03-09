/**
 * Created by Administrator on 2017/2/12.
 */


$(document).ready(function(){

    user_log()
    isLogin()
    get_event()



})



function get_event(){

     $.ajax({
        type:'POST',
        url:"/event/",
        data:{"data":"11"},
        success:function(data){
            info = JSON.parse(data)["data"]
            disp_events(info)
        },
        error:function () {

        }
    })


}



function disp_events(data) {


    for (var i = 0; i < data.length; i++) {

        id = data[i]["pk"]
        fields = data[i]["fields"]
        var event_status = fields["status"]
        var publisher = fields["publisher"]
        var publish_time = fields["publish_time"]
        var money = fields["money"]
        var title = fields["title"]
        var event_Img = fields["event_Img"]

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

             $("#all_events").append(element)


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