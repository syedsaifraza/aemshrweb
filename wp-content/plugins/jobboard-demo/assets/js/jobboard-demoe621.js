(function( $ ) {
    "use strict";
    $('.jobboard-login-now').on('click', '.login-candidate, .login-employer', function () {
        var user = $(this).data('user');

        if(!user || user == undefined){
            return false;
        }

        $.post(ajaxurl, {
            'action': 'jobboard_demo_login',
            'user': user,
            'post_id': jobboard_demo.post_id
        },
            function(response) {
                if(response != ''){
                    window.location.href = response;
                } else {
                    location.reload();
                }
            }
        );
    })
})( jQuery );