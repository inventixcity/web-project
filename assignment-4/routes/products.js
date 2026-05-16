const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 8;
        const skip = (page - 1) * limit;

        const search = req.query.search || '';
        const category = req.query.category || '';
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;

        const filter = {};

        if (search) {
            const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            filter.name = { $regex: safeSearch, $options: 'i' };
        }

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit) || 1;

        const products = await Product.find(filter)
            .skip(skip)
            .limit(limit);

        const categories = await Product.distinct('category');

        res.render('products', {
            products: products,
            categories: categories,
            currentPage: page,
            totalPages: totalPages,
            totalProducts: totalProducts,
            search: search,
            selectedCategory: category,
            minPrice: minPrice || '',
            maxPrice: maxPrice || ''
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;
