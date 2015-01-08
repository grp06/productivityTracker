if (Meteor.isClient) {

    Template.calendar.helpers({

        returnDates: function() {
            var checkup = Checkup.find({}).fetch()

            var dates = _(checkup).chain()
                .pluck('day')
                .flatten()
                .uniq().compact().value();

            return dates
        }

    })

    Template.calendar.events({
        'click ul a': function(e) {
            var dateText = $(e.target).text();
            Session.set('dateText', dateText);
            var format = (Session.get('dateText'));
            console.log(format);
        }
    })




}