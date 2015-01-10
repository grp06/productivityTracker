if (Meteor.isClient) {



    Template.checkupData.helpers({
    	//This function populates the left 'calendar' sidebar
        returnDateData: function(){
            var tago = Session.get("dateText");
            var currentUserId = Meteor.userId();
            

            if( tago === null || tago === undefined ){
            	Session.set('dateText', 'January 8th')
 			} else {
 				     return Checkup.find({day: {$in: [tago] }, createdBy: currentUserId }, {sort: {createdAt: -1}})
 				     

 			}
           },
        returnDates: function () {
            var checkup = Checkup.find({}).fetch()

            var dates = _(checkup).chain()
                    .pluck('createdAt')
                    .flatten()
                    .uniq().compact().value();

    					return dates
        },
        noData: function(){
            var currentUserId = Meteor.userId();
            if(Checkup.find({}).count() !== 0){
                console.log('false')
                return false
            } else {

                console.log('true')
                return true
            }
        }
   
    })


    Template.checkupData.events({

        'mouseenter .dataStyle': function(){
            Session.set('recordId', this._id);
            console.log(this._id)
        },
        'click .deleteRecord': function(){
			


			var confirmDelete = confirm("Are you sure you want to delete this checkup?");
			if ( confirmDelete == true) {
			 	Checkup.remove({_id: Session.get('recordId')}, console.log('removed ' + Session.get('recordId')));

			} else {
			    console.log('Phew, That was close ');
			}


        }
    })

}

