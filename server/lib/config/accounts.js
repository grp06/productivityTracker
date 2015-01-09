// Set up login services
Meteor.startup(function() {
    // Remove configuration entries in case service is already configured
    ServiceConfiguration.configurations.remove({$or: [
        {service: "facebook"},
        {service: "github"},
        {service: "google"},
        {service: "linkedin"}
    ]});

    
    //Add Facebook configuration entry

    
    ServiceConfiguration.configurations.insert({
        "service": "facebook",
        "appId": "1532370840359110",
        "secret": "f99a7650973b5433a6586da1b87d1be3"
    });



/*
    // Add GitHub configuration entry
    ServiceConfiguration.configurations.insert({
        "service": "github",
        "clientId": "XXXXXXXXXXXXXXXXXXXX",
        "secret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    });
    */

    // Add Google configuration entry
    ServiceConfiguration.configurations.insert({
        "service": "google",
        "clientId": "790533658820-19m17ghojvb1f4rgrcqpbpgtq7f4un7c.apps.googleusercontent.com",
        "client_email": "790533658820-19m17ghojvb1f4rgrcqpbpgtq7f4un7c@developer.gserviceaccount.com",
        "secret": "y17y5Mpj-GNn7UpA-tCY-3lv"
    });

    /*
    // Add Linkedin configuration entry
    ServiceConfiguration.configurations.insert({
        "service": "linkedin",
        "clientId": "XXXXXXXXXXXXXX",
        "secret": "XXXXXXXXXXXXXXXX"
    });
    */
});
