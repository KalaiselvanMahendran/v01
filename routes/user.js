module.exports = function(router, sequelize) {

	var User = require('.././models/user.js')(sequelize);

    // get all users
    router.get('/users', function(req, res){
        User.findAll({where: {status: 1}})
            .then(function(response){
                if(response.length > 0)
                    res.json({success: true , status: 200, data: response});
                else
                    res.json({success: true , status: 404, message: 'No record found'});
            })
            .catch(function(err){
                res.json({success: false, status: 500, message: err.stack});
            });
    });

    // login authentication

    // signup
    // router.post('/signup', function(req, res, next) {
    //     passport.authenticate('local-signup', function(err, user, info) {
    //         if (err) { 
    //             return next(err); 
    //         }
    //         if (!user) { 
    //             res.json({success: true, message: info});
    //         }
    //         else {
    //             res.json({success: true, message: "user created successfully"}) 
    //         }
    //     })(req, res, next);
    // });

    // login
    // router.post('/login', function(req, res, next) {
    //     passport.authenticate('local-login', function(err, user, info) {
    //         if (err) { 
    //             return next(err); 
    //         }
    //         if (!user) { 
    //             res.json({success: true, message: info});
    //         }
    //         else {
    //             req.logIn(user, function(err) {
    //                 if (err) { 
    //                     res.json({success: true, message: err});
    //                 }
    //                 res.json({success: false});
    //             }); 
    //         }
    //     })(req, res, next);
    // });

}