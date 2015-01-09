Meteor.subscribe("checkup");

Checkup = new Meteor.Collection("checkup");


if (Meteor.isClient) {


    Template.checkup.rendered = function() {
        $('.dropdown')
            .dropdown({
                // you can use any ui transition
                transition: 'drop'
            });
    };



    Template.start.rendered = function() {
        if (Session.get('dateText') === null || Session.get('dateText') === undefined) {
            Session.set('dateText', 'January 8th');
        }
    };

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
            //console.log("expiresAt = " + expiresAt);
            //console.log("next = " + next)


            if (now > next) {
                console.log('scenario 3');
                next = 9999999999999999;
                return true
            } else if (now > next && expiresAt === false) {
                console.log('scenario 1')
                return false
            } else if (next === null) {
                console.log('scenario 2')
                return false
            }

            //console.log("next = " + next)




        },
        showButton: function() {
            var now = Date.now();
            var next = localStorage.getItem('nextReminder');
            var expiresAt = Session.get('expiresAt');
            var show = expiresAt - now;
            if (now > next) {
                console.log('hideButton');
                return true
            } else if (now > next && expiresAt === false) {
                console.log('show1')
                return false
            } else if (next === null) {
                console.log('show2')
                return false
            }
        }
    })


    Template.button.helpers({

        nextUpdate: function() {

            if (Session.get('nextUpdate')) {
                return Session.get('nextUpdate')
            } else
                return localStorage.getItem('nextUpdate');

        }
    })



    Template.start.events({
        'click .now': function() {
            Session.set('expiresAt', true)
            localStorage.setItem('nextReminder', 0);

        },


        //when I press start, a server-side method runs with a setTimeout
        //when that setTimeout expires
        //and template will show
        'click .start': function() {

            /*
            Meteor.call('abc', function(error, response){
                var timeup = response
                Session.set('done', timeup)
            });
*/
            $('.start').prop("disabled", true);




            var nextUpdate = moment().add(30, 'minutes').format('h:mm:ss a');
            console.log(nextUpdate)
            localStorage.setItem('nextUpdate', nextUpdate);
            Session.set('nextUpdate', nextUpdate);


            //localStorage.setItem('nextUpdate', nextUpdate);

            var next = Date.now() + 1800000;
            localStorage.setItem('nextReminder', next);



            Meteor.setTimeout(function() {
                Session.set('expiresAt', true);
            }, 1800000);



            //console.log(Date.now());
            //console.log(localStorage.getItem('nextReminder'));


        },
        //when you click submit here, it takes all the form fields and inserts them
        //into the database
        'click .submitCheckup': function() {
            var mood = [];
            if ($('.mood1 .selected').text()){
            mood.push($('.mood1 .selected').text());

            }
                        if ($('.mood2 .selected').text()){
            mood.push($('.mood2 .selected').text());

            }
                        if ($('.mood3 .selected').text()){
            mood.push($('.mood3 .selected').text());

            }

            var workingOn = $('.workingOn').val();
            var workProd = $('.workProd').val();
            var focus = $('.focus').val();
            var posture = $('.posture').val();
            
            var lastBreak = $('.lastBreak').val();
            var negThoughts = $('.negThoughts').val();
            var createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
            var day = moment().format('MMMM Do');
            var lastBreak = $('.lastBreak').val();
            var currentUserId = Meteor.userId();

            var month = moment().format('MMMM');

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

                Checkup.insert({
                    workingOn: workingOn,
                    workProd: workProd,
                    focus: focus,
                    posture: posture,
                    mood: mood,
                    negThoughts: negThoughts,
                    createdAt: createdAt,
                    month: month,
                    day: day,
                    lastBreak: lastBreak,
                    createdBy: currentUserId

                }, Session.set('expiresAt', false));

             //here 



        },
        'click .cancel': function() {

            localStorage.setItem('nextReminder', null);
            localStorage.setItem('nextUpdate', null);
            Session.set('expiresAt', false)


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