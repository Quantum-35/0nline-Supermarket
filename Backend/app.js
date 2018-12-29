const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const pageNotFound = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

sequelize.sync()
.then(result => {
    console.log(result)
})
.catch(err => {
    console.log(err)
})

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(pageNotFound.get404);

app.listen(5000, () => console.log("Server runing at PORT 5000"));
