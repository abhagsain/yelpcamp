const followButton = $('#btn_follow');
followButton.on('click', function (e) {
    e.preventDefault();
    const text = followButton.text().toLowerCase();
    if (text === 'follow') {
        // const profileID = $('form').attr('action').replace('/profile/', '');
        $.ajax({
            type: "POST",
            url: window.location.pathname,
            data: "json",
            success: function (response) {
                if (response === 'success') {
                    console.log("​response", response)
                }
            }
        });
        followButton.removeClass('btn btn-primary')
        followButton.addClass("btn btn-secondary").text('Following');
    } else if (text === 'following') {
        followButton.removeClass('btn btn-secondary')
        followButton.addClass("btn btn-primary").text('Follow');
    }

})