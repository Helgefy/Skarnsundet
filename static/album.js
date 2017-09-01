
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
        $albumList.append('<a href="#'+ albumer[album][0] + '" class="albumKnapp list-group-item" >' + albumer[album][0] + ' (' + albumer[album][1]+') </a>');
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
        $bilder.append( '<div class="card col-md-4"> <img class="img-responsive img-thumbnail alBilde" src="static/Album/' + album +'/'+ imgs[img][1] + '" id="alBilde" alt="' + imgs[img][0] + '"><p class="card-text">'+ imgs[img][2]+'</p></div>');
      }
    }
    
    // Album updates on click
    $albumList.delegate('.albumKnapp','click',function(){
      $bilder.empty();
      getImgs($(this).attr('href').substring(1));// substring(1) to not get # symbol
    });


    // Change picture
    var $hoyre = $('#hoyre');
    var $venstre = $('#venstre');

    $hoyre.click(function(){
      let $alBilder =$('.alBilde');
      let index = $alBilder.index($clickedImg);
      if (index === $alBilder.length - 1){
        $modalImg.attr('src', $alBilder[0].src);
        $caption.text($alBilder[0].alt);
        $clickedImg = $alBilder[0]
      }
      else{
        $modalImg.attr('src', $alBilder[index + 1].src);
        $caption.text($alBilder[index + 1].alt);
        $clickedImg = $alBilder[index + 1]
      }

    });
    $venstre.click(function(){
      let $alBilder =$('.alBilde');
      let index = $alBilder.index($clickedImg);
      let len = $alBilder.length - 1;
      if (index === 0){
        $modalImg.attr('src', $alBilder[len].src);
        $caption.text($alBilder[len].alt);
        $clickedImg = $alBilder[len]
      }
      else{
        $modalImg.attr('src', $alBilder[index - 1].src);
        $caption.text($alBilder[index - 1].alt);
        $clickedImg = $alBilder[index - 1]
      }

    });



    // Open the modal
    var $modal = $('.modal1');
    var $navbar = $('.navbar');
    var $modalImg = $('#img01');
    var $caption = $('#caption-tekst');
    var $clickedImg;

     // Åpner modal når den blir klikket
    $bilder.delegate('.alBilde','click',function(){
        $clickedImg = $(this)[0];
        $modal.css('display', 'block');
        $navbar.css('display', 'none');
        $modalImg.attr('src', $clickedImg.src);
        $caption.text($clickedImg.alt);
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
