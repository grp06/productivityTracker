if(Meteor.isClient){

	Template.checkup.rendered = function () {
		$('.dropdown')
  .dropdown({
    // you can use any ui transition
    transition: 'drop'
  })
;
	};
}