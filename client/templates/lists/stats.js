if(Meteor.isClient){


	Template.stats.helpers({
		returnStats: function () {
			return Checkup.find({}).count()
		},
		//I know there's a better way to do this with Mongo.
		//I'm just impatient OK?!?
		/*returnLast: function(){
            var checkup = Checkup.find({}).fetch();
            var lastObject = checkup[checkup.length - 1];
            return lastObject.createdAt
		},
		//maybe also add in checkups today?
		*/
	});

}