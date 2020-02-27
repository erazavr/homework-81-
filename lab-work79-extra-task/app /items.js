const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const mysqlDb = require('../mysqlDb')
const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    const items = await mysqlDb.getConnection().query('SELECT * FROM `items`');
    res.send(items)
});
router.get('/:id', async (req, res) => {
    const item = await mysqlDb.getConnection().query('SELECT * FROM `items` WHERE `id` = ?', req.params.id);
    res.send(item)
});
router.post('/',upload.single('image') ,async (req, res) => {
    const items = req.body;
    if (req.file) {
        items.image = req.file.filename
    }
    const result = await mysqlDb.getConnection().query('INSERT INTO `items` (`category_id`, `location_id`, `title`, `description`, `image`) VALUES (?, ?, ?, ?, ?)',
        [items.categoryId, items.locationId, items.title, items.description, items.image]);
    res.send({id: result.insertId})
});
router.delete('/:id', async (req, res) => {
    try {
        await mysqlDb.getConnection().query('DELETE FROM `items` WHERE `id` = ?', req.params.id);
        return res.send({message: "Предмет удалён"})
    } catch (e) {
        res.status(500).send({message: "Нельза удалить данный предмет"})
    }

});
router.put('/:id',upload.single('image') ,async (req, res) => {
    const item = req.body;
    if (req.file) {
        item.image = req.file.filename
    }
    await mysqlDb.getConnection().query('UPDATE `items` SET `category_id` = ?, `location_id` = ?, `title` = ?, `description` = ?, `image` = ?   WHERE `id` = ?', [item.categoryId, item.locationId, item.title, item.description, item.image, req.params.id]);
    res.send("Отредактировано")
});




module.exports = router;