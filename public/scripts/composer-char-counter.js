

$(document).ready(function() {

  $('#tweet-text').keyup(function(event) {   
    $('#compose-tweet .counter').text($(this).val().length);
  });

});