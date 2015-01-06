Checkup = new Meteor.Collection("checkup");

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

