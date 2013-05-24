$(document).ready(function(){

    //Find all editable instances
    var editables = $("[data-pw-inline='true']").not('[data-field-type="Pageimage"]');
    var pageimages = $('[data-field-type="Pageimage"]');

    //Get the url that we should post the AJAX requests to
    var post_url = $("#inline-editor-pw-module-url").text();

    var status = $('#inline-editor-pw-module-status');

    var status_text_original = status.html();


    //Attach a red border to indicate that an area is editable
    editables.addClass("inline-editor-pw-module-editable");
    editables.css("box-sizing","border-box");

    pageimages.addClass("inline-editor-pw-module-editable");
    pageimages.css("box-sizing","border-box");




    //Setup the functions for the bottom bar

    /**
     * When the close / logout button is clicked, send a request to log the user out
     * and then refresh the page
     */
    $('#inline-editor-pw-module-close').click(function(){


        $.get($(this).attr("href"),function(){
            document.location.reload(true);
        });

        return false;
    });

    pageimages.on("mouseover",function(){
        $(this).animate({
            opacity: 0.7
        });
    });

    pageimages.on("mouseleave",function(){
        $(this).animate({
            opacity: 1
        });
    });


    //Detect the image field type and respond to the type
    pageimages.on("click",function(){
        var current_element = $(this);

        //Are we dealing with an image?
        if(current_element.data("field-type") == "Pageimage"){
            //current_element.attr("src",prompt("URL",""));

            //Load the image upload modal
            try{
                current_element.dropzone({
                    url: post_url,
                    sending: function(file,xhr,formData){

                        formData.append("page_id",current_element.data("page-id"));
                        formData.append("field_name",current_element.data("field-name"));
                        formData.append("data","");
                        formData.append("field_type","Pageimage");
                    },
                    success: function(data,success){
                        //YES
                        success = JSON.parse(success);
                        console.log(success);
                        current_element.attr("src",success.location);
                    }
                });
            }
            catch(err){
            //Do nothing yet

            }


        }
    });


    /**
     * Save the page when the CKEditor loses focus.
     * Show the result on the editor bar
     */
    editables.on('blur',function(){
        var current_element = $(this);

        var data = {
            page_id : current_element.data("page-id"),
            field_name: current_element.data("field-name"),
            data: current_element.html()
        };


        $.post(post_url,data,function(result){

            if(result.status == "ok"){
                status.removeClass();
                status.addClass("inline-editor-pw-module-success");
                status.text(result.exception);
            }
            else{
                status.removeClass();
                status.addClass("inline-editor-pw-module-failed");
                status.text(result.exception);
            }

            status.css("opacity",1);

            setTimeout(function() {
                status.animate(
                    {
                        "opacity": 0
                    },
                    "slow",defaultMessage
                );
            }, 2000);

        },"json");
    });

    function defaultMessage(){
        status.removeClass();
        status.html(status_text_original);
        status.animate({opacity: 1});
    }



});
