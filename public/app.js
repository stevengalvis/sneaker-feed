$(function() {
  //log in and register buttons

  let isFormOpen = false;

  $(".login-register-btn").on("click", function(e) {
    if (!localStorage.getItem("loggedIn")) {
      $(".form").toggle();
      isFormOpen = true;
      console.log(isFormOpen + " when btn click");
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

  $("html").click(function(e) {
    $(".form").toggle();
    isFormOpen = false;
    console.log("hee");
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

    $.ajax({
      url: "/users",
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function(data, status) {
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
    const username = $("#login-username").val();
    const password = $("#login-password").val();

    $.ajax({
      type: "POST",
      url: "http://localhost:8080/users/login",
      headers: {
        "content-type": "application/json",
        authorization: "Basic " + btoa(username + ":" + password)
      },
      contentType: "application/json",
      success: function(data, status) {
        localStorage.setItem("loggedIn", "true");
        $(".form").toggle();
        window.location.href = "http://localhost:8080/browse.html";
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
