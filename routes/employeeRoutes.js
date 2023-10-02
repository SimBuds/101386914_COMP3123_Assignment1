const express = require('express');
const EmployeeController = require('../controllers/EmployeeController');

const router = express.Router();

router.post('/', EmployeeController.createEmployee);
router.get('/', EmployeeController.getEmployees);

module.exports = router;