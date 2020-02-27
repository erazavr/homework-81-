const express = require('express');
const mysqlDb = require('../mysqlDb');
const router = express.Router();

router.get('/', async (req, res) => {
    const categories = await mysqlDb.getConnection().query('SELECT * FROM `categories`');
    res.send(categories)
});
router.get('/:id', async (req, res) => {
    const category = await mysqlDb.getConnection().query('SELECT * FROM `categories` WHERE `id` = ?', req.params.id);
    res.send(category)
});
router.post('/', async (req, res) => {
    const category = req.body;
    const result = await mysqlDb.getConnection().query('INSERT INTO `categories` (`title`, `description`) VALUES (?, ?)', [category.title, category.description]);
    res.send({id: result.insertId})
});
router.delete('/:id', async (req, res) => {
    try {
        await mysqlDb.getConnection().query('DELETE FROM `categories` WHERE `id` = ?', req.params.id);
        return res.send({message: "Категория удалена"})
    } catch (e) {
        res.status(500).send({message: "Нельза удалить данную категорию"})
    }
});
router.put('/:id', async (req, res) => {
    const category = req.body;
    await mysqlDb.getConnection().query('UPDATE `categories` SET `title` = ? , `description` = ? WHERE `id` = ?', [category.title, category.description, req.params.id]);
    res.send("Отредактировано")
});




module.exports = router;