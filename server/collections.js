Checkup = new Meteor.Collection("checkup");

//Publishing only the current user's records to the DB
Meteor.publish('checkup', function () {
	var currentUserId = Meteor.userId
  return Checkup.find({});
})


/*
//This is how I went about setting a timeout on the server.
//I think I still had a problem with persisting through a page refresh.
//Cool stuff anyway

//declare a simple async function
		function delayedMessge(callback) {
		    Meteor.setTimeout(function() {


		        callback(null, true)

		    }, 3000)
		}

		var wrappedDelayedMessage = Async.wrap(delayedMessge);

		Meteor.methods({
		    'abc': function() {
		        var response = wrappedDelayedMessage();

		        return response;
		    }
		});

*/