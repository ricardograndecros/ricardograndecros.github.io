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

    result = $.get('https://api.github.com/users/ricardograndecros/repos', function(response){
        
        var projects = document.getElementById('projects-cards-container');
        response.forEach(repo => {
            if(repo.name != 'ricardograndecros.github.io'){
                let newCard = document.createElement('div');
                newCard.className = 'card mb-3 bg-light text-dark';
                newCard.style = "max-width: 540px;"
                
                let cardRow = document.createElement('div');
                cardRow.className = 'row g-0';

                let newCardCol1 = document.createElement('div');
                newCardCol1.className = 'col-md-4'
                let cardImage = document.createElement('img');
                cardImage.src = "./images/bhs.jpeg";
                cardImage.className = 'img-fluid rounded-start';
                cardImage.alt = 'project image';
                newCardCol1.appendChild(cardImage);

                let newCardCol2 = document.createElement('div');
                newCardCol2.className = 'col-md-8';

                let cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                let cardTitle = document.createElement('h5');
                cardTitle.className = 'card-title';
                cardTitle.innerText = repo.name;
                cardBody.appendChild(cardTitle);

                let cardDesc = document.createElement('p');
                cardDesc.className = 'card-text';
                cardDesc.innerText = repo.description;
                cardBody.appendChild(cardDesc);

                let cardDate = document.createElement('p');
                cardDate.className = 'card-text';
                let date = document.createElement('small');
                date.className = 'text-muted';
                date.innerText = repo.deployments_url.updated_at;
                cardDate.appendChild(date);
                cardBody.appendChild(cardDate);

                newCardCol2.appendChild(cardBody);

                cardRow.appendChild(newCardCol1);
                cardRow.appendChild(newCardCol2);

                newCard.appendChild(cardRow);

                projects.appendChild(newCard);
            }
        });
        
    })
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