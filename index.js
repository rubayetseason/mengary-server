const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
require("dotenv").config();
app.use(express.json());


app.get('/' , (req, res) => {
    res.send('Mengary server running');
});


app.listen(port, () => {
    console.log('mengary server running');
})