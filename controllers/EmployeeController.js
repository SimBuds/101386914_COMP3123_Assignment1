const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  try {
    const { first_name, last_name, email, gender, salary } = req.body;

    if (!first_name || !last_name || !email || !gender || salary == null) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ error: 'Employee with this email already exists' });
    }

    const employee = new Employee({
      first_name,
      last_name,
      email,
      gender,
      salary,
    });

    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findById(employeeId);
    res.status(200).json({ employee });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};