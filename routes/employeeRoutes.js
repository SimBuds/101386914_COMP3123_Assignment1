const express = require('express');
const EmployeeController = require('../controllers/EmployeeController');

const router = express.Router();

router.post('/', EmployeeController.createEmployee);
router.get('/', EmployeeController.getEmployees);
router.get('/:eid', EmployeeController.getEmployeeById);
router.put('/:eid', EmployeeController.updateEmployee);
router.delete('/:eid', EmployeeController.deleteEmployee);

module.exports = router;