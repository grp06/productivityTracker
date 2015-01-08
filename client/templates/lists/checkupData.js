if (Meteor.isClient) {


    Template.checkupData.helpers({
        returnDateData: function(){
            var tago = Session.get("dateText");
            return Checkup.find({day: {$in: [tago] }})        },
        returnDates: function () {
            var checkup = Checkup.find({}).fetch()

            var dates = _(checkup).chain()
                    .pluck('createdAt')
                    .flatten()
                    .uniq().compact().value();

                    return dates
        }
      
   
    })


    Template.checkupData.events({
        'click .deleteRecord': function(){

        },
        'mouseenter .dataStyle': function(){
            Session.set('recordId', this._id);
            console.log(this._id)
        },
        'click .deleteRecord': function(){
            Checkup.remove({_id: Session.get('recordId')}, console.log('removed ' + Session.get('recordId')));
        }
    })

}