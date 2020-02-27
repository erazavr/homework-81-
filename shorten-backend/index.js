const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const shorten = require('./app/shorten');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());


const run = async () => {
    await mongoose.connect('mongodb://localhost/shorten', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    app.use('/short', shorten);

    app.listen(port, () => {
        console.log(`HTTP Server started on ${port} port!`);
    });
};

run().catch(e => {
    console.error(e);
});