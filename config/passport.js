var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport, sequelize){

    var User = require('.././models/user.js')(sequelize);

	passport.serializeUser(function(user, done) {
       done(null, user.userId);
    });

    passport.deserializeUser(function(id, done){
        User.findAll({where: {userId: id}})
            .then(function(response){
                if(response)
                    done(null, response[0]);
                else
                    done(null);
            })
            .catch(function(err){
                done(err);
            });
    });

    // signup
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
        User.findOne({where: {email: req.body.email}})
            .then(function(response){
                if(response) {
                    return done(null, false, 'That email is already taken.');
                }
                else {
                    var hashPwd;
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(password, salt, null, function(err, hash) {
                            if(err) {
                                return done(null, false, 'Error');
                            }
                            else {
                                var newUser = new Object();
                                newUser.name = req.body.name;
                                newUser.email = email;
                                newUser.password = hash;
                                newUser.userRole = req.body.user_role;
                                newUser.status = req.body.status;
                                
                                User.create(newUser)
                                    .then(function(response){
                                        return done(null, newUser);
                                    })
                                    .catch(function(err){
                                        return done(null, false, err);
                                    });
                            }
                            
                        });
                    });
                }
            })
            .catch(function(err){
                return done(err);
            });

    }));

    // login
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) { 
        console.log(email);
        console.log(password);
        User.findAll({where: {email: email}})
            .then(function(response){
                if(!response.length) {
                    return done(null, false, req.flash('loginMessage', 'No User found'));     
                }
                bcrypt.compare(password, response[0].password, function(err, res) {
                    if(err) {
                        return done(null, false, 'Error');
                    }
                    if(res == true) {
                        return done(null, response[0]); 
                    }
                    else {
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }
                });
            })
            .catch(function(err){
                return done(err);
            })
    }));


};
