const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const pageNotFound = require('./controllers/error');
const User = require('./models/user');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    User.findById('5c385e52f665b125c3f74a77')
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(pageNotFound.get404);

mongoose .connect('mongodb://localhost:27017/onlineMarket', { useNewUrlParser: true } )
.then(results => {
    User.findOne().then(user => {
        if(!user) {
            const user = new User({
                email: 'quantum@gmail.com',
                name: 'Quantum Computing',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })
    app.listen(5000, () => console.log("Server runing at PORT 5000"));
})
.catch(err => console.log(err))



