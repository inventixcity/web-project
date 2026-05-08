const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/appleshop')
    .then(() => console.log('Connected to MongoDB for seeding'))
    .catch(err => console.error('Mongo connection error', err));

const iphoneImg = '/assets/images/heroes/hero_iphone_family.jpg';
const macImg = '/assets/images/heroes/hero_macbook_pro.jpg';
const ipadImg = '/assets/images/heroes/hero_ipad_air.jpg';
const ipadProImg = '/assets/images/promos/promo_ipad_pro.jpg';
const watchImg = '/assets/images/promos/promo_watch_series11.jpg';
const watchUnityImg = '/assets/images/promos/promo_watch_unity.jpg';
const airpodsImg = '/assets/images/promos/promo_airpods_pro3.jpg';
const cardImg = '/assets/images/promos/promo_apple_card.jpg';
const tradeImg = '/assets/images/promos/promo_trade_in.jpg';

const products = [
    { name: 'iPhone 17 Pro', price: 1199, category: 'iPhone', rating: 4.9, stock: 25, image: iphoneImg },
    { name: 'iPhone 17 Air', price: 999, category: 'iPhone', rating: 4.7, stock: 30, image: iphoneImg },
    { name: 'iPhone 17', price: 799, category: 'iPhone', rating: 4.6, stock: 40, image: iphoneImg },
    { name: 'iPhone 16e', price: 599, category: 'iPhone', rating: 4.4, stock: 50, image: iphoneImg },
    { name: 'iPhone 16 Pro', price: 1099, category: 'iPhone', rating: 4.8, stock: 18, image: iphoneImg },

    { name: 'MacBook Air 13"', price: 1099, category: 'Mac', rating: 4.8, stock: 20, image: macImg },
    { name: 'MacBook Pro 14"', price: 1999, category: 'Mac', rating: 4.9, stock: 12, image: macImg },
    { name: 'MacBook Pro 16"', price: 2499, category: 'Mac', rating: 4.9, stock: 8, image: macImg },
    { name: 'iMac', price: 1299, category: 'Mac', rating: 4.7, stock: 15, image: macImg },
    { name: 'Mac mini', price: 599, category: 'Mac', rating: 4.6, stock: 22, image: macImg },
    { name: 'Mac Studio', price: 1999, category: 'Mac', rating: 4.8, stock: 6, image: macImg },

    { name: 'iPad Pro 13"', price: 1299, category: 'iPad', rating: 4.8, stock: 18, image: ipadProImg },
    { name: 'iPad Air', price: 599, category: 'iPad', rating: 4.7, stock: 30, image: ipadImg },
    { name: 'iPad mini', price: 499, category: 'iPad', rating: 4.5, stock: 25, image: ipadImg },
    { name: 'iPad', price: 349, category: 'iPad', rating: 4.4, stock: 45, image: ipadImg },

    { name: 'Apple Watch Series 11', price: 399, category: 'Watch', rating: 4.7, stock: 35, image: watchImg },
    { name: 'Apple Watch Ultra 3', price: 799, category: 'Watch', rating: 4.8, stock: 14, image: watchUnityImg },
    { name: 'Apple Watch SE', price: 249, category: 'Watch', rating: 4.5, stock: 40, image: watchImg },

    { name: 'AirPods Pro 3', price: 249, category: 'AirPods', rating: 4.7, stock: 60, image: airpodsImg },
    { name: 'AirPods 4', price: 129, category: 'AirPods', rating: 4.5, stock: 80, image: airpodsImg },
    { name: 'AirPods Max', price: 549, category: 'AirPods', rating: 4.6, stock: 20, image: airpodsImg },

    { name: 'Apple TV 4K', price: 129, category: 'TV & Home', rating: 4.6, stock: 28, image: cardImg },
    { name: 'HomePod', price: 299, category: 'TV & Home', rating: 4.4, stock: 18, image: cardImg },
    { name: 'HomePod mini', price: 99, category: 'TV & Home', rating: 4.5, stock: 40, image: cardImg },

    { name: 'Magic Keyboard', price: 99, category: 'Accessories', rating: 4.4, stock: 50, image: tradeImg },
    { name: 'Magic Mouse', price: 79, category: 'Accessories', rating: 4.2, stock: 55, image: tradeImg },
    { name: 'Apple Pencil Pro', price: 129, category: 'Accessories', rating: 4.7, stock: 35, image: tradeImg },
    { name: 'AirTag', price: 29, category: 'Accessories', rating: 4.5, stock: 100, image: tradeImg }
];

async function seed() {
    try {
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Inserted ' + products.length + ' products');
    } catch (err) {
        console.error('Seed error', err);
    } finally {
        mongoose.connection.close();
    }
}

mongoose.connection.once('open', seed);
