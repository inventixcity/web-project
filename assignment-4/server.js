const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/appleshop')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Mongo connection error', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const productsRouter = require('./routes/products');
const adminRouter = require('./routes/admin');

app.use('/products', productsRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
