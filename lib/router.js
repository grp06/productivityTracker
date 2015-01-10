Router.configure({
  layoutTemplate: 'layout',
   notFoundTemplate: 'notFound',

});




Router.map(function() {
    this.route('start', {
        path: '/',

    });

    this.route('checkupData', {
    });
});



Router.onBeforeAction(function () {
  // all properties available in the route function
  // are also available here such as this.params

  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('callToAction');
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }
});

