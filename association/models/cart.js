const fs = require('fs');
// const Sequelize = require('sequelize');
const path = require('path');

// const sequelize = require('../util/database');

const p = path.join(__dirname,'..','data','cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice){
        fs.readFile(p, (err, content) => {
            let cart = { products: [], totalPrice: 0};
            if(!err){
                cart = JSON.parse(content);
            }
            const existingProductIndex = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty++;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct
            }
            else {
                updatedProduct = {id: id, qty:1};
                cart.products = [...cart.products,updatedProduct];
            }
            cart.totalPrice += +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if(err){
                    console.log(err);
                }
            })
        })

/*const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true*/
    }
};

// module.exports = Cart;