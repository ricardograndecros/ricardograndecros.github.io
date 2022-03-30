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
                newCardCol1.className = 'col-md-4 card-image-col'
                let cardImage = document.createElement('img');
                cardImage.className = 'resize-image'

                image_name = ''
                var request = new XMLHttpRequest();
                request.open("GET", "https://ricardograndecros.github.io/images/" + repo.name + ".png", true);
                request.send()
                request.onload = function(){
                    if (request.status == 200){
                        cardImage.src = "./images/" + repo.name + ".png";
                    } else {
                        image_name = "work-in-progress"
                        cardImage.src = "./images/" + image_name + ".png";
                    }
                }
                cardImage.className = 'img-fluid rounded-start border border-dark rounded card-image';
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
                cardDate.className = 'card-text date-updated-container';
                let date = document.createElement('small');
                date.className = 'text-muted card-updated';
                date.innerText = new Date(repo.updated_at).toLocaleDateString();
                cardDate.appendChild(date);
                cardBody.appendChild(cardDate);


                let cardButtonContainer = document.createElement('p');
                cardButtonContainer.className = 'card-button-container';
                let cardButton = document.createElement('a');
                cardButton.className = 'btn btn-primary card-button'
                cardButton.innerText = 'See more';
                cardButton.href = repo.html_url;
                cardButton.target = '_blank';
                cardButtonContainer.appendChild(cardButton);
                cardBody.appendChild(cardButtonContainer);

                newCardCol2.appendChild(cardBody);

                cardRow.appendChild(newCardCol1);
                cardRow.appendChild(newCardCol2);

                newCard.appendChild(cardRow);

                projects.appendChild(newCard);
            }
        });
        
    })

        //Get the button
    let mybutton = document.getElementById("btn-back-to-top");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
    scrollFunction();
    };

    function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
    }
    // When the user clicks on the button, scroll to the top of the document
    mybutton.addEventListener("click", backToTop);

    function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    }
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