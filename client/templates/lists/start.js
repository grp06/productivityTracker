Checkup = new Meteor.Collection("checkup");

if (Meteor.isClient) {

    Meteor.startup(function() {

        var next = localStorage.nextSurvey;
        var now = Date.now();
        console.log(((next - now) / 1000) + " until next survey");

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
    })


        //when I press start, if I click away then click the start template
        //This rendered function will run which will:
        //first check to see if we've already passed the 'future date', then:
        //if we haven't, make a calculation to set the new Timeout
        //X seconds later timeout will expire and Session will be set to true
        //and template will show
    Template.start.rendered = function() {

        var next = localStorage.nextSurvey;
        var now = Date.now();
        console.log(((next - now) / 1000) + " until next survey");

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




    //returns true if the timer is expired
    //used to display the checkup template
    Template.start.helpers({
        showCheckup: function() {
            var next = localStorage.nextSurvey;
            var done = Session.get('done');
       
            var now  = new Blaze.Var(Date.now());
            if (next <= now){

                return true;
            } else if (done === true) {
                console.log('oh TRUE')
                return true;
            }
        }

    })


    //When you click 'start' a countdown timer starts
    //when it's done, session is set to true
    Template.start.events({
        'click .check': function(){
            var next = localStorage.nextSurvey;
            var now = Date.now();
        console.log(((next - now) / 1000) + " until next survey");

            console.log(next)
        },
        /*'click .startTimer': function() {

            $("#timer").text();

            (function() {
                var wait = 2;
                var countSpan = $('#timer span');

                function countdown() {

                    wait -= 1;

                    if (wait > 0) {
                        countSpan.text(wait);
                        setTimeout(countdown, 1000);
                        $('.startTimer').prop("disabled", true);
                        Session.set('done', false);

                    } else {
                        Session.set('done', true);
                        $('.startTimer').prop("disabled", false);
                        countSpan.text("Complete checkup then keep working!");



                    }

                }
                setTimeout(countdown, 1000);

            }());


        },*/
        //when I press start, if I don't click any links and don't refresh
        //10 seconds later timeout will expire and Session will be set to true
        //and template will show
        'click .start': function() {


            var next = Date.now() + 10000;
            localStorage.nextSurvey = next;
            var now = Date.now();
            console.log('next survey will appear in ' + ((next - now) / 1000) + ' seconds')

            $('.start').prop("disabled", true);

            Meteor.setTimeout(function() {
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

            }, 10000)

        },
        //when you click submit here, it takes all the form fields and inserts them
        //into the database
        'click .submitCheckup': function() {
            var workingOn = $('.workingOn').val();
            var workProd = $('.workProd').val();
            var focus = $('.focus').val();
            var posture = $('.posture').val();
            var mood = [];
            mood.push($('.mood').val());
            mood.push($('.mood2').val());
            var lastBreak = $('.lastBreak').val();
            var negThoughts = $('.negThoughts').val();
            var createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
            $('.start').prop("disabled", false);

            console.log(workingOn)
            console.log(workProd)
            console.log(focus)
            console.log(posture)
            console.log(mood)
            console.log(lastBreak)
            console.log(negThoughts)
            console.log(createdAt)


            if (mood != null) {
                Checkup.insert({
                    workingOn: workingOn,
                    workProd: workProd,
                    focus: focus,
                    posture: posture,
                    mood: mood,
                    negThoughts: negThoughts,
                    createdAt: createdAt

                }, Session.set('done', false));

            } //here 



        }

    })
}