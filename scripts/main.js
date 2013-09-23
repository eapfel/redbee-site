$('.navbar .nav a, .navbar .brand').bind('click', function(e) {
   e.preventDefault();
   $('html, body').animate({
            scrollTop: $(this.hash).offset().top - 80
        }, 500);
});
