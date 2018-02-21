function getVideos() {
    $.getJSON('https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&type=video&channelId=UCgRYPLRlim_lBmW926_ZrLg&maxResults=20&key=AIzaSyDp2jDlMFip_iwONxqESbWGuElsx9mEQnI', function(data) {
        var items = data.items;
        var ids = [];
        items.forEach(element => {
            ids.push(element.id.videoId);
        });
        placeVideos(ids);
    })
}

function placeVideos(ids) {
    ids.forEach(element => {
        $( "#youtube" ).append( '<iframe class="col-sm-3" width="420" height="315"src="https://www.youtube.com/embed/' + element + '"></iframe>' );
    });
}