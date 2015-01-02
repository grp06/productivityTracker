if (Meteor.isClient) {

    Template.checkupData.rendered = function() {

        var next = localStorage.nextSurvey;
        var now = Date.now();
        console.log(((next - now) / 1000) + " until next survey");
        surveyTimeout = null;

        if (next < now) {
            Session.set('done', true);

        } else if (next > now) {
            function surveyTimer() {
                surveyTimeout = setTimeout(function() {
                    // Let's check if the browser supports notifications
                    if (!("Notification" in window)) {
                        alert("This browser does not support desktop notifications. Upgrade your browser to Chrome or Firefox to make sure this app works properly");
                    }

                    // Let's check if the user is okay to get some notification
                    else if (Notification.permission === "granted") {
                        // If it's okay let's create a notification
                        var notification = new Notification("Fill Out The Checkup");
                        Session.set('done', true);

                    }

                    // Otherwise, we need to ask the user for permission
                    // Note, Chrome does not implement the permission static property
                    // So we have to check for NOT 'denied' instead of 'default'
                    else if (Notification.permission !== 'denied') {
                        Notification.requestPermission(function(permission) {
                            // If the user is okay, let's create a notification
                            if (permission === "granted") {
                                var notification = new Notification("Fill Out The Checkup");
                                Session.set('done', true);

                            }
                        });
                    };

                    // At last, if the user already denied any notification, and you 
                    // want to be respectful there is no need to bother them any more.

                }, (next - now))
            }
        } else {
            console.log("expiration must have passed")
        }
    }
}