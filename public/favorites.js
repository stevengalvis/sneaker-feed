'use strict';

//get favorites
$.ajax({
  url: "http://localhost:8080/users/favorites",
  type: "GET",
  success: function(data, status) {
      console.log(data);
      let resultElement = '';
      if (data) {
        data.favorites.forEach(function(item) {
          resultElement += '<div class = "sneaker-card">'+ '<a href= "' + item.clickUrl + '">' + '<img src = "' + item.image.sizes.Best.url + '"</img></a>' +
          '<p class ="price-label">' + item.priceLabel + '</p>' +
          '<p class ="branded-name">' + item.brandedName + '</p>' + '<button type ="button" class ="favorite-button" title="Add to favorites">' +
          '<i class="fa fa-heart-o" aria-hidden="true"></i></button></div>';
        });
      }
      else {
        resultElement += '<p>No results</p>';
      }
      $('.js-sneaker-results').html(resultElement);
  }
});
