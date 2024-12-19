/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  
  // Sample data array to represent tweets
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  // Function to render the array of tweets
  const renderTweets = function(tweets) {
    // For each tweet in the 'tweets' array, create the tweet element and append it to the page
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);

      $('#tweets-container').append($tweet);
    })
  }

  // Function that creats the HTML structure for a tweet
  const createTweetElement = function(tweet) {
      // Using jQuery to create an HTML structure for the tweet
      let $tweet = $(`<article class="tweet">
        <header class="tweet-header">
          <div class="user-avatar">
            <img src="${tweet.user.avatars}" alt="User Avatar">
            <span class="user-name">${tweet.user.name}</span>
          </div>
          <div class="user-info">
            <span class="user-handle">${tweet.user.handle}</span>
          </div>
        </header>
        <section class="the-tweet">
          ${tweet.content.text}
        </section>
        <div class="line"></div>
        <footer class="tweet-footer">
          <span class="created_at">${new Date(tweet.created_at).toLocaleString()}</span>
          <div class="tweet-icons">
            <i class="fa-solid fa-flag flag"></i>
            <i class="fa-solid fa-retweet retweet"></i>
            <i class="fa-solid fa-heart heart"></i>
          </div>
        </footer>    
      </article>`
      )

      return $tweet; // Return the created tweet element to be appended to the page
  }

  // Call renderTweets function with the data array to display tweets on page load
  renderTweets(data);
});

