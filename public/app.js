$(function() {
  //log in and register buttons

  $(".login-register-btn").on("click", function(e) {
    console.log("clicked");
    if (!localStorage.getItem("loggedIn")) {
      $(".form").toggle();
    } else {
      swal({
        title: "Log out?",
        buttons: true
      }).then(willLogOut => {
        if (willLogOut) {
          logoutUser();
          swal("Logged out!", {
            icon: "success"
          });
        }
      });
    }
  });
  //adding highlight and activate animation to labels
  $(".form")
    .find("input, textarea")
    .on("keyup blur focus", function(e) {
      var $label = $('label[for="' + $(this).attr("id") + '"]');
      if ($(this).val() == "") {
        $label.show();
      } else {
        $label.hide();
      }
    });
  $(".sign-up-user").on("submit", function(e) {
    e.preventDefault();
    console.log("clicked");

    let data = {
      username: $("input[name=username]").val(),
      firstName: $("input[name=firstName]").val(),
      lastName: $("input[name=lastName]").val(),
      password: $("input[name=password]").val()
    };

    $.ajax({
      url: "/users",
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function(data, status) {
        console.log(data, status);
        $(".form").toggle();
        localStorage.setItem("loggedIn", "true");
        window.location.href = "http://localhost:8080/browse.html";
      }
    });
  });

  //sign up and login from switching
  $(".tab a").on("click", function(e) {
    e.preventDefault();
    $(this)
      .parent()
      .addClass("active");
    $(this)
      .parent()
      .siblings()
      .removeClass("active");

    let target = $(this).attr("href");
    $(".tab-content > div")
      .not(target)
      .hide();
    $(target).fadeIn(600);
  });

  //event listener for logging in

  $(".login-user").on("submit", function(e) {
    e.preventDefault();
    const username = $("input[name=username]").val();
    const password = $("input[name=password]").val();

    $.ajax({
      type: "GET",
      url: "http://localhost:8080/users/login",
      headers: {
        "content-type": "application/json",
        authorization: "Basic " + btoa(username + ":" + password)
      },
      contentType: "application/json",
      success: function(data, status) {
        console.log(data, status);
      }
    });
    $("input[name=username]").val("");
    $("input[name=password]").val("");
  });

  function logoutUser() {
    $.ajax({
      url: "http://localhost:8080/users/logout",
      type: "GET",
      success: function() {
        localStorage.removeItem("loggedIn");
      }
    });
  }
});
