const router = require('express').Router();
// Import bio controller
var bioController = require('./bioController');

router.get('/',(req, res) =>{
    res.json({
        status: 'API works',
        message : 'Welcome to first REST API'
    });
});

// Bio Routs
router.route('/bio')
    .get(bioController.index)
    .post(bioController.add)
    .post(bioController.uploadFile);

router.route('/bio/:bio_id')
    .get(bioController.view)
    .patch(bioController.update)
    .put(bioController.update)
    .delete(bioController.delete);



module.exports = router;