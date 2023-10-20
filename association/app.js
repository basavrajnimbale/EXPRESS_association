const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./Routes/admin');
const shopRoutes = require('./Routes/shop');

const Product = require('./models/product');
const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findOne({where: {id: 1}})
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
/*Cart.belongsTo(User);
User.hasOne(Cart);
Product.belongsToMany(Cart, {through: CartItem});
Cart.belongsToMany(Product, {through: CartItem});*/

// sequelize.sync({force: true})
sequelize.sync()
.then(res => {
    User.findOne({where: {id: 1}})
    .then(user => {
        if(!user){
            return User.create({name: 'Chandra', email: 'tcs@big4.com'});
        }
        return user;
    })
    .then ( (user) => {
        console.log(user);
    // .then( (user) => {
        // return user.createCart();
    // })
    // .then(cart => {
        // console.log(cart);
        app.listen(3000);
    })
})
.catch(err => console.log(err));