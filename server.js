const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bfhlRoutes = require('./routes/bfhlRoutes');

dotenv.config();

const app = express();


const corsOptions = {
    origin: function (origin, callback) {

        callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization']
};


app.use(cors(corsOptions));
app.use(express.json());


connectDB();


app.use('/bfhl', bfhlRoutes);


app.get('/', (req, res) => {
    res.send('BFHL API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
