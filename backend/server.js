const express = require('express');
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes');
require('dotenv').config();

const app = express();

app.use(cors()); 
app.use(express.json());

app.use('/notes', noteRoutes);

app.get('/', (req, res) => {
    res.json({
        message: "Riella Notes API is running!",
        status: "Online"
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Backend API running on port ${PORT}`);
});