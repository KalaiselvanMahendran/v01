module.exports = function(router){

    /* GET login page. */
    router.get('/login', function(req, res, next) {
        res.render('login');
    });

    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });


}
