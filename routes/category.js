module.exports = function(router, sequelize) {

	var Category = require('.././models/category.js')(sequelize);

    // get all category
    router.get('/category', function(req, res){
        Category.findAll({where: {status: 1}})
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

    // post new category
    router.post('/category', function(req, res){
        Category.create(req.body)
            .then(function(response){
                res.json({success: true, status: 200, data: response});
            })
            .catch(function(err){
                res.json({success: false, status: 404, message: err.stack});
            });
    });

    // get one category
    router.get('/category/:categoryId', function(req, res){
        var categoryId = req.params.categoryId;
        Category.findOne({where: {categoryId: categoryId}})
            .then(function(response){
                res.json({success: true, status: 200, data: response});
            })
            .catch(function(err){
                res.json({success: false, status: 404, message: err.stack});
            }); 
    })

}