'use strict';

//get data from shopstyle api
$.ajax({
  url: "http://api.shopstyle.com/api/v2/products?pid=uid1025-39588145-82&fts=adidas+men + shoe&offset=0&limit=10",
  type: "GET",
  success: function(data, status) {
      console.log(data);
      let resultElement = '';
      if (data) {
        data.products.forEach(function(item) {
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




//dom manipulation


$(function() {
    $(".sign-up").on('submit', function(e) {
      e.preventDefault();
        console.log('clicked');
        let data = {
            username: $("input[name=username]").val(),
            firstName: $("input[name=firstName]").val(),
            lastName: $("input[name=lastName]").val(),
            password: $("input[name=password]").val()
        }

        $.ajax({
            url: "http://localhost:8080/users",
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(data, status) {
                console.log(data, status);
            }
        });

    });

    //event listener for logging in

    $('.login').on('submit', function(e) {
      e.preventDefault();
      let data = {
        username: $("input[name=username]").val(),
        password: $("input[name=password]").val()
      }
      $.ajax({
        type: "GET",
        url: 'http://localhost:8080/users/login',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(data, status) {
          console.log(data, status);
        }
      });
    });

    // event listener for favorites
    //get data from resultElement
    $('.sneaker-card').on('click','.favorite-button', function(e) {
      let shoeData = {
        brandedName: $(this).siblings('.branded-name').text(),
        priceLabel: $(this).siblings('.price-label').text(),
        shoeUrl: $(this).siblings('a').attr('href'),
        img: $(this).siblings('a').children('img').attr('src')
      }
      console.log(shoeData);
      addToFavorites(shoeData);
    });

    //function for sending favorite object to db
    function addToFavorites(shoeData) {
      $.ajax({
          url: "http://localhost:8080/users/favorites",
          type: "PUT",
          data: JSON.stringify(shoeData),
          contentType: "application/json",
          success: function(data, status) {
              console.log(data, status);
          }
      });
    }

});
