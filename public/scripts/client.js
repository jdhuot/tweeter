/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetRef = require('../../server/data-files/initial-tweets.json');
// const tweetObj = json(tweetRef);


// Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]



$(document).ready(function(){


  const createTweetElement = function(tweetObj) {
    const $tweet = $(`
    <article class="tweet-box">
      <header>
        <div>
          <img src=${tweetObj.user.avatars} alt="Avatar">
          <h5>${tweetObj.user.name}</h5>
        </div>
        <a class="user-handle" href="#">${tweetObj.user.handle}</a>
      </header>
      <p class="main-tweet">${tweetObj.content.text}</p>
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
    return $tweet;
  };
  

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('section.tweets').prepend(createTweetElement(tweet));
    }
  };


  $('#new-tweet-form').submit(function(event) {
    event.preventDefault();
    if ($(this).find('textarea').val().length < 1) {
      alert('Field cannot be empty');
    } else if ($(this).find('textarea').val().length > 140) {
      alert('Too much text there...');
    } else {
      $.ajax({ url: '/tweets/', method: 'post', data: $(this).serialize() })
      .then((res) => {
        loadTweets();
        $(this).find('textarea').val('');
        // console.log(res);
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

});




// console.log(createTweetElement(tweetData));