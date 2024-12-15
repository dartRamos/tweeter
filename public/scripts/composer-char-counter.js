$(document).ready(function() {
  // Select the textarea inside the .new-tweet section
  $('.new-tweet textarea').on('keyup', function() {
    
    // Get current length of text entered
    let textLength = $(this).val().length;

    // Go to the parent and then find the counter element
    let counter = $(this).closest('.new-tweet').find(".counter")

    // Calculate the remaining characters (140 - textLength)
    let remainingChars = 140 - textLength;

    // Update the counter text with the remaining characters
    counter.text(remainingChars);

    // Turns counter red if number goes below 0
    if(remainingChars < 0) {
      counter.addClass('counter-negative');
    } else {
      counter.removeClass('counter-negative');
    }

  });
});