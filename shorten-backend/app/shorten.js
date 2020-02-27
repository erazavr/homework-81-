const express = require('express');
const nanoid = require('nanoid');

const Shortens = require('../models /Shortens');
const router = express.Router();

router.get('/', async (req, res) => {
    const items = await Shortens.find();
    res.send(items)
});
router.get('/:shortUrl', async (req, res) => {
    try {
        const item = await Shortens.findOne({shortUrl: req.params.shortUrl});
        if (!item) {
            return res.status(400).send({message: 'Not found'})
        }
        res.status(301).redirect(item.originalUrl)
    } catch (e) {
        res.status(400).send(e)
    }

});
router.post('/', async (req, res) => {
   const itemData = {...req.body};
   if (!itemData.shortUrl) {
       itemData.shortUrl = nanoid(7)
   }
   const item =  new Shortens(itemData);
    try {
        await item.save();
        return res.send(item)
    } catch (e) {
        res.status(400).send({message: "Please, enter your url"})
    }

});
module.exports = router;