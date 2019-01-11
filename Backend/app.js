const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const pageNotFound = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    User.findById('5c3806c3cfe52a8cf24adbca')
    .then(user => {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(pageNotFound.get404);

mongoConnect(() => {
    app.listen(5000, () => console.log("Server runing at PORT 5000"));
});

