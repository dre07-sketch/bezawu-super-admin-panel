require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { query } = require('./connection/db'); // import your db.js
const path = require('path');
const app = express();

// Middleware
app.use(cors({
    origin: ['https://superadmin.ristestate.com', 'http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
const authRoutes = require('./auth/auth');
app.use('/api/auth', authRoutes);

// Dashboard routes
const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);

// Supermarket routes
const supermarketRoutes = require('./routes/supermarkets');
app.use('/api/supermarkets', supermarketRoutes);

// Branch routes
const branchRoutes = require('./routes/branches');
app.use('/api/branches', branchRoutes);

// Network routes
const networkRoutes = require('./routes/network');
app.use('/api/network', networkRoutes);

// Finance routes
const financeRoutes = require('./routes/finance');
app.use('/api/finance', financeRoutes);

// Users routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Feedback routes
const feedbackRoutes = require('./routes/feedback');
app.use('/api/feedback', feedbackRoutes);

// Audit logs routes
const auditRoutes = require('./routes/audit-logs');
app.use('/api/audit-logs', auditRoutes);

// System routes
const systemRoutes = require('./routes/system');
app.use('/api/system', systemRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});









const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});