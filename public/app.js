'use strict';

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
