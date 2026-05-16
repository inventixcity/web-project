const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../models/product');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'uploads'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const safeName = Date.now() + '-' + Math.round(Math.random() * 1000) + ext;
        cb(null, safeName);
    }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ _id: -1 });
        res.render('admin/dashboard', { products: products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/new', (req, res) => {
    res.render('admin/new', { error: null, values: {} });
});

router.post('/new', upload.single('image'), async (req, res) => {
    const { name, price, category, rating, stock } = req.body;

    if (!name || !price || !category) {
        return res.render('admin/new', {
            error: 'Name, price and category are required.',
            values: req.body
        });
    }

    try {
        const newProduct = new Product({
            name: name,
            price: Number(price),
            category: category,
            rating: rating ? Number(rating) : 0,
            stock: stock ? Number(stock) : 0,
            image: req.file ? '/uploads/' + req.file.filename : ''
        });

        await newProduct.save();
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.render('admin/new', {
            error: 'Could not save product. Please try again.',
            values: req.body
        });
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.redirect('/admin');
        res.render('admin/edit', { product: product, error: null });
    } catch (err) {
        console.error(err);
        res.redirect('/admin');
    }
});

router.post('/edit/:id', upload.single('image'), async (req, res) => {
    const { name, price, category, rating, stock } = req.body;

    if (!name || !price || !category) {
        const product = await Product.findById(req.params.id);
        return res.render('admin/edit', {
            product: product,
            error: 'Name, price and category are required.'
        });
    }

    try {
        const update = {
            name: name,
            price: Number(price),
            category: category,
            rating: rating ? Number(rating) : 0,
            stock: stock ? Number(stock) : 0
        };

        if (req.file) {
            update.image = '/uploads/' + req.file.filename;
        }

        await Product.findByIdAndUpdate(req.params.id, update);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.redirect('/admin');
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product && product.image && product.image.startsWith('/uploads/')) {
            const filePath = path.join(__dirname, '..', 'public', product.image);
            fs.unlink(filePath, function () {});
        }
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.redirect('/admin');
    }
});

module.exports = router;
