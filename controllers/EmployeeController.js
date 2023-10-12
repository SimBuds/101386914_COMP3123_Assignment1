const Employee = require('../models/Employee');

const EmployeeController = {
  // Method to create a new employee
  async createEmployee(req, res) {
    try {
      const employee = new Employee(req.body);
      await employee.save();
      res.status(201).send({ message: 'Employee has been created successfully.', employee });
    } catch (error) {
      res.status(500).send({ message: 'Server error please try again.', error: error.message });
    }
  },

  // Method to get all employees
  async getEmployees(req, res) {
    try {
      const employees = await Employee.find();
      res.status(200).send(employees);
    } catch (error) {
      res.status(500).send({ message: 'Server error please try again.', error: error.message });
    }
  },

  // Method to get an employee by ID
  async getEmployeeById(req, res) {
    try {
      const employee = await Employee.findById(req.params.eid);
      if (!employee) {
        return res.status(404).send({ message: 'Sorry Employee was not found' });
      }
      res.status(200).send(employee);
    } catch (error) {
      res.status(500).send({ message: 'Server error please try again.', error: error.message });
    }
  },

  // Method to update an employee by ID
  async updateEmployee(req, res) {
    try {
      const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
      if (!employee) {
        return res.status(404).send({ message: 'Sorry Employee was not found' });
      }
      res.status(200).send({ message: 'Employee updated successfully', employee });
    } catch (error) {
      res.status(500).send({ message: 'Server error please try again.', error: error.message });
    }
  },

  // Method to delete an employee by ID
  async deleteEmployee(req, res) {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.eid);
      if (!employee) {
        return res.status(404).send({ message: 'Sorry Employee was not found' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send({ message: 'Server error please try again.', error: error.message });
    }
  }
};

module.exports = EmployeeController;