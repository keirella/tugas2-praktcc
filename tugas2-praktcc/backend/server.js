const express = require('express');
const cors = require('cors');
const path = require('path'); 
const noteRoutes = require('./routes/noteRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/notes', noteRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Riella Fullstack running on http://localhost:${PORT}`);
});