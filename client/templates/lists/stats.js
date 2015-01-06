if(Meteor.isClient){


	Template.stats.helpers({
		returnStats: function () {
			return Checkup.find({}).count()
		}
	});

}