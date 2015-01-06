if (Meteor.isClient) {


    Template.checkupData.helpers({
        returnAllData: function(){
            return Checkup.find()
        }
    })

}