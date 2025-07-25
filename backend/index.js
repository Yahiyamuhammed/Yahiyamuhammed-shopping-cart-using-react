const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const path = require("path");

require('dotenv').config(); // To read .env file

const app = express();

// const {signup}=require('./controllers/authController')
const authRoutes = require('./routes/authRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const adminUserRoutes=require('./routes/adminUserRoute')
const adminProductRoutes=require('./routes/adminProductRoutes')
const adminBrandRoutes=require('./routes/adminBrandRoutes')

const userProductRoutes=require('./routes/userProductRoutes')
const allowedOrigins = [
  "http://localhost:5173",              // for local dev
  "https://456fd9d6dd75.ngrok-free.app" // your frontend via ngrok
];

// Middleware
// app.use(cors());
app.use(cors({
  // origin: "http://localhost:5173", // your React app origin
   origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true               // allow cookies
}));
app.use(express.json()); // for parsing JSONa
app.use(cookieParser());


app.use("/products", express.static(path.join(__dirname, "public/products")));


app.use('/api/auth', authRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin', adminUserRoutes);
app.use('/api/admin', adminProductRoutes);
app.use('/api/admin', adminBrandRoutes);

app.use('/api',userProductRoutes)

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
})
.then(() => console.log(' MongoDB connected'))
.catch((err) => console.error(' MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
