
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

// Veiws path set
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Home Route
app.get('/', (req, res) => {
    res.render('index'); 
});

// starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});