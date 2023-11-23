print('START');

db = db.getSiblingDB('mongodb-fullstack');

db.createUser({
    user: 'admin',
    pwd: 'password',
    roles: [{ role: 'readWrite', db: 'fullstack-database'}],
});

db.createCollection('users');

db.users.insertMany([
    { username: "user1", password: "password", role: "admin" },
    { username: "user2", password: "password", role: "user" },
]);

db.createCollection('employees');

db.employees.insertMany([
    { firstName: "John", lastName: "Doe", email: "john.doe@email.com"},
    { firstName: "Jane", lastName: "Doe", email: "jane.doe@email.com"},
]);

print('END');