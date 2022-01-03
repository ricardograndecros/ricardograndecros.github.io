
/* Initializes popovers */
$(document).ready(function(){
    $('[data-toggle="popover"]').popover({
        placement : 'bottom',
        html : true,
        title : 'Email address <a href="#" class="far fa-clipboard" data-toggle="tooltip" title="Click to copy email address"></a><a href="#" class="btn btn-close" data-dismiss="alert" aria-hidden="true"></a></div>',
        content: 'ricardograndecros@gmail.com',
    });   
    $(document).on("click", ".popover .btn-close" , function(){
        $(this).parents(".popover").popover('hide');
    });
    $(document).on("click", ".popover .fa-clipboard" , function(){
        var copyText = $(this).parents(".popover").children(".popover-body")[0].textContent;
        
        // select text
        selectElementText($(this).parents(".popover").children(".popover-body")[0]);

        navigator.clipboard.writeText(copyText);

        $(this).parents(".popover").popover('hide');

        showAlert();

        setTimeout(function(){
            if($("#clipboardAlert1").find("div#clipboardAlert2").length==0){
                $("#clipboardAlert1").append("<div class='alert alert-success alert-dismissable' id='clipboardAlert2'> <button type='button' class='close' data-dismiss='alert'  aria-hidden='true'>&times;</button>Email copied to clipboard!</div>");
              }
              $("#clipboardAlert1").css('display', 'none');
        }, 2000);

    });

    /* Main menu clicks handlers */
    $("aboutme-button").click(function(){
        $('html,body').animate({
            scrollTop: $("#about-me").offset().top},
            'slow');
    });
    $("cv-button").click(function(){
        $('html,body').animate({
            scrollTop: $("#cv").offset().top},
            'slow');
    });
    $("projects-button").click(function(){
        $('html,body').animate({
            scrollTop: $("#projects").offset().top},
            'slow');
    });
});


function selectElementText(el, win) {
    win = win || window;
    var doc = win.document, sel, range;
    if (win.getSelection && doc.createRange) {
        sel = win.getSelection();
        range = doc.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (doc.body.createTextRange) {
        range = doc.body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
}

function showAlert(){
    if($("#clipboardAlert1").find("div#clipboardAlert2").length==0){
        $('#clipboardAlert1').append("<div id='clipboardAlert2' class='alert alert-success alert-dismissible fade show' role='alert'>"+
                                    "Email copied to clipboard! <div type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></div></div>");
    }
    $("#clipboardAlert1").css("display", "");
  }