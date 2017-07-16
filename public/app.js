'use strict';

//get data from shopstyle api
$.ajax({
  url: "http://api.shopstyle.com/api/v2/products?pid=uid1025-39588145-82&fts=nike+men + shoe&offset=0&limit=10",
  type: "GET",
  success: function(data, status) {
      console.log(data);
      let resultElement = '';
      if (data) {
        data.products.forEach(function(item) {
          resultElement += '<div>'+ '<img src = "' + item.image.sizes.Best.url + '"</img>' +
          '<p>' + item.priceLabel + '</p>' +
          '<p>' + item.brandedName + '</p>';


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
});
