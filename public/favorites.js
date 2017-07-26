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
          resultElement += '<div class = "sneaker-card">'+ '<a href= "' + item.shoeUrl + '">' + '<img src = "' + item.img + '"</img></a>' +
          '<p class ="price-label">' + item.priceLabel + '</p>' +
          '<p class ="branded-name">' + item.brandedName + '</p>' + '<button type ="button" class ="favorite-button" title="Add to favorites">' +
          '<i class="fa fa-heart-o" aria-hidden="true"></i></button>' +
          '<button type = "button" class ="remove-item" title ="Remove item">' +
          '<i class="fa fa-trash-o" aria-hidden="true"></i></button></div>';
        });
      }
      else {
        resultElement += '<p>No results</p>';
      }
      $('.js-favorites-list').html(resultElement);
  }
});

// TODO: add event listener for deleting favorites
          // should make a /delete request and return updated favorites data
          // then make ajax request again but call renderList function with updated data

$(function() {

  $('.sneaker-card').on('click', '.remove-item', function(e) {
    console.log('test');
    let shoeData = {
      brandedName: $(this).siblings('.branded-name').text(),
      priceLabel: $(this).siblings('.price-label').text(),
      shoeUrl: $(this).siblings('a').attr('href'),
      img: $(this).siblings('a').children('img').attr('src')
    };
    console.log(shoeData);
  });
})
//
// $('.sneaker-card').on('click', '.remove-item', function(e) {
//   console.log('test');
//   let shoeData = {
//     brandedName: $(this).siblings('.branded-name').text(),
//     priceLabel: $(this).siblings('.price-label').text(),
//     shoeUrl: $(this).siblings('a').attr('href'),
//     img: $(this).siblings('a').children('img').attr('src')
//   };
//   console.log(shoeData);
// });
