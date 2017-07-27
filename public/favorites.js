'use strict';

//get favorites
$.ajax({
  url: "http://localhost:8080/users/favorites",
  type: "GET",
  success: function(data) {
    if(data) {
      renderList(data)
    }
    else {
      resultElement += '<p>No results</p>';
    }
  }
});

function renderList(shoeData) {
  let resultElement = '';
  shoeData.favorites.forEach(function(item) {
      resultElement += '<div class = "sneaker-card">'+ '<a href= "' + item.shoeUrl + '">' + '<img src = "' + item.img + '"</img></a>' +
      '<p class ="price-label">' + item.priceLabel + '</p>' +
      '<p class ="branded-name">' + item.brandedName + '</p>' +
      '<button type = "button" class ="remove-item" title ="Remove item">' +
      '<i class="fa fa-trash-o" aria-hidden="true"></i></button></div>';
    });

  $('.js-favorites-list').html(resultElement);
}

function removeFavorite(shoeData) {
  $.ajax({
    url: "http://localhost:8080/users/favorites",
    type: "POST",
    data: JSON.stringify(shoeData),
    contentType: 'application/json',
    success: function(data, status) {
      renderList(data);
      console.log(data);
    }
  });
}

$(function() {

  $('.js-favorites-list').on('click', '.remove-item', function(e) {
    let shoeData = {
      brandedName: $(this).siblings('.branded-name').text(),
      priceLabel: $(this).siblings('.price-label').text(),
      shoeUrl: $(this).siblings('a').attr('href'),
      img: $(this).siblings('a').children('img').attr('src')
    };
    console.log(shoeData);
    removeFavorite(shoeData);
  });
});
