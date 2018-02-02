"use strict";

//get favorites
$.ajax({
  url: "/users/favorites",
  type: "GET",
  success: function(data) {
    if (data) {
      renderList(data);
    } else {
      resultElement += "<p>No results</p>";
    }
  }
});

function renderList(shoeData) {
  let resultElement = '<div class="row">';
  let i = 1;
  shoeData.favorites.forEach(function(item) {
    resultElement +=
      '<div class="col-4"><div class="sneaker-card">' +
      '<div class="card-main-image">' +
      '<a href= "' +
      item.shoeUrl +
      '">' +
      '<img src = "' +
      item.img +
      '"</img></a></div>' +
      '<p data-id ="' +
      item.id +
      '"' +
      'class="branded-name">' +
      item.brandedName +
      "</p>" +
      '<div class ="wrapper-bottom-card">' +
      '<button type = "button" class ="remove-item" title ="Remove item">' +
      '<i class="fa fa-trash-o" aria-hidden="true"></i></button></div></div></div>';
    if (i % 3 === 0) {
      resultElement += '</div><div class ="row">';
    }
    i++;
  });
  if (i % 3 === 0) {
    resultElement += "</div>";
  }

  $(".js-favorites-list").html(resultElement);
}

function removeFavorite(shoeId) {
  $.ajax({
    url: "/users/favorites",
    type: "POST",
    data: JSON.stringify(shoeId),
    contentType: "application/json",
    success: function(data, status) {
      renderList(data);
    }
  });
}

$(function() {
  $(".js-favorites-list").on("click", ".remove-item", function(e) {
    let shoeId = {
      id: $(this)
        .closest(".sneaker-card")
        .find("p")
        .data("id")
    };
    removeFavorite(shoeId);
  });
});
