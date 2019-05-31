//change background of the navbar 
    window.addEventListener('scroll', function(e){
        var scrollPosition = window.pageYOffset;
        if (scrollPosition < 300) {
            document.getElementsByTagName("nav")[0].style.backgroundColor = "transparent";
        }
        else {
            document.getElementsByTagName("nav")[0].style.backgroundColor = "#013543";
        }
        document.getElementById("menu").className = "topnav";
    })
//scroll to section
    $(document).ready(function(){
        $('a[href^="#"]').on('click', function(event) {
            var target = $(this.getAttribute('href'));
            if( target.length ) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top
                }, 1000);
            }
        });
  }); 
    