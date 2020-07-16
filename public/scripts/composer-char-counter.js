
// Used to power the new tweet form character count, live update of remaining count.
// Also adds warning classes when users go over max count or leave no input.
$(document).ready(function() {

  // Handler to listen on form keyups and adjust counter accordingly
  $('#tweet-text').keyup(function(event) {   
    $(this).siblings('div').find('.counter').text(140 - ($(this).val().length));
    if (Number($('#compose-tweet .counter').text()) < 0) {
      $(this).siblings('div').find('.counter').addClass('warning');
    } else {
      $(this).siblings('div').find('.counter').removeClass('warning');
    }
  });

});