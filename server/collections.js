Checkup = new Meteor.Collection("checkup");


Meteor.publish('checkup', function () {
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