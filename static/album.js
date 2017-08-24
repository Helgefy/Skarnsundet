
// IIFE - Immediately Invoked Function Expression
(function(yourcode) {

    // The global jQuery object is passed as a parameter
    yourcode(window.jQuery, window, document);

  }(function($, window, document) {

    // The $ is now locally scoped 

   // Listen for the jQuery ready event on the document
   $(function() {

    //Getting albums
    var albumer

    $.ajax({
      url: '/getAlb',
      type: 'GET',
      method: 'GET',
      success: function(resp){
        albumer = resp
        makeAlbList(albumer);
        getImgs(window.location.hash.substring(1));// substring(1) to not get # symbol

      }
    });
    var $albumList = $('#albumList');
    // Writing albus as li
    var makeAlbList = function(albumer){
      var album
      for (album in albumer){
        $albumList.append('<li><a href="#'+ albumer[album] + '" class="albumKnapp" >' + albumer[album] + ' </a></li>');
      }
    }
    // Getting images in album
    var getImgs = function(hashUrl){
      if (!hashUrl){
        hashUrl = 'dummy'
      }
      $.ajax({
        url: '/getBilder/' + hashUrl,
        type: 'GET',
        method: 'GET',
        success: function(resp){
          var bildeListe = resp.bilder;
          makeImgs(bildeListe,resp.album);
        }
      });

    }
    var $bilder = $('.bilder');
    // Writing images to html
    var makeImgs = function(imgs, album){
      var img;
      for (img in imgs){
        $bilder.append( '<div class="card col-md-4"> <img class="img-responsive img-thumbnail alBilde" src="static/Album/' + album +'/'+ imgs[img] + '" id="alBilde" alt="' + img + '"><p class="card-text">Her står en beskrivelse til bildet som er over. Teksten kan være ok lang:</p></div>');
      }
    }
    
    // Album updates on click
    $albumList.delegate('.albumKnapp','click',function(){
      $bilder.empty();
      getImgs($(this).attr('href').substring(1));// substring(1) to not get # symbol
    });




    // Open the modal
    var $modal = $('.modal1');
    var $navbar = $('.navbar');
    var $modalImg = $('#img01');
    var $caption = $('#caption-tekst');
    var clickedImg;

     // Åpner modal når den blir klikket
    $bilder.delegate('.alBilde','click',function(){
        clickedImg = $(this)[0];
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
