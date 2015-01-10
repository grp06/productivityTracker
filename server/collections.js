Checkup = new Meteor.Collection("checkup");

//Publishing only the current user's records to the DB
Meteor.publish('checkup', function () {
	var currentUserId = this.userId;
  return Checkup.find({createdBy: currentUserId});
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

//////////////////////I want to insert dummy data!
/*
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Checkup.find().count() === 0){
    var currentUserId = this.userId;
    var day = moment().format('MMMM Do');
    var month = moment().format('MMMM');
    var createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');




      var data = 
                    {
                    workingOn: "Example of what you worked on",
                    workProd: '6',
                    focus: '6',
                    posture: '6',
                    mood: '6',
                    negThoughts: '6',
                    createdAt: createdAt,
                    month: '6',
                    day: day,
                    lastBreak: '6',
                    createdBy: currentUserId
                }
      

        Checkup.insert(data);
      
    }
  });
}
*/