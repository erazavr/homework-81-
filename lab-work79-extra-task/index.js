const express = require('express');

const mysqlDb = require('./mysqlDb');
const category = require('./app /categories');
const location = require('./app /location');
const items = require('./app /items');

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));

app.use('/categories',category);
app.use('/locations',location);
app.use('/items',items);

const run = async () => {
    await mysqlDb.connect();
    const result = await mysqlDb.getConnection().query('SELECT 1 + 1 as `result`');
    console.log(result);
    app.listen(port, () => {
        console.log(`HTTP Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mysqlDb.disconnect()
    })

};
run().catch (e => {
    console.log(e)
});