'use strict';

var colorThief = new ColorThief();
console.log(colorThief);
renderFeedItems('pumas');
//get data from shopstyle api
// $.ajax({
//   url: "http://api.shopstyle.com/api/v2/products?pid=uid1025-39588145-82&fts=puma+men + shoe&offset=0&limit=10",
//   type: "GET",
//   success: function(data, status) {
//       console.log(data);
//       let resultElement = '';
//       if (data) {
//         data.products.forEach(function(item) {
//           let alternateImages = '';
//           if(item.alternateImages.size !== 0) {
//             alternateImages = renderAlternateImages(item.alternateImages);
//           }
//           resultElement += '<div class="row"><div class ="col-12"><div class="sneaker-card">' +
//           '<p class ="branded-name">' + item.brandedName + '</p>' +
//            '<div class = "card-main-image">' + '<a href= "' + item.clickUrl + '">' + '<img src = "' + item.image.sizes.Best.url + '"</img></a></div>' + '<div class ="card-content">' + '<div class = "js-alternate-images">' + alternateImages + '</div>' +
//           '<p class ="price-label">' + item.priceLabel + '</p></div>' +
//           '<button type ="button" class ="favorite-button" title="Add to favorites">' +
//           '<i class="fa fa-heart-o" aria-hidden="true"></i></button></div></div></div>';
//         });
//       }
//       else {
//         resultElement += '<p>No results</p>';
//       }
//       $('.js-sneaker-results').html(resultElement);
//   }
// });

//get search query
$('.search').on('submit', function(e) {
  e.preventDefault();
  let searchQuery = $('.search-input').val();
  renderFeedItems(searchQuery);
});


//render alternateImages
function renderAlternateImages(alternateImages) {
  let productImages = '';
  for (let i = 0; i < alternateImages.length; i++) {
    if(i <= 3) {
      productImages += '<img src = "' + alternateImages[i].sizes.Medium.url + '"</img>';
    }
  }

  return productImages;
}

// TODO: render products function
function renderFeedItems(searchQuery) {
  $.ajax({
    url: 'http://api.shopstyle.com/api/v2/products?pid=uid1025-39588145-82&fts=' + searchQuery   + '&offset=0&limit=10',
    type: "GET",
    success: function(data, status) {
        console.log(data);
        let resultElement = '';
        if (data) {
          data.products.forEach(function(item) {
            let alternateImages = '';
            if(item.alternateImages.size !== 0) {
              alternateImages = renderAlternateImages(item.alternateImages);
            }
            resultElement += '<div class="row"><div class ="col-12"><div class="sneaker-card">' +
            '<p class ="branded-name">' + item.brandedName + '</p>' +
             '<div class = "card-main-image">' + '<a href= "' + item.clickUrl + '">' + '<img src = "' + item.image.sizes.Best.url + '"</img></a></div>' + '<div class ="card-content">' + '<div class = "js-alternate-images">' + alternateImages + '</div>' +
            '<p class ="price-label">' + item.priceLabel + '</p></div>' +
            '<button type ="button" class ="favorite-button" title="Add to favorites">' +
            '<i class="fa fa-heart-o" aria-hidden="true"></i></button></div></div></div>';
            let img = $('.card-main-image').find('a').children('img').attr('src');
            console.log($('.card-main-image'));
          });
        }
        else {
          resultElement += '<p>No results</p>';
        }
        $('.js-sneaker-results').html(resultElement);
    }
  });
}


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
      const username = $("input[name=username]").val();
      const password = $("input[name=password]").val();

      $.ajax({
        type: "GET",
        url: 'http://localhost:8080/users/login',
        headers: {
          'content-type': "application/json",
          authorization: "Basic " + btoa(username + ':' + password)
        },
        contentType: 'application/json',
        success: function(data, status) {
          console.log(data, status);
        }
      });
    });


    // event listener for logging out
    $('.log-out-button').on('click', function(e) {
      console.log('clicked');
      logoutUser();

    });

    function logoutUser() {
      $.ajax({
          url: "http://localhost:8080/users/logout",
          type: "GET",
          success: function() {
              console.log('logged out');
          }
      });
    }

    // event listener for favorites
    //get data from resultElement
    $('.sneaker-card').on('click','.favorite-button', function(e) {
      console.log($(this).siblings('.card-main-image').find('a').attr('href'));

      let shoeData = {
        brandedName: $(this).closest('.sneaker-card').find('.branded-name').text(),
        priceLabel: $(this).siblings('.card-content').find('.price-label').text(),
        shoeUrl: $(this).siblings('.card-main-image').find('a').attr('href'),
        img: $(this).siblings('.card-main-image').find('a').children('img').attr('src')
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
