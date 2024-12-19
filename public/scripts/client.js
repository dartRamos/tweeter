/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Function to render the array of tweets
  const renderTweets = function(tweets) {
    // For each tweet in the 'tweets' array, create the tweet element and append it to the page
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);

      $('#tweets-container').prepend($tweet);
    })
  }

  // Function that creats the HTML structure for a tweet
  const createTweetElement = function(tweet) {
    // Formate creation time suing timeago.js
    const timeAgo = timeago.format(new Date(tweet.created_at));
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
          <span class="created_at">${timeAgo}</span>
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

  const isTweetValid = function (tweetWords) {
    tweetWords = tweetWords.trim()

    if(tweetWords.length > 140) {
      alert('You have exceeded the character limit!');
      return false;
    }

    if(!tweetWords) {
      alert('You cannot submit a blank tweet!')
      return false;
    }

    return true;
  }
  // Function to handle the form submission 
  const submitHandler = function() {
    $('#target').on("submit", function(event) {
      event.preventDefault(); // Prevent the default form submission behavior
      
      const tweetData = $(this).serialize(); // Serialize the form data
      const tweetWords = $('#tweet-text').val();

      if(!isTweetValid(tweetWords)) {
        return;
      }

      $.post('/tweets', tweetData, function(response) {
        console.log('Server Response:', response); // Log the response to inspect it
        renderTweets([response]); // Append the newly created tweet to the container
      });
    });
  }

  // Function to load tweets from server when the page loads
  const loadTweets = function(){
    $.ajax({
      url: '/tweets', // Endpoint to request tweets from
      method: 'GET', // method to fetch data
      dataType: 'JSON', // Get a JSON response from server
      success: function(response) {
        renderTweets(response)
      },
      error: function() {
        console.log('Error fetrching tweets:', err); // Logs error if something goes wrong
      }
    })
  }

  // Loads tweets when page loads
  loadTweets();

  // Activate the submitHandler function to listen for form submission events
  submitHandler();
});

