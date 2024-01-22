const mongoose = require('mongoose');

// Replace the MongoDB URL with your own URL
const mongoDBURL = 'mongodb+srv://kayalkayu2003:zdxb5zUdKM2OhyXZ@cluster0.sggtuv2.mongodb.net/employee';

// Connect to MongoDB
mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define Employee Schema
const employeeSchema = new mongoose.Schema({
  emp_id: { type: Number, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
});

// Create Employee model
const Employee = mongoose.model('Employee', employeeSchema);

// Sample Employee Data
const employeeData =[
    { "emp_id": 1, "name": "John Doe", "role": "Manager", "email": "john.doe@example.com", "phone": "123-456-7890" },
    { "emp_id": 2, "name": "Jane Smith", "role": "Developer", "email": "jane.smith@example.com", "phone": "987-654-3210" },
    { "emp_id": 3, "name": "Michael Johnson", "role": "Manager", "email": "michael.johnson@example.com", "phone": "555-123-4567" },
    { "emp_id": 4, "name": "Emily Davis", "role": "Developer", "email": "emily.davis@example.com", "phone": "777-888-9999" },
    { "emp_id": 5, "name": "Robert Miller", "role": "Team Lead", "email": "robert.miller@example.com", "phone": "333-666-9999" },
    { "emp_id": 6, "name": "Sophia Anderson", "role": "Human Resource", "email": "sophia.anderson@example.com", "phone": "111-222-3333" },
    { "emp_id": 7, "name": "William Brown", "role": "Vice President", "email": "william.brown@example.com", "phone": "444-555-6666" },
    { "emp_id": 8, "name": "Olivia White", "role": "Developer", "email": "olivia.white@example.com", "phone": "999-888-7777" },
    { "emp_id": 9, "name": "Daniel Wilson", "role": "Manager", "email": "daniel.wilson@example.com", "phone": "123-456-7890" },
    { "emp_id": 10, "name": "Ava Thomas", "role": "Developer", "email": "ava.thomas@example.com", "phone": "987-654-3210" },
    { "emp_id": 11, "name": "James Harris", "role": "Team Lead", "email": "james.harris@example.com", "phone": "555-123-4567" },
    { "emp_id": 12, "name": "Ella Lewis", "role": "Human Resource", "email": "ella.lewis@example.com", "phone": "777-888-9999" },
    { "emp_id": 13, "name": "Matthew Hall", "role": "Manager", "email": "matthew.hall@example.com", "phone": "333-666-9999" },
    { "emp_id": 14, "name": "Amelia Turner", "role": "Developer", "email": "amelia.turner@example.com", "phone": "111-222-3333" },
    { "emp_id": 15, "name": "Benjamin Moore", "role": "Vice President", "email": "benjamin.moore@example.com", "phone": "444-555-6666" },
    { "emp_id": 16, "name": "Mia Green", "role": "Manager", "email": "mia.green@example.com", "phone": "999-888-7777" },
    { "emp_id": 17, "name": "Logan Robinson", "role": "Team Lead", "email": "logan.robinson@example.com", "phone": "123-456-7890" },
    { "emp_id": 18, "name": "Harper Wright", "role": "Developer", "email": "harper.wright@example.com", "phone": "987-654-3210" },
    { "emp_id": 19, "name": "Lucas Martin", "role": "Manager", "email": "lucas.martin@example.com", "phone": "555-123-4567" },
    { "emp_id": 20, "name": "Aria Hill", "role": "Human Resource", "email": "aria.hill@example.com", "phone": "777-888-9999" },
    { "emp_id": 21, "name": "Jackson Perez", "role": "Developer", "email": "jackson.perez@example.com", "phone": "333-666-9999" },
    { "emp_id": 22, "name": "Avery Carter", "role": "Vice President", "email": "avery.carter@example.com", "phone": "111-222-3333" },
    { "emp_id": 23, "name": "Liam Foster", "role": "Manager", "email": "liam.foster@example.com", "phone": "444-555-6666" },
    { "emp_id": 24, "name": "Evelyn Hayes", "role": "Developer", "email": "evelyn.hayes@example.com", "phone": "999-888-7777" },
    { "emp_id": 25, "name": "Carter Barnes", "role": "Team Lead", "email": "carter.barnes@example.com", "phone": "123-456-7890" },
    { "emp_id": 26, "name": "Scarlett Ward", "role": "Human Resource", "email": "scarlett.ward@example.com", "phone": "987-654-3210" },
    { "emp_id": 27, "name": "Grayson Fisher", "role": "Vice President", "email": "grayson.fisher@example.com", "phone": "555-123-4567" },
    { "emp_id": 28, "name": "Luna Simmons", "role": "Manager", "email": "luna.simmons@example.com", "phone": "777-888-9999" },
    { "emp_id": 29, "name": "Nolan Jordan", "role": "Developer", "email": "nolan.jordan@example.com", "phone": "333-666-9999" },
    { "emp_id": 30, "name": "Zoe Bryant", "role": "Vice President", "email": "zoe.bryant@example.com", "phone": "111-222-3333" },
    { "emp_id": 31, "name": "Eli Evans", "role": "Manager", "email": "eli.evans@example.com", "phone": "444-555-6666" },
    { "emp_id": 32, "name": "Penelope Palmer", "role": "Developer", "email": "penelope.palmer@example.com", "phone": "999-888-7777" },
    { "emp_id": 33, "name": "Levi Bennett", "role": "Team Lead", "email": "levi.bennett@example.com", "phone": "123-456-7890" },
    { "emp_id": 34, "name": "Aria Gonzalez", "role": "Human Resource", "email": "aria.gonzalez@example.com", "phone": "987-654-3210" },
    { "emp_id": 35, "name": "Caleb Martinez", "role": "Vice President", "email": "caleb.martinez@example.com", "phone": "555-123-4567" },
    { "emp_id": 36, "name": "Sofia Edwards", "role": "Manager", "email": "sofia.edwards@example.com", "phone": "777-888-9999" },
    { "emp_id": 37, "name": "Mason Carter", "role": "Developer", "email": "mason.carter@example.com", "phone": "333-666-9999" },
    { "emp_id": 38, "name": "Isabella Wright", "role": "Team Lead", "email": "isabella.wright@example.com", "phone": "111-222-3333" },
    { "emp_id": 39, "name": "Elijah Harris", "role": "Human Resource", "email": "elijah.harris@example.com", "phone": "444-555-6666" },
    { "emp_id": 40, "name": "Hazel Davis", "role": "Vice President", "email": "hazel.davis@example.com", "phone": "999-888-7777" },
    { "emp_id": 41, "name": "Liam Robinson", "role": "Manager", "email": "liam.robinson@example.com", "phone": "123-456-7890" },
    { "emp_id": 42, "name": "Ella Turner", "role": "Developer", "email": "ella.turner@example.com", "phone": "987-654-3210" },
    { "emp_id": 43, "name": "Ethan Foster", "role": "Team Lead", "email": "ethan.foster@example.com", "phone": "555-123-4567" },
    { "emp_id": 44, "name": "Ava Ward", "role": "Human Resource", "email": "ava.ward@example.com", "phone": "777-888-9999" },
    { "emp_id": 45, "name": "Landon Adams", "role": "Vice President", "email": "landon.adams@example.com", "phone": "333-666-9999" },
    { "emp_id": 46, "name": "Mia Powell", "role": "Manager", "email": "mia.powell@example.com", "phone": "111-222-3333" },
    { "emp_id": 47, "name": "Owen Simmons", "role": "Developer", "email": "owen.simmons@example.com", "phone": "444-555-6666" },
    { "emp_id": 48, "name": "Avery Sanders", "role": "Team Lead", "email": "avery.sanders@example.com", "phone": "999-888-7777" },
    { "emp_id": 49, "name": "Scarlett Turner", "role": "Human Resource", "email": "scarlett.turner@example.com", "phone": "123-456-7890" },
    { "emp_id": 50, "name": "Benjamin Palmer", "role": "Vice President", "email": "benjamin.palmer@example.com", "phone": "987-654-3210" }
  ]
  

// Save Employee Data to MongoDB
db.once('open', async () => {
  try {
    // Clear existing data in the "employees" collection
    await Employee.deleteMany({});
    
    // Insert new data
    await Employee.insertMany(employeeData);
    
    console.log('Employee data successfully inserted into MongoDB!');
  } catch (error) {
    console.error('Error inserting employee data into MongoDB:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
});
