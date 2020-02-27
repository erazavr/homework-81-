const express = require('express');

const mysqlDb = require('../mysqlDb');
const router = express.Router();

router.get('/', async (req, res) => {
    const locations = await mysqlDb.getConnection().query('SELECT * FROM `location`');
    res.send(locations)
});
router.get('/:id', async (req, res) => {
    const location = await mysqlDb.getConnection().query('SELECT * FROM `location` WHERE `id` = ?', req.params.id);
    res.send(location)
});
router.post('/', async (req, res) => {
    const location = req.body;
    const result = await mysqlDb.getConnection().query('INSERT INTO `location` (`title`, `description`) VALUES (?, ?)', [location.title, location.description]);
    res.send({id: result.insertId})
});
router.delete('/:id', async (req, res) => {
    try {
        await mysqlDb.getConnection().query('DELETE FROM `location` WHERE `id` = ?', req.params.id);
        return res.send({message: "Местоположение удалено"})
    } catch (e) {
        res.status(500).send({message: "Нельза удлаить данное местоположение"})
    }

});
router.put('/:id', async (req, res) => {
    const location = req.body;
    await mysqlDb.getConnection().query('UPDATE `location` SET `title` = ? , `description` = ? WHERE `id` = ?', [location.title, location.description, req.params.id]);
    res.send("Отредактировано")
});




module.exports = router;