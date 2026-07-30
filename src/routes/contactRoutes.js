const { Router } = require('express');
const contactController = require('../controllers/contactController');
const { validateContactPayload } = require('../middlewares/validateContact');

const router = Router();

router.post('/contatos', validateContactPayload, (req, res) => contactController.create(req, res));
router.get('/contatos', (req, res) => contactController.getAll(req, res));
router.patch('/contatos/:id', validateContactPayload, (req, res) => contactController.update(req, res));
router.delete('/contatos/:id', (req, res) => contactController.delete(req, res));

module.exports = router;