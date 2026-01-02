import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import memberRoutes from './routes/memberRoutes.js';
import authRoutes from './routes/authRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import adminUserRoutes from './routes/adminUserRoutes.js';
import photoRoutes from './routes/photoRoutes.js';
import officeBearerRoutes from './routes/officeBearerRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// CORS configuration - allows frontend from different domains
const allowedOrigins = [
    'http://localhost:5173',           // Local Vite dev server
    'http://localhost:3000',           // Local production build
    'http://13.204.234.63',            // Lightsail IP
    'http://13.204.234.63:3000',       // Lightsail with port
    'https://keralasamajamvasaieast.in',      // Production frontend
    'https://www.keralasamajamvasaieast.in',  // Production frontend (www)
    process.env.FRONTEND_URL,          // Environment variable for custom URL
];

// Remove undefined values
const filteredOrigins = allowedOrigins.filter(origin => origin !== undefined);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);

        if (filteredOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/members', memberRoutes);
app.use('/api/admin', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/office-bearers', officeBearerRoutes);


// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'VKS Backend Server is running' });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`🔌 API endpoint: http://localhost:${PORT}/api/members`);
});

export default app;
