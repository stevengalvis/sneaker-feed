$(function() {
  //log in and register buttons

  $(".login-register-btn").on("click", function(e) {
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

    let data = {
      username: $("input[name=username]").val(),
      firstName: $("input[name=firstName]").val(),
      lastName: $("input[name=lastName]").val(),
      password: $("input[name=password]").val()
    };

    signUser(data);
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
    const username = $("#login-username").val();
    const password = $("#login-password").val();

    logUserIn(username, password);

    $("input[name=username]").val("");
    $("input[name=password]").val("");
  });

  function signUser(data) {
    const username = data.username;
    const password = data.password;
    $.ajax({
      url: "/users",
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function(data, status) {
        $(".form").toggle();
        logUserIn(username, password);
        window.location.href = "/browse.html";
      }
    });
  }

  function logUserIn(username, password) {
    $.ajax({
      type: "POST",
      url: "/users/login",
      headers: {
        "content-type": "application/json",
        authorization: "Basic " + btoa(username + ":" + password)
      },
      contentType: "application/json",
      success: function(data, status) {
        localStorage.setItem("loggedIn", "true");
        $(".form").toggle();
        window.location.href = "/browse.html";
      }
    });
  }

  function logoutUser() {
    $.ajax({
      url: "/users/logout",
      type: "GET",
      success: function() {
        localStorage.removeItem("loggedIn");
      }
    });
  }
});
