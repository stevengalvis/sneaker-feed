'use strict';


//dom manipulation

$(function() {
    $(".sign-up").on('submit', function(e) {
        console.log('clicked');
        //   $.post("http://localhost:8080/users", {
        //     username: $("input[name=username]").val(),
        //     firstName: $("input[name=firstName]").val(),
        //     lastName: $("input[name=lastName]").val(),
        //     password: $("input[name=password]").val()
        //   },
        //   function(data, status){
        //       console.log(data);
        //   });
        // });

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/users",
            data: {
                username: $("input[name=username]").val(),
                firstName: $("input[name=firstName]").val(),
                lastName: $("input[name=lastName]").val(),
                password: $("input[name=password]").val()
            },
            success: function(data, status) {
                console.log(data, status);
            }
        });

    });
});
