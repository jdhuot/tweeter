/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetRef = require('../../server/data-files/initial-tweets.json');
// const tweetObj = json(tweetRef);



$(document).ready(function(){


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
    $($tweet.find('.main-tweet')).text(par);
    return $tweet;
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('section.tweets').prepend(createTweetElement(tweet));
    }
  };


  $('#new-tweet-form').find('textarea').focus((event) => {
    // $(this).find('.error p').text('');
    $('.error').slideUp();
  });

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
      });
    }
  });
  
  const loadTweets = function() {
    $.ajax('/tweets/', { method: 'GET' })
    .then((res) => {
      renderTweets(res);
    })
  };
  loadTweets();


  $("#compose-button").click(function() {
    $('html, body').animate({
        scrollTop: $("#compose-tweet").offset().top
    }, 1000);
    setTimeout(function() {
      $("#compose-tweet").find('textarea').focus();
     }, 0);
  });


  $(".to-top-btn").click(function() {
    $('html, body').animate({
        scrollTop: $("#top").offset().top
    }, 1000);
    setTimeout(function() {
      $("#compose-tweet").find('textarea').focus();
     }, 0);
  });

  $(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > 500) {
      $('.to-top-btn').fadeIn();
    } else {
      $('.to-top-btn').fadeOut();
    }
  });


});