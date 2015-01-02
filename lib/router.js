Router.configure({
  layoutTemplate: 'layout',
   notFoundTemplate: 'notFound',

});


  Router.route('/start', {
    name: 'start'
  });

    Router.route('/checkupData', {
    name: 'checkupData'
  });

if(Meteor.isStartup){
	   Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
    });

}

