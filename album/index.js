
// IIFE - Immediately Invoked Function Expression
(function(yourcode) {

    // The global jQuery object is passed as a parameter
    yourcode(window.jQuery, window, document);

  }(function($, window, document) {

    // The $ is now locally scoped 

   // Listen for the jQuery ready event on the document
   $(function() {

    // Open the modal
     var $modal = $('.modal1');
     var $navbar = $('.navbar');

     var $img = $('.alBilde');
     var $modalImg = $('#img01');
     var $caption = $('#caption-tekst');
     var img;
     var clickedImg 

     // Åpner modal når den blir klikket
     $img.click(function(){
      $img.each(function(){ 
        if ($(this).is(':hover'));{
          clickedImg = $(this)[0];
        }
      });
      $modal.css('display', 'block');
      $navbar.css('display', 'none');
      $modalImg.attr('src', clickedImg.src);
      $caption.text(clickedImg.alt);
     });
     // Lukker modal
     var $span = $('.closer')
     $span.click(function(){
      $modal.css('display', 'none')
      $navbar.css('display', 'block');
     });

    //DOM code


   });


   // annen kode
  
}));
