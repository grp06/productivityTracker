if(Meteor.isClient){


	Template.stats.helpers({
		returnStats: function () {
			var currentUserId = Meteor.userId()

			return Checkup.find({createdBy: currentUserId}).count()
		},
		//I know there's a better way to do this with Mongo.
		//I'm just impatient OK?!?
		returnLast: function(){
            var currentUserId = Meteor.userId()
            return Checkup.find({createdBy: currentUserId}, {sort: {createdAt: -1}, limit: 1})
		}
		//maybe also add in checkups today?
	});

}