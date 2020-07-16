/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Main jquery ready function
$(document).ready(function() {

  // Creates a new tweet element from the tweet object
  const createTweetElement = function(tweetObj) {
    let par = tweetObj.content.text;

    const $tweet = $(`
    <article class="tweet-box">
      <header>
        <div>
          <img src=${tweetObj.user.avatars} alt="Avatar">
          <h5>${tweetObj.user.name}</h5>
        </div>
        <a class="user-handle" href="#">${tweetObj.user.handle}</a>
      </header>
      <p class="main-tweet"></p>
      <footer>
      <p>${Math.floor((Date.now() - tweetObj.created_at) / (1000 * 3600 * 24))} days ago</p>
        <div>
          <a href="#"><img src="/images/flag.png" alt="flag"></a>
          <a href="#"><img src="/images/retweet.png" alt="share"></a>
          <a href="#"><img src="/images/heart.png" alt="love"></a>
        </div>
      </footer>
    </article>
    `);
    $($tweet.find('.main-tweet')).text(par); // Inserts text element which disallows code to be rendered in the browser for SAFETY
    return $tweet;
  };

  // Loops through array of tween objects and creates html elements from the tweet data
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('section.tweets').prepend(createTweetElement(tweet));
    }
  };

  // When user clicks on the textarea after error, clear the error
  $('#new-tweet-form').find('textarea').focus((event) => {
    $('.error').slideUp();
  });

  // Listener for Submit on the new tweet form. 
  // Then validates text and posts new tweet through ajax to database and reloads tweets on the page.
  $('#new-tweet-form').submit(function(event) {
    event.preventDefault();
    if ($(this).find('textarea').val().length < 1) {
      $('.error').slideDown(400,function() {});
      $('.error p').text('Field cannot be empty');
    } else if ($(this).find('textarea').val().length > 140) {
      $('.error').slideDown(400,function() {});
      $('.error p').text('Exceeded max character count of 140');
    } else {
      $.ajax({ url: '/tweets/', method: 'post', data: $(this).find('textarea').serialize() })
        .then((res) => {
          console.log(res);
          loadTweets();
          $(this).find('textarea').val('');
          $(this).find('.counter').text('140');
        })
        .fail((err) => {
          console.log(err);
        });
    }
  });
  
  // Loads tweets on the page initially
  const loadTweets = function() {
    $.ajax('/tweets/', { method: 'GET' })
      .then((res) => {
        renderTweets(res);
      });
  };
  loadTweets();

  // Handler to smooth scroll and auto focus on new tweet form when user clicks on New Tweet in Nav
  $("#compose-button").click(function() {
    $('html, body').animate({
      scrollTop: $("#compose-tweet").offset().top
    }, 1000);
    setTimeout(function() {
      $("#compose-tweet").find('textarea').focus();
    }, 0);
  });

  // Handler to smooth scroll and auto focus on new tweet form when user clicks on footer back to top button
  $(".to-top-btn").click(function() {
    $('html, body').animate({
      scrollTop: $("#top").offset().top
    }, 1000);
    setTimeout(function() {
      $("#compose-tweet").find('textarea').focus();
    }, 0);
  });

  // Handler to hide and show back to top button in footer when user scrolls 500px off the top
  $(document).scroll(function() {
    let top = $(this).scrollTop();
    if (top > 500) {
      $('.to-top-btn').fadeIn();
    } else {
      $('.to-top-btn').fadeOut();
    }
  });

});