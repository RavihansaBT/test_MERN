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

router.route('/bio/:bio_id')
    .get(bioController.view)
    .patch(bioController.update)
    .put(bioController.update)
    .delete(bioController.delete);

router.route('/file')
    .delete(bioController.deleteFile)

router.route('/file/:fileName')
    .delete(bioController.deleteFile)



module.exports = router;