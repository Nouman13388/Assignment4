const express = require('express');
const connectDB = require('./connection');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config(); // Load environment variables

connectDB(); // Connect to MongoDB

const employeeRoutes = require('./routes/employee.routes');
const customerRoutes = require('./routes/customer.routes');
const trainRoutes = require('./routes/train.routes');
const ticketRoutes = require('./routes/ticket.routes');
const reservationRoutes = require('./routes/reservation.routes');

app.use(express.json());
app.use(cors()); // Enable CORS

app.use('/employee', employeeRoutes);
app.use('/customer', customerRoutes);
app.use('/train', trainRoutes);
app.use('/ticket', ticketRoutes);
app.use('/reservation', reservationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
