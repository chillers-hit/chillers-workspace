const Router = require('express').Router;
const router = new Router();

router.use('/users', require('./api/users'));
router.use('/chillers', require('./api/chillers'));
module.exports = router;
