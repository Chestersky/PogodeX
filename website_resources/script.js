//change mavbar background
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

//open modal
    function openModal(){
        document.getElementById('modal').style.display = 'block';
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }

//close modal
    function closeModal(){
        document.getElementById('modal').style.display = "none";
        document.getElementsByTagName('body')[0].style.overflow = 'auto';
    }

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
    