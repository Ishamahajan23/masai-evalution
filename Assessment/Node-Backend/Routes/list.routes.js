const express = require('express');
const router = express.Router();
const { createList, getEquipments, editEquipment, deleteEquipment } = require('../Controllers/getlist.controller');

router.get('/', getEquipments);
router.post('/', createList);
router.put('/:id', editEquipment);
router.delete('/:id', deleteEquipment);

module.exports = router;