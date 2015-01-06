Checkup = new Meteor.Collection("checkup");

if (Meteor.isClient) {

    //returns true if the timer is expired
    //used to display the checkup template
    Template.start.helpers({
        showCheckup: function() {
            var now = Date.now();
            var next = localStorage.getItem('nextReminder');
            var expiresAt = Session.get('expiresAt');
            var show = expiresAt - now;
            if (expiresAt === undefined) {
                expiresAt = false;
            }
            console.log("expiresAt = " + expiresAt);
            console.log("next = " + next)

            
            if (now > next){
                console.log('scenario 3');
                next = 9999999999999999;
                return true
            } else if(now > next && expiresAt === false){
                console.log('scenario 1')
                return false
            } else if (next === null){
                console.log('scenario 2')
                return false
            }  

            console.log("next = " + next)




        }
    })

    

    Template.start.events({


        //when I press start, a server-side method runs with a setTimeout
        //when that setTimeout expires
        //and template will show
        'click .start': function() {
            $('.start').prop("disabled", true);

            /*
            Meteor.call('abc', function(error, response){
                var timeup = response
                Session.set('done', timeup)
            });
*/

            var next = Date.now() + 3000;
            localStorage.setItem('nextReminder', next);
            Meteor.setTimeout(function() {
                Session.set('expiresAt', true);
            }, 3000);

            //console.log(Date.now());
            //console.log(localStorage.getItem('nextReminder'));


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
            localStorage.setItem('nextReminder', 9999999999999999);




            /*
            console.log(workingOn)
            console.log(workProd)
            console.log(focus)
            console.log(posture)
            console.log(mood)
            console.log(lastBreak)
            console.log(negThoughts)
            console.log(createdAt)
*/

            if (mood != null) {
                Checkup.insert({
                    workingOn: workingOn,
                    workProd: workProd,
                    focus: focus,
                    posture: posture,
                    mood: mood,
                    negThoughts: negThoughts,
                    createdAt: createdAt

                }, Session.set('expiresAt', false));

            } //here 



        }

    })
}

/*    The following allows for notifications...Needs to be set inside
        of the setTimeout on the server

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

*/