module.exports = function(router, passport){

    /* GET login page. */
    router.get('/login', function(req, res, next) {
        res.render('login', { message: req.flash('loginMessage') });
    });

    router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

    /* GET home page. */
    router.get('/', isLoggedIn, function(req, res, next) {
        res.render('index', {user: req.user});
    });

    // logout function
	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/login');
	});


}

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}
