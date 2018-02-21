function onLinkedInLoad() {
    IN.Event.on(IN, "auth", onLinkedInAuth);
}


// 2. Runs when the viewer has authenticated
function onLinkedInAuth() {

    IN.API.Profile("me").fields("id", "first-name", "last-name", "email-address").result(displayProfiles);
}

// 2. Runs when the Profile() API call returns successfully
function displayProfiles(profiles) {
    member = profiles.values[0];
    document.getElementById('userName').innerHTML = member.firstName + " " + member.lastName;
    showTabs();
}

function showTabs() {
    $('#userName').show();
    $('#login').hide();
}