if(Meteor.isClient){


	Template.stats.helpers({
		returnStats: function () {
			return Checkup.find({}).count()
		},
		//I know there's a better way to do this with Mongo.
		//I'm just impatient OK?!?
		returnLast: function(){
            
            return Checkup.find({}, {sort: {createdAt: -1}, limit: 1})
		}
		//maybe also add in checkups today?
	});

}