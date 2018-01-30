renderFeedItems("jordan shoes");

//get search query
$(".search").on("submit", function(e) {
  e.preventDefault();
  let searchQuery = $(".search-term").val();
  renderFeedItems(searchQuery);
});

function renderFeedItems(searchQuery) {
  $.ajax({
    url: "https://api.shopstyle.com/api/v2/products?pid=uid1025-39588145-82&fts=" + searchQuery + "&offset=0&limit=10",
    type: "GET",
    success: function(data, status) {
      console.log(data);
      let resultElement = '<div class="row">';
      let i = 1;
      data.products.forEach(function(item) {
        resultElement +=
          '<div class="col-4"><div class="sneaker-card">' +
          '<div class="card-main-image">' +
          '<a href= "' +
          item.clickUrl +
          '">' +
          '<img src = "' +
          item.image.sizes.Best.url +
          '"</img></a></div>' +
          '<p data-id= "' +
          item.id +
          '"' +
          'class="branded-name">' +
          item.brandedName +
          "</p>" +
          '<div class ="wrapper-bottom-card">' +
          '<button type ="button" class ="favorite-button" title="Add to favorites">' +
          '<i class="fa fa-heart-o" aria-hidden="true"></i></button></div></div></div>';
        if (i % 3 === 0) {
          resultElement += '</div><div class ="row">';
        }
        i++;
      });
      if (i % 3 === 0) {
        resultElement += "</div>";
      }
      $(".js-sneaker-results").html(resultElement);
    }
  });
}

function itemInFavorites(shoeData) {
  $.ajax({
    url: "http://localhost:8080/users/favorites/" + shoeData.id,
    type: "GET",
    contentType: "application/json",
    success: function(status) {
      console.log(status);
      if (status.itemInFavorites == "false") {
        addToFavorites(shoeData);
      } else {
        console.log("Item already in favorites");
        swal("Item already in favorites");
      }
    },
    error: function(xhr, status, error) {
      console.log(xhr.responseText);
      console.log(error);
    }
  });
}

function addToFavorites(shoeData) {
  $.ajax({
    url: "http://localhost:8080/users/favorites",
    type: "PUT",
    data: JSON.stringify(shoeData),
    contentType: "application/json",
    success: function(data, status) {
      console.log(data, status);
      favoritesNotification();
    }
  });
}

function favoritesNotification() {
  swal("Added to Favorites.");
}

//dom manipulation

$(function() {
  //event listener for favorites
  //  get data from resultElement
  $(".js-sneaker-results").on("click", ".favorite-button", function(e) {
    let shoeData = {
      id: $(this)
        .closest(".sneaker-card")
        .find("p")
        .data("id"),
      brandedName: $(this)
        .closest(".sneaker-card")
        .find(".branded-name")
        .text(),
      shoeUrl: $(this)
        .parent()
        .siblings(".card-main-image")
        .find("a")
        .attr("href"),
      img: $(this)
        .parent()
        .siblings(".card-main-image")
        .find("a")
        .children("img")
        .attr("src")
    };
    console.log(shoeData);
    itemInFavorites(shoeData);
  });
});
