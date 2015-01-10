// Any client may insert, update, or remove a post without restriction
//Checkup.permit(['insert', 'update', 'remove']).apply();

// No clients may insert, update, or remove Checkup
//Checkup.permit(['insert', 'update', 'remove']).never().apply();

// Clients may insert Checkup only if a user is logged in
Checkup.permit('insert').ifLoggedIn().apply();

// Clients may remove Checkup only if an admin user is logged in
Checkup.permit('remove').ifLoggedIn().apply();

// Admin users may update any properties of any post, but regular users may
// update Checkup only if they don't try to change the `author` or `date` properties
//Checkup.permit('update').ifHasRole('admin').apply();
//Checkup.permit('update').ifLoggedIn().exceptProps(['author', 'date']).apply();


