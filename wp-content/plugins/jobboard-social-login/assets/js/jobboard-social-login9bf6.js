(function ($) {
    "use strict";

    $(window).on('load', function () {
        
    });

    function load_social() {
        
        
    }

    var google_login = function (user) {
        var profile = user.getBasicProfile();
        login({
            user_login: profile.getId(),
            user_email: profile.getEmail(),
            display_name: profile.getName(),
            first_name: profile.getGivenName(),
            last_name: profile.getFamilyName(),
            user_image: profile.getImageUrl()
        });
    };

})(jQuery);

// Setup an event listener to make an API call once auth is complete
function onLinkedInLoad() {

    IN.User.authorize(function () {
        // callback();
    });

    IN.Event.on(IN, "auth", getProfileData);
}

// Handle the successful return from the API call
function onSuccess(data) {
    login({
        user_login: data.id,
        user_email: data.emailAddress,
        display_name: data.formattedName,
        first_name: data.firstName,
        last_name: data.lastName,
        user_image: data.pictureUrl,
        user_meta: {
            user_country: data.location.name,
            description: data.summary,
            'social-linkedin': data.publicProfileUrl
        }
    });
}

// Handle an error response from the API call
function onError(error) {
    console.log(error);
}

// Use the API call wrapper to request the member's basic profile data
function getProfileData() {
    IN.API.Raw("/people/~:(id,email-address,first-name,last-name,formatted-name,picture-url,location,public-profile-url,summary)?format=json").result(onSuccess).error(onError);
}

function login(profile) {
    jQuery.post(jb_social_login.ajaxurl, {'action': 'jb_social_login', 'profile': profile}, function (response) {
        if (jb_social_login.debug == true) {
            console.log(response);
        }
        location.reload();
    });
}