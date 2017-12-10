"use strict";

//get favorites
$.ajax({
  url: "http://localhost:8080/users/favorites",
  type: "GET",
  success: function(data) {
    if (data) {
      console.log(data);
      renderList(data);
    } else {
      resultElement += "<p>No results</p>";
    }
  }
});

function renderList(shoeData) {
  console.log(shoeData);
  // let resultElement = '';
  let resultElement = '<div class="row">';
  let i = 1;
  shoeData.favorites.forEach(function(item) {
    // resultElement += '<div class ="sneaker-card">'+ '<a href= "' + item.shoeUrl + '">' + '<img src = "' + item.img + '"</img></a>' +
    // '<p class ="price-label">' + item.priceLabel + '</p>' +
    // '<p class ="branded-name">' + item.brandedName + '</p>' +
    // '<button type = "button" class ="remove-item" title ="Remove item">' +
    // '<i class="fa fa-trash-o" aria-hidden="true"></i></button></div>';
    // let alternateImages = '';
    //  if(item.alternateImages.size !==0) {
    //    alternateImages = renderAlternateImages(item.alternateImages);
    //  }
    resultElement +=
      '<div class="col-12"><div class="sneaker-card">' +
      '<p class="branded-name">' +
      item.brandedName +
      "</p>" +
      '<div class="card-main-image">' +
      '<a href= "' +
      item.clickUrl +
      '">' +
      '<img src = "' +
      item.img +
      '"</img></a></div>' +
      '<div class ="card-content">' +
      '<p class ="price-label">' +
      item.priceLabel +
      "</p></div>" +
      '<div class ="wrapper-bottom-card">' +
      '<button type = "button" class ="remove-item" title ="Remove item">' +
      '<i class="fa fa-trash-o" aria-hidden="true"></i></button></div></div></div>';
    if (i % 2 === 0) {
      resultElement += '</div><div class ="row">';
    }
    i++;
  });
  if (i % 2 === 0) {
    resultElement += "</div>";
  }

  $(".js-favorites-list").html(resultElement);
}

function removeFavorite(shoeData) {
  $.ajax({
    url: "http://localhost:8080/users/favorites",
    type: "POST",
    data: JSON.stringify(shoeData),
    contentType: "application/json",
    success: function(data, status) {
      renderList(data);
      console.log(data);
    }
  });
}

$(function() {
  $(".js-favorites-list").on("click", ".remove-item", function(e) {
    let shoeData = {
      brandedName: $(this)
        .parent()
        .siblings(".branded-name")
        .text(),
      priceLabel: $(this)
        .parent()
        .siblings(".price-label")
        .text(),
      shoeUrl: $(this)
        .parent()
        .siblings("a")
        .attr("href"),
      img: $(this)
        .parent()
        .siblings("a")
        .children("img")
        .attr("src")
    };
    console.log(shoeData);
    removeFavorite(shoeData);
  });
});
