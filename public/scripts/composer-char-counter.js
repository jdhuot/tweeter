

$(document).ready(function() {

  $('#tweet-text').keyup(function(event) {   
    $(this).siblings('div').find('.counter').text(140 - ($(this).val().length));
    if (Number($('#compose-tweet .counter').text()) < 0) {
      $(this).siblings('div').find('.counter').addClass('warning');
    } else {
      $(this).siblings('div').find('.counter').removeClass('warning');
    }
  });

});