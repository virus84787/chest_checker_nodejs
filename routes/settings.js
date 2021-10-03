const expres = require('express')
const router = expres.Router();
const { updateSettings } = require('../controllers/settings_controller');

router.get('/', updateSettings);








module.exports = router;